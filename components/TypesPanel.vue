<template>
  <nav class="panel">
    <p class="panel-heading">목차</p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="검색" v-model="keyword">
        <span class="icon is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <TypesItem
      v-for="(type, index) in types"
      :index="index"
      :key="index"
      :id="index"
      :type="type"
      :selectedType="selectedType"
      @click="selectType(type._id)"
    />

    <div class="panel-block">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li @click="setPage(0)">
            <a class="pagination-link">처음으로</a>
          </li>

          <li v-for="(page, index) in pages" :index="index" :key="index" @click="setPage(page)">
            <a class="pagination-link" :class="{ 'is-current': page === currentPage }">{{page + 1}}</a>
          </li>

          <li @click="setPage(totalPage)">
            <a class="pagination-link">마지막으로</a>
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

const itemPerPage = 10
const pagePerList = 5

export default {
  components: { TypesItem },
  props: {
    typesList: {
      type: Array,
      default: []
    },
    types: {
      type: Array,
      default: []
    },
    selectedType: String
  },
  watch: {
    keyword() {
      this.filterList()
    }
  },
  data() {
    return {
      keyword: '',
      pagePerList,
      itemPerPage,
      currentPage: 0,
      totalPage: 0,
      pages: [],
      typesData: [],
      filteredList: []
    }
  },
  methods: {
    init() {
      this.initTypes()
    },
    initTypes() {
      axios.get('/api/datas/types').then(res => {
        this.$emit('update:typesList', res.data)
        this.typesData = res.data
        this.selectType(this.typesData[0]._id)

        this.filterList()

        this.$emit('loaded')
      })
    },
    filterList() {
      let temp = this.typesData

      if (this.keyword) {
        const keyword = this.keyword.toLowerCase()
        temp = temp.filter(item => {
          return item._id.toLowerCase().indexOf(keyword) != -1
        })
      }

      this.totalPage = Math.ceil(temp.length / itemPerPage)
      this.filteredList = temp

      this.setPage(0)
    },
    initList() {
      const types = []

      for (let i = 0; i < itemPerPage; i++) {
        const index = i + this.currentPage * itemPerPage
        if (index > this.filteredList.length - 1) {
          break
        }
        types.push(this.filteredList[index])
      }

      this.$emit('update:types', types)
    },
    selectType(type) {
      this.$emit('update:selectedType', type)
    },
    setPage(page) {
      if (page > this.totalPage - 1) {
        page = this.totalPage - 1
      }

      if (page < 0) {
        page = 0
      }

      this.currentPage = page
      this.pages = []

      let firstIndex = this.currentPage - Math.floor(pagePerList / 2)
      if (firstIndex + pagePerList > this.totalPage - 1) {
        firstIndex - this.totalPage
      }
      if (firstIndex < 0) {
        firstIndex = 0
      }
      for (var i = 0; i < pagePerList; i++) {
        const index = i + firstIndex
        if (index > this.totalPage - 1) {
          break
        }
        this.pages.push(index)
      }

      this.initList()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>
