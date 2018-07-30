<template>
  <div>正在跳转...</div>
</template>
<script>
  import { setToken, setResource } from 'common/js/cache'
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      routerFirstMenu (menus) {
        const {typeCode, typeId, children} = menus[0]
        const childrenObj = children && children.length ? children[0] : null
        if (childrenObj) {
          const {gameId, gameCode, gameName} = childrenObj
          this.$router.push({path: `/game/${typeCode === 'ssc' ? 'ssc/kj' : typeCode}/${typeId}/${gameId}/${gameCode}/${gameName}`})
        }
      },
      getUserInfoByTokenFun (token, resource) {
        const _this = this
        _this.updateLoadingStatus({isLoading: true})
        this.$store.dispatch('getAccountInfo', token).then(data => {
          console.log(token)
          setToken(token)
          setResource(resource)
          return data
        }).then(() => {
          this.$store.dispatch('getRouter').then(menus => {
            _this.updateLoadingStatus({isLoading: false})
            _this.routerFirstMenu(menus)
          }).catch(() => {
            _this.updateLoadingStatus({isLoading: false})
            _this.$router.push({path: '/401'})
          })
        }).catch(() => {
          _this.updateLoadingStatus({isLoading: false})
          _this.$router.push({path: '/401'})
        })
      },
      ...mapMutations([
        'updateLoadingStatus'
      ])
    },
    beforeRouteEnter (to, from, next) {
      if (!from.path) return false
      next(vm => {
        const {token, resource} = to.params
        vm.getUserInfoByTokenFun(token, resource)
      })
    }
  }
</script>
