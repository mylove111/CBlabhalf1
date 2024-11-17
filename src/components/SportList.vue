<template>
    <div>
      <ul>
        <li v-for="sport in sports" :key="sport.sport">
          <h3>{{ sport.sport }}</h3>
          <p><strong>Gold:</strong> {{ sport.medals.gold }}</p>
          <p><strong>Silver:</strong> {{ sport.medals.silver }}</p>
          <p><strong>Bronze:</strong> {{ sport.medals.bronze }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    name: 'SportList',
    props: {
      sports: {
        type: Array as PropType<Array<{ sport: string; medals: any }>>,
        required: true,
      },
    },
  });
  </script>
  