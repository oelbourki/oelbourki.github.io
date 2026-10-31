/**
 * Soft-fail Gatsby 3 source-map decoding so `gatsby develop` doesn't
 * exit on Node 18+/22 when webpack asks for original frames.
 */
const fs = require('fs');
const path = require('path');

const target = path.join(
  path.dirname(require.resolve('gatsby/package.json')),
  'dist',
  'utils',
  'stack-trace-utils.js',
);

let src = fs.readFileSync(target, 'utf8');
if (src.includes('/* cursor-node22-shim */')) {
  process.exit(0);
}

const start = src.indexOf('async function findOriginalSourcePositionAndContent(webpackSource, position) {');
if (start === -1) {
  console.warn('[patch-gatsby-stack-trace] target function not found; skip');
  process.exit(0);
}

const mapComment = '\n//# sourceMappingURL=stack-trace-utils.js.map';
const end = src.indexOf(mapComment, start);
if (end === -1) {
  console.warn('[patch-gatsby-stack-trace] source map comment not found; skip');
  process.exit(0);
}

const patched = `async function findOriginalSourcePositionAndContent(webpackSource, position) {
  /* cursor-node22-shim */
  try {
    if (typeof _sourceMap.SourceMapConsumer.with !== \`function\`) {
      return { sourcePosition: null, sourceContent: null };
    }
    return await _sourceMap.SourceMapConsumer.with(webpackSource, null, consumer => {
      var _position$column, _consumer$sourceConte;
      const sourcePosition = consumer.originalPositionFor({
        line: position.line,
        column: (_position$column = position.column) !== null && _position$column !== void 0 ? _position$column : 0
      });
      if (!sourcePosition.source) {
        return { sourcePosition: null, sourceContent: null };
      }
      const sourceContent = (_consumer$sourceConte = consumer.sourceContentFor(sourcePosition.source, true)) !== null && _consumer$sourceConte !== void 0 ? _consumer$sourceConte : null;
      return { sourcePosition, sourceContent };
    });
  } catch (_err) {
    return { sourcePosition: null, sourceContent: null };
  }
}`;

fs.writeFileSync(target, `${src.slice(0, start)}${patched}${src.slice(end)}`);
console.log('[patch-gatsby-stack-trace] applied');
