<template>
  <div class="echo">
    <div class="q-px-lg">
      <q-input
        color="accent"
        label="Query"
        v-model="query"
      >
        <template v-slot:prepend>
          <q-icon name="style" color="accent"></q-icon>
        </template>
      </q-input>
      <q-btn
        class="full-width"
        color="accent"
        icon="send"
        label="Send Message to GRPC Echo Server"
        @click="getReply()"
      >
      </q-btn>
    </div>
    <hr>
    <div class="q-px-lg q-pb-md">
      <q-timeline layout="loose" color="accent">
        <q-timeline-entry heading>
          <h5>ECHO Server Responses</h5>
        </q-timeline-entry>        
        <q-timeline-entry
          v-for="(msg, index) in msgs"
          :key="index"
          title=""
          subtitle=""
          :side="index & 1 ? 'left' : 'right'"
        >
          <div>
            {{ msg }}
          </div>
        </q-timeline-entry>
        
      </q-timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEchoStore } from '@/stores/echo'

const query = ref('')

const msgs = ref([])

const storeEcho = useEchoStore()

const getReply = () => {
  console.log('getReply')
  // console.log(storeEcho)

  storeEcho.doEchoService(
    query.value
  ).then(
    (reply) => {
      // console.log(reply)
      msgs.value.push(reply)
      query.value = ''
    }
  )
}

</script>

<style scoped>
.echo {
  font-family: Fira Sans;
}
</style>