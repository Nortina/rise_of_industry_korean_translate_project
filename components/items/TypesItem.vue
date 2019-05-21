<template>
  <a
    class="panel-block"
    :class="{
              'is-active': type._id == selectedType,
            }"
    @click="onClick()"
  >
    <span class="panel-icon">
      <i
        class="fas"
        :class="{
                  'fa-check-circle': type._id == selectedType,
                  'fa-circle': type._id != selectedType,
                }"
      />
    </span>

    <div class="column">
      <div class="columns">
        <div class="column">
          <span class="is-flexible">{{type._id}}</span>
        </div>

        <div class="column is-narrow">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">번역</span>
                <span class="tag is-warning">{{type.translatedCount}}</span>
              </div>
            </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">검수</span>
                <span class="tag is-success">{{type.acceptedCount}}</span>
              </div>
            </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">총</span>
                <span class="tag is-info">{{type.totalCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  props: {
    type: Object,
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
