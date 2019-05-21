<template>
  <div>
    <section class="hero has-background-dark">
      <div class="hero-body">
        <progress
          class="progress has-background-dark is-success"
          :max="totalCount"
          :value="translatedCount"
        />
        <div
          class="title is-4 has-text-centered has-text-light"
        >{{translatedCount}} / {{totalCount}}</div>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column">
          <TypesPanel
            :types.sync="types"
            :typesList.sync="typesList"
            :selectedType.sync="selectedType"
          />
        </div>

        <div class="column">
          <DatasPanel :types="types" :selectedType="selectedType"/>
        </div>
      </div>
    </section>
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
      totalCount: 0,
      translatedCount: 0,
      typesList: [],
      types: [],
      selectedType: ''
    }
  },
  watch: {
    typesList() {
      this.totalCount = 0
      this.translatedCount = 0

      this.typesList.forEach(item => {
        this.totalCount += item.totalCount
        this.translatedCount += item.translatedCount
      })
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
