/* jshint esversion:8 */
const http = require('http');
const httpProxy = require('http-proxy');

const start = (config) => {
    const proxy = httpProxy.createProxyServer({});

    http.createServer((request, response) => {

        config.routes.forEach(route => {
            const regexp = new RegExp(route.source);

            if (regexp.test(request.url)) {

                console.log(`${Date()} ${route.source} -> ${route.target}${request.url}:${(route.statusCode)?route.statusCode:"transparent proxy"}`);

                if(route.statusCode) {
                    response.statusCode = route.statusCode;
                    response.end((route.response)?JSON.stringify(route.response):"");
                } else {
                    proxy.web(request, response, {
                        changeOrigin: true,
                        target: route.target
                    });
                }
            } 
        });


    }).listen(config.port);
};

const main = args => {
    args.forEach(arg => {
        const config = require(arg);
        start(config);
    });
};

main(process.argv.slice(2));