<template>
  <a
    class="panel-block"
    :class="{
              'is-active': id == selectedTypeIndex,
            }"
    @click="onClick()"
  >
    <span class="panel-icon">
      <i
        class="fas"
        :class="{
                  'fa-check-circle': id == selectedTypeIndex,
                  'fa-circle': id != selectedTypeIndex,
                }"
      />
    </span>
    <div class="column">
      <div class="is-size-4">
        <span>{{type._id}}</span>
        <span class="tag is-black">총 {{type.totalCount}}개</span>
        <span class="tag is-black">총 {{type.totalCount}}개</span>
        <span class="tag is-black">총 {{type.totalCount}}개</span>
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
    id: Number,
    selectedTypeIndex: Number
  },
  methods: {
    onClick() {
      this.$emit('click', this.id)
    }
  }
}
</script>

<style>
</style>
