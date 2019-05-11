<template>
  <div>
    <div class="columns">
      <div class="column">
        <TypesPanel :types.sync="types" :selectedTypeIndex.sync="selectedTypeIndex"/>
      </div>

      <div class="column">
        <DatasPanel :types="types" :selectedTypeIndex="selectedTypeIndex"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import TypesPanel from '../components/TypesPanel'
import DatasPanel from '../components/DatasPanel'

export default {
  components: { TypesPanel, DatasPanel },
  data() {
    return {
      types: [],
      selectedTypeIndex: 0
    }
  },
  methods: {
    init() {}
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>
