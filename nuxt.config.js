module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'j2ee',
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#3B8070'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config
          .module
          .rules
          .push({enforce: 'pre', test: /\.(js|vue)$/, loader: 'eslint-loader', exclude: /(node_modules)/})
      }
    }
  },
  plugins: [
    '@/plugins/element-ui', '@/plugins/sender', '~/plugins/axios'
  ],
  css: ['element-ui/lib/theme-chalk/index.css'],
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true
  },
  proxy: [
    // 'http://localhost:3001/BookStore/',
    // 'http://localhost:3001/BookStore/upload/',
    // 'http://192.168.20.46:8080/BookStore/upload/',
    // 'http://192.168.20.46:8080/BookStore/',
    'http://j2ee.gagagalaxy.top:8080/BookStore/upload/',
    'http://j2ee.gagagalaxy.top:8080/BookStore/',
  ]
}
