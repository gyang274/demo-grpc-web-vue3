# demo-grpc-web-vue3

An echo demo built using grpc, grpc-web, envoy and vite + vue3 compositional api.

## Overview

An echo demo built using grpc, grpc-web, envoy and vite + vue3 compositional api.

## Quick Start

### ./proto

- define the services and messages

### ./server
```
cd ./server

npm install

node echo_server.js

# test echo server (open a new terminal)
node echo_client_static.js
node echo_client_dynamic.js
```

### ./proxy

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

### ./client
```
cd ./client

npm install

# serve with dev dist
npm run dev

# serve the prod dist
npm install -g serve

npm run build

serve -s dist
```
