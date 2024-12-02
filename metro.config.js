const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
const config = await getDefaultConfig(__dirname);
const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-web/babel'),
};
    config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'],
};

return config;
})();