# demo-grpc-web-vue3

## 0x00 venv

```
$ name -a
Linux gyang274-ubuntu 5.13.0-52-generic #59~20.04.1-Ubuntu SMP Thu Jun 16 21:21:28 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux

$ protoc --version
libprotoc 3.6.1

$ python --version
Python 3.9.5

$ nvm -v
0.37.0

$ node -v
v16.15.0

$ npm -v
8.5.5

$ vue -V
@vue/cli 5.0.4
```

## 0x00 proto

Define @/proto/echo.proto, generate pb and grpc-pb file for backend server and frontend client.

- server: python and node with server and client for testing
- client: grpc-web using protobuf-ts for vite+vue3

```
cd ./proto
```

- server side: python

```
protoc --proto_path=. --python_out=out --grpc_python_out=out echo.proto

# or:
# python -m pip install grpcio grpcio-tools
# python -m grpc_tools.protoc --proto_path=. --python_out=out --grpc_python_out=out echo.proto

#>> echo_pb2.py echo_pb2_grpc.py
```

- server side: node

```
# npm install -g grpc-tools

grpc_tools_node_protoc --js_out=import_style=commonjs,binary:out --grpc_out=out --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` echo.proto

#>> echo_pb.js echo_grpc_pb.js
```

- client side: grpc-web with protobuf-ts

```
# npm install @protobuf-ts/plugin

npx protoc --ts_out ./out --proto_path . echo.proto

#>> echo.ts echo.client.ts
```

## 0x01 proxy

```
cd ./proxy
```

- ubuntu

```
docker build -t yg-envoy-grpc -f Dockerfile .
docker run --rm -it -p 9090:9090 -p 9901:9901 --network=host yg-envoy-grpc
```

- mac/win

```
emacs envoy.yaml
...
  # macos/windows 
  # envoy is running within docker
  # grpc service aka node-server or python-server is running in host
  # direct request from web to envoy to server by host.docker.internal
  hosts: [{ socket_address: { address: host.docker.internal, port_value: 50051 }}]
  # ubuntu/linux
  # use --network=host which is depreciated
  # docker run --rm -it -p 9090:9090 -p 9901:9901 --network=host yg-envoy-echo
  # hosts: [{ socket_address: { address: 0.0.0.0, port_value: 50051 }}]
...

docker build -t yg-envoy-grpc -f Dockerfile .

docker run --rm -it -p 9090:9090 -p 9901:9901 yg-envoy-grpc
```

## 0x02 server

```
cd ./server

npn install

node echo_server.js

# or:
# python echo_server.py
```

## 0x03 client

- init

```
npm init vue@latest

npm install quasar @quasar/extras

npm install -D @quasar/vite-plugin sass@1.32.12 
```

- quasar

```
// FILE: main.js

import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
```

```
// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: 'src/styles/quasar-variables.sass'
    })
  ]
})
```

```
// FILE (create it): src/styles/quasar-variables.sass

$primary   : #1976D2
$secondary : #26A69A
$accent    : #9C27B0

$dark      : #1D1D1D

$positive  : #21BA45
$negative  : #C10015
$info      : #31CCEC
$warning   : #F2C037
```

- grpc-web using protobuf-ts

see ./src/stores/echo.js and ./src/components/Echo.vue

