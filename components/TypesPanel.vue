<template>
  <nav class="panel">
    <p class="panel-heading">목차</p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="검색">
        <span class="icon is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <!-- <p class="panel-tabs">
            <a
              v-for="(tab, index) in tabs"
              :index="index"
              :key="index"
              :class="{ 'is-active': index == selectedTabIndex }"
              v-on:click="selectTab(index)"
            >{{tab}} ({{getTabCount(index)}})</a>
    </p>-->

    <TypesItem
      v-for="(type, index) in types"
      :index="index"
      :key="index"
      :id="index"
      :type="type"
      :selectedTypeIndex="selectedTypeIndex"
      @click="selectTypeIndex(index)"
    />

    <div class="panel-block">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <!-- <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next page</a>-->

        <ul class="pagination-list">
          <li>
            <a class="pagination-link" aria-label="Goto page 1">1</a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 45">45</a>
          </li>
          <li>
            <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 47">47</a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a class="pagination-link" aria-label="Goto page 86">86</a>
          </li>
        </ul>
      </nav>
    </div>
  </nav>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import TypesItem from './items/TypesItem'

const itemPerPage = 5

export default {
  components: { TypesItem },
  props: {
    types: {
      type: Array,
      default: []
    },
    selectedTypeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      typesData: []
    }
  },
  methods: {
    init() {
      this.initTypes()
    },
    initTypes() {
      axios.get('/api/datas/types').then(res => {
        this.typesData = res.data

        const types = []
        for (let i = 0; i < itemPerPage; i++) {
          types.push(this.typesData[i])
        }

        this.$emit('update:types', types)
        this.$emit('loaded')
      })
    },
    selectTypeIndex(typeIndex) {
      this.$emit('update:selectedTypeIndex', typeIndex)
      this.$emit('changed')
    }
    // initDatas() {
    //   const type = this.types[this.selectedTypeIndex]._id

    //   axios.get('/api/datas', { params: { type } }).then(res => {
    //     this.datas = res.data
    //     this.initLists()
    //   })
    // },
    // initLists(tabIndex) {
    //   this.lists = this.filterList(this.selectedTabIndex)
    // },
    // selectTab(tabIndex) {
    //   this.selectedTabIndex = tabIndex
    //   this.initLists()
    // },
    // getTabCount(tabIndex) {
    //   return this.filterList(tabIndex).length
    // },
    // filterList(tabIndex) {
    //   return this.datas.filter(item => {
    //     switch (tabIndex) {
    //       case 1:
    //         return item.isAccepted

    //       case 2:
    //         return item.bestTranslate

    //       case 3:
    //         return !item.isAccepted && !item.bestTranslate

    //       default:
    //         return true
    //     }
    //   })
    // }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>
