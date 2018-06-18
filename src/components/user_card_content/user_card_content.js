import StillImage from '../still-image/still-image.vue'
import { hex2rgb } from '../../services/color_convert/color_convert.js'

export default {
  props: [ 'user', 'switcher', 'selected', 'hideBio' ],
  data() {
    return {
      userHighlightLocal: ''
    }
  },
  mounted () {
    const config = this.$store.state.config
    config.highlight = config.highlight || {}
    this.userHighlightLocal = config.highlight[this.user.screen_name]
  },
  computed: {
    headingStyle () {
      const color = this.$store.state.config.colors.bg
      if (color) {
        const rgb = hex2rgb(color)
        const tintColor = `rgba(${Math.floor(rgb.r)}, ${Math.floor(rgb.g)}, ${Math.floor(rgb.b)}, .5)`
        return {
          backgroundColor: `rgb(${Math.floor(rgb.r * 0.53)}, ${Math.floor(rgb.g * 0.56)}, ${Math.floor(rgb.b * 0.59)})`,
          backgroundImage: [
            `linear-gradient(to bottom, ${tintColor}, ${tintColor})`,
            `url(${this.user.cover_photo})`
          ].join(', ')
        }
      }
    },
    isOtherUser () {
      return this.user.id !== this.$store.state.users.currentUser.id
    },
    subscribeUrl () {
      // eslint-disable-next-line no-undef
      const serverUrl = new URL(this.user.statusnet_profile_url)
      return `${serverUrl.protocol}//${serverUrl.host}/main/ostatus`
    },
    loggedIn () {
      return this.$store.state.users.currentUser
    },
    dailyAvg () {
      const days = Math.ceil((new Date() - new Date(this.user.created_at)) / (60 * 60 * 24 * 1000))
      return Math.round(this.user.statuses_count / days)
    },
    userHighlightEnabled: {
      get () {
        return this.userHighlightLocal
      },
      set (value) {
        const config = this.$store.state.config
        config.highlight = config.highlight || {}
        if (value) {
          this.userHighlightLocal = config.highlight[this.user.screen_name] = '#FFFFFF'
        } else {
          this.userHighlightLocal = undefined
          delete config.highlight[this.user.screen_name]
        }
      }
    },
    userHighlightColor: {
      get () {
        const config = this.$store.state.config
        config.highlight = config.highlight || {}
        return config.highlight[this.user.screen_name]
      },
      set (value) {
        const config = this.$store.state.config
        config.highlight = config.highlight || {}
        config.highlight[this.user.screen_name] = value
      }
    }
  },
  components: {
    StillImage
  },
  methods: {
    followUser () {
      const store = this.$store
      store.state.api.backendInteractor.followUser(this.user.id)
        .then((followedUser) => store.commit('addNewUsers', [followedUser]))
    },
    unfollowUser () {
      const store = this.$store
      store.state.api.backendInteractor.unfollowUser(this.user.id)
        .then((unfollowedUser) => store.commit('addNewUsers', [unfollowedUser]))
    },
    blockUser () {
      const store = this.$store
      store.state.api.backendInteractor.blockUser(this.user.id)
        .then((blockedUser) => store.commit('addNewUsers', [blockedUser]))
    },
    unblockUser () {
      const store = this.$store
      store.state.api.backendInteractor.unblockUser(this.user.id)
        .then((unblockedUser) => store.commit('addNewUsers', [unblockedUser]))
    },
    toggleMute () {
      const store = this.$store
      store.commit('setMuted', {user: this.user, muted: !this.user.muted})
      store.state.api.backendInteractor.setUserMute(this.user)
    },
    setProfileView (v) {
      if (this.switcher) {
        const store = this.$store
        store.commit('setProfileView', { v })
      }
    }
  }
}
