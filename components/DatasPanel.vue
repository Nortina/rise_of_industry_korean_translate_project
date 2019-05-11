<template>
  <nav class="panel">
    <p class="panel-heading">번역본</p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="검색">
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

    <a
      class="panel-block"
      v-for="item in lists"
      :key="item._id"
      :class="{
              'has-text-danger': !item.isAccepted && !item.bestTranslate,
              'has-text-success': item.isAccepted && item.bestTranslate,
            }"
    >
      <span class="panel-icon">
        <i
          class="fas"
          :class="{
                  'has-text-danger': !item.isAccepted && !item.bestTranslate,
                  'fa-check-circle has-text-success': item.isAccepted && item.bestTranslate,
                }"
        ></i>
      </span>
      <div class="column">{{item.bestTranslate ? item.bestTranslate : item.originalText}}</div>
    </a>

    <a v-if="!lists.length" class="panel-block">
      <span class="panel-icon">
        <i class="fas fa-no"></i>
      </span>
      <div class="column has-text-grey-light">번역본 없음</div>
    </a>
  </nav>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

const itemPerPage = 5

export default {
  data() {
    return {
      datas: [],
      lists: [],
      tabs: ['전체', '검수 완료', '번역 중', '미번역'],
      selectedTabIndex: 0
    }
  },
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
  watch: {
    types() {
      this.initDatas()
    },
    selectedTypeIndex() {
      this.initDatas()
    }
  },
  methods: {
    initDatas() {
      const type = this.types[this.selectedTypeIndex]._id

      axios.get('/api/datas', { params: { type } }).then(res => {
        this.datas = res.data
        this.initLists()
      })
    },
    filterList(tabIndex) {
      return this.datas.filter(item => {
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
    initLists() {
      this.lists = this.filterList(this.selectedTabIndex)
    },
    selectTab(tabIndex) {
      this.selectedTabIndex = tabIndex
      this.initLists()
    },
    getTabCount(tabIndex) {
      return this.filterList(tabIndex).length
    }
  },
  mounted() {}
  // data() {
  //   return {
  //     search: {
  //       keyword: 'asdf'
  //     },
  //     datas: [],
  //     lists: []
  //   }
  // },
  // async mounted() {
  // this.$emit('update:a', 'fdsa')
  // this.init()
  // },
  //   init() {
  //     this.initTypes(() => this.initDatas())
  //   },
  //   initTypes() {
  //     axios.get('/api/datas/types').then(res => {
  //       this.typesData = res.data
  //       this.types = []
  //       for (let i = 0; i < itemPerPage; i++) {
  //         this.types.push(this.typesData[i])
  //       }

  //       this.$emit('loaded')
  //     })
  //   },
  //   initLists(tabIndex) {
  //     this.lists = this.filterList(this.selectedTabIndex)
  //   },
  //   selectTypeIndex(typeIndex) {
  //     this.selectedTypeIndex = typeIndex
  //     this.initDatas()
  //   },
  //   selectTab(tabIndex) {
  //     this.selectedTabIndex = tabIndex
  //     this.initLists()
  //   },
  //   getTabCount(tabIndex) {
  //     return this.filterList(tabIndex).length
  //   },
  //   filterList(tabIndex) {
  //     return this.datas.filter(item => {
  //       switch (tabIndex) {
  //         case 1:
  //           return item.isAccepted

  //         case 2:
  //           return item.bestTranslate

  //         case 3:
  //           return !item.isAccepted && !item.bestTranslate

  //         default:
  //           return true
  //       }
  //     })
  //   }
  // }
}
</script>

<style>
</style>
