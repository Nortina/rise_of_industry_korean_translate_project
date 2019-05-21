<template>
  <div class="modal" :class="{ 'is-active': isActive }" v-if="data">
    <div class="modal-background" @click="onClose()"></div>

    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <p class="title">
              <span>{{data.bestTranslate ? data.bestTranslate : data.originalText}}</span>
              <span class="tag is-danger" v-if="!data.bestTranslate">번역중</span>
            </p>
          </div>

          <article class="message">
            <div class="message-body">
              <p class="title is-5">원문</p>
              <p>{{data.originalText}}</p>
            </div>
          </article>

          <nav class="panel">
            <p class="panel-heading">번역본</p>

            <div
              class="panel-block"
              v-for="(value, key, index) in translates"
              :key="key"
              :class="{ 'is-active': key == data.bestTranslate }"
            >
              <span class="panel-icon">
                <i class="fas fa-check" v-if="key == data.bestTranslate"></i>
              </span>
              <div class="column">{{key}}</div>
              <div class="column is-narrow">
                <button
                  class="button is-rounded is-info is-outlined"
                  @click="thumbUpTranslate(key)"
                >
                  <span class="space-right2">{{value.length}}</span>
                  <span class="icon is-small">
                    <i class="far fa-thumbs-up"></i>
                  </span>
                </button>
              </div>
            </div>

            <div class="panel-block">
              <span class="panel-icon"></span>

              <div class="column">
                <div class="field">
                  <div class="control is-expanded">
                    <textarea class="textarea" placeholder="새 번역본" v-model="text"></textarea>
                  </div>
                </div>

                <div class="field">
                  <div class="control is-pulled-right">
                    <button class="button is-info" @click="addTranslate()">등록</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <footer class="card-footer">
          <div class="card-footer-item">
            <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li v-for="(path, index) in paths" :key="index" :index="index">
                  <a>{{path}}</a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </div>

    <button class="modal-close is-large" aria-label="close" @click="onClose()"></button>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  props: {
    id: String,
    isActive: Boolean
  },
  watch: {
    id() {
      this.init()
    }
  },
  data() {
    return {
      data: null,
      text: '',
      paths: [],
      translates: {}
    }
  },
  methods: {
    init() {
      if (!this.id || !this.isActive) {
        return
      }

      const _id = this.id
      axios.get('/api/data', { params: { _id } }).then(res => {
        this.data = res.data

        this.paths = this.data._id.split('.').map(item => item.toLowerCase())

        this.translates = {}
        for (var i in this.data.translatedText) {
          const translate = this.data.translatedText[i]
          if (!this.translates[translate.text]) {
            this.translates[translate.text] = []
          }
          this.translates[translate.text].push(translate)
        }
      })
    },
    onClose() {
      this.$emit('close')
    },
    thumbUpTranslate(text) {
      const { _id } = this.data

      if (!_id || !text) {
        return
      }

      axios.post('/api/datas/translate', { _id, text }).then(() => {
        this.text = ''

        this.init()
      })
    },
    addTranslate() {
      const { _id } = this.data
      const text = this.text

      if (!_id || !text) {
        return
      }

      axios.post('/api/datas/translate', { _id, text }).then(() => {
        this.text = ''

        this.init()
      })
    }
  }
}
</script>

<style>
</style>
