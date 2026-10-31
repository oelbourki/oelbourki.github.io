/**
 * Keep `gatsby develop` alive on Node 18+/22.
 * Gatsby 3 error overlay calls SourceMapConsumer.with; with the
 * webpack-compatible source-map@0.6 override that throws and kills the process.
 */
const path = require('path');

try {
  const stackTracePath = path.join(
    path.dirname(require.resolve('gatsby/package.json')),
    'dist',
    'utils',
    'stack-trace-utils.js',
  );
  // eslint-disable-next-line import/no-dynamic-require
  const stackTraceUtils = require(stackTracePath);
  const original = stackTraceUtils.findOriginalSourcePositionAndContent;

  if (typeof original === 'function') {
    stackTraceUtils.findOriginalSourcePositionAndContent = async function safeFind(...args) {
      try {
        return await original.apply(this, args);
      } catch (_) {
        return { sourcePosition: null, sourceContent: null };
      }
    };
  }
} catch (_) {
  // Ignore — develop can still run without mapped frames.
}
