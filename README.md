# proxyjs

A simple HTTP/HTTPS proxy to use in tests simulation.

## build

`docker build --pull --rm -f "Dockerfile" -t pedrorobsonleao/proxyjs:v1.0.0 "." `

## run

`docker run --rm --volume ${PWD}:/tmp --publish 3000:3000 pedrorobsonleao/proxyjs /tmp/appsettings.json`

### config sample ###


```json
{
    "port": 3000,
    "routes": [
        {
            "source": "/v1/login/*",
            "target": "http://api.one.com.br/qa"
        },
        {
            "source": "/Servicos/api/v3/Listar",
            "target": "http://iis.internal.local:8080",
            "statusCode": 504
        },
        {
            "source": "/*",
            "target": "http://iis.internal.local:8080"
        }
    ]
}
```