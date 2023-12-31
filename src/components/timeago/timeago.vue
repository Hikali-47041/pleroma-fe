<template>
  <time
    :datetime="time"
    :title="localeDateString"
    :class="{ warning: relativeTime.direction === 'time.in_future' }"
  >
    <template
      v-if="withDirection"
    >
      {{ time.toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'}) }}
      ({{ 
        relativeTime.direction === '' ?
          $tc(relativeTime.key, relativeTime.num, [relativeTime.num]) :
          $t(relativeTime.direction, [$tc(relativeTime.key, relativeTime.num, [relativeTime.num])])
      }})
    </template>
    <template v-else>
      {{ time.toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'}) }}
      {{ $tc(relativeTime.key, relativeTime.num, [relativeTime.num]) }}
    </template>
  </time>
</template>

<script>
import * as DateUtils from 'src/services/date_utils/date_utils.js'
import localeService from 'src/services/locale/locale.service.js'

export default {
  name: 'Timeago',
  props: ['time', 'autoUpdate', 'longFormat', 'nowThreshold', 'withDirection'],
  data () {
    return {
      relativeTime: { key: 'time.now', num: 0 },
      interval: null
    }
  },
  computed: {
    localeDateString () {
      const browserLocale = localeService.internalToBrowserLocale(this.$i18n.locale)
      return typeof this.time === 'string'
        ? new Date(Date.parse(this.time)).toLocaleString(browserLocale)
        : this.time.toLocaleString(browserLocale)
    }
  },
  created () {
    this.refreshRelativeTimeObject()
  },
  unmounted () {
    clearTimeout(this.interval)
  },
  methods: {
    refreshRelativeTimeObject () {
      const nowThreshold = typeof this.nowThreshold === 'number' ? this.nowThreshold : 1
      this.relativeTime = this.longFormat
        ? DateUtils.relativeTime(this.time, nowThreshold)
        : DateUtils.relativeTimeShort(this.time, nowThreshold)
      if (this.autoUpdate) {
        this.interval = setTimeout(
          this.refreshRelativeTimeObject,
          1000 * this.autoUpdate
        )
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../_variables.scss';
.timeago {
  time.warning {
    color: var(--alertWarning, $fallback--alertWarning);
  }
}
</style>
