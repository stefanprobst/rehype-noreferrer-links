import type * as Hast from 'hast'
import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'

import { isAbsoluteUrl } from '@stefanprobst/is-absolute-url'

export default function withNoReferrerLinks(): Transformer<Hast.Root> {
  const transformer: Transformer<Hast.Root> = function transformer(tree, _file) {
    visit(tree, 'element', function onElement(node) {
      if (node.tagName !== 'a') return

      if (node.properties == null) return
      if (typeof node.properties['href'] !== 'string') return
      if (!isAbsoluteUrl(node.properties['href'])) return

      node.properties['target'] = '_blank'
      node.properties['rel'] = 'noreferrer'
    })
  }

  return transformer
}
