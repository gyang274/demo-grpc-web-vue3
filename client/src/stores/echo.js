import { defineStore } from 'pinia'

import { EchoRequest } from './proto/echo' 
import { EchoServiceClient } from './proto/echo.client'
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"

export const useEchoStore = defineStore({
  id: 'echo',
  state () {
    const client = new EchoServiceClient(
      new GrpcWebFetchTransport({
        baseUrl: 'http://127.0.0.1:9090'
      })
    )
    return {
      client: client
    }
  },
  getters: {
    
  },
  actions: {
    async doEchoService (payload) {
      return new Promise (
        (resolve, reject) => {

          console.log(
            'echo_web_client|doEchoService|send query to server:', payload
          )

          const request = EchoRequest.fromJson({
            "query": payload
          })
          
          // const metadata = {'content-type': 'application/grpc-web-text'};

          this.client.echo(
            request, {}
          ).then(
            (res) => {
              let { response } = res
              console.log(
                'echo_web_client|doEchoService|receive reply from server:', response.reply
              )
              resolve(response.reply)
            }
          ).catch(
            (err) => {
              console.log(
                'echo_web_client|doEchoService|error:', err
              )
              reject(new Error('echo_web_client|doEchoService|error:' + err))
            }
          )
        }
      )
    }
  }
})
