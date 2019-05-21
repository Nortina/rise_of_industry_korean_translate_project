<template>
  <nav class="panel">
    <p class="panel-heading">번역본</p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="검색" v-model="keyword">
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>

    <p class="panel-tabs">
      <a
        v-for="(tab, index) in tabs"
        :index="index"
        :key="index"
        :class="{ 'is-active': index == selectedTabIndex }"
        @click="selectTab(index)"
      >{{tab}} ({{getTabCount(index)}})</a>
    </p>

    <DatasItem v-for="data in datas" :data="data" :key="data._id" @click="openDetail(data)"/>

    <a v-if="!datas.length" class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-no"></i>
      </span>
      <div class="column has-text-grey-light">번역본 없음</div>
    </a>

    <DatasModal :id="selectedId" :isActive="selectedId != null" @close="closeDetail()"/>
  </nav>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import DatasItem from './items/DatasItem'
import DatasModal from './items/DatasModal'

const itemPerPage = 5

export default {
  components: { DatasItem, DatasModal },
  data() {
    return {
      keyword: '',
      datasList: [],
      datas: [],
      tabs: ['전체', '검수 완료', '번역 중', '미번역'],
      selectedTabIndex: 0,
      selectedId: null
    }
  },
  props: {
    types: {
      type: Array,
      default: []
    },
    selectedType: String
  },
  watch: {
    selectedType(newValue, oldValue) {
      if (newValue != oldValue) {
        this.initDatas()
      }
    },
    keyword() {
      this.initList()
    }
  },
  methods: {
    initDatas() {
      const type = this.selectedType

      axios.get('/api/datas', { params: { type } }).then(res => {
        this.datasList = res.data
        this.initList()
      })
    },
    filterList(tabIndex) {
      let temp = this.datasList

      if (this.keyword) {
        const keyword = this.keyword.toLowerCase()
        temp = temp.filter(item => {
          return (
            item._id.toLowerCase().indexOf(keyword) != -1 ||
            item.originalText.toLowerCase().indexOf(keyword) != -1 ||
            item.bestTranslate.toLowerCase().indexOf(keyword) != -1
          )
        })
      }

      return temp.filter(item => {
        switch (tabIndex) {
          case 1:
            return item.isAccepted

          case 2:
            return item.bestTranslate

          case 3:
            return !item.isAccepted && !item.bestTranslate

          default:
            return true
        }
      })
    },
    initList() {
      this.datas = this.filterList(this.selectedTabIndex)
    },
    selectTab(tabIndex) {
      this.selectedTabIndex = tabIndex
      this.initList()
    },
    getTabCount(tabIndex) {
      return this.filterList(tabIndex).length
    },
    openDetail(data) {
      const html = window.document.getElementsByTagName('html').item(0)
      html.classList.add('is-clipped')

      this.selectedId = data._id
    },
    closeDetail() {
      const html = window.document.getElementsByTagName('html').item(0)
      html.classList.remove('is-clipped')

      this.selectedId = null
    }
  },
  filters: {},
  mounted() {}
}
</script>

<style>
</style>
