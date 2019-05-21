<template>
  <a
    class="panel-block"
    :class="{
              'has-text-danger': !data.isAccepted && !data.bestTranslate,
              'has-text-success': data.isAccepted && data.bestTranslate,
            }"
    @click="onClick()"
  >
    <span class="panel-icon">
      <i
        class="fas"
        :class="{
                  'has-text-danger': !data.isAccepted && !data.bestTranslate,
                  'fa-check-circle has-text-success': data.isAccepted && data.bestTranslate,
                }"
      ></i>
    </span>
    <div class="column">{{data.bestTranslate ? data.bestTranslate : data.originalText}}</div>
  </a>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  props: {
    data: Object,
    selectedType: String
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>
</style>
