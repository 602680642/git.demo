/*const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
 
    style: true,
  }),
 addLessLoader({
  lessOptions:{
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
  }
 }),
);*/

const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    
  +   config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  +   config = rewireLess.withLoaderOptions({
  +     modifyVars: { "@primary-color": "#1DA57A" },
  +   })(config, env);
      return config;
    };