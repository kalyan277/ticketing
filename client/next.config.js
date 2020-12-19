const withCSS =require('@zeit/next-css')


module.exports=withCSS({
     
});

module.exports ={
    webpackDevMiddleware: config =>{
        config.watchOptions.poll = 300;
        return config;
    }
};