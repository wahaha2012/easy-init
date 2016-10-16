<template>
  <h1 class="title">{{title}}</h1>
</template>

<script>
  import {
    getTitle,
  } from '../vuex/getters';
  import {
    setTitle
  } from '../vuex/actions';

  export default {
    components: {
    },

    vuex: {
      getters: {
        title: getTitle,
      },
      actions: {
        setTitle
      }
    },
    ready(){
      this.setTitle("Hello World, Easy init Vue");
    },
    data(){
      return {
      }
    },
    route: {
      data() {
      },
    },
    methods: {
    }
  };
</script>

<style>
</style>

