import { mapActions, mapMutations, mapGetters } from 'vuex'
import Bet from 'common/js/bet'
import pk10TabIcon from '@/assets/pk10_tab_icon.png'

export const lotteryMixin = {
  data () {
    return {
      playList: [],
      rankingList: [
        { label: '冠军', value: 1 },
        { label: '亚军', value: 2 },
        { label: '第三名', value: 3 },
        { label: '第四名', value: 4 },
        { label: '第五名', value: 5 },
        { label: '第六名', value: 6 },
        { label: '第七名', value: 7 },
        { label: '第八名', value: 8 },
        { label: '第九名', value: 9 },
        { label: '第十名', value: 10 }
      ],
      playIndex: 0,
      playGroupList: [],
      collecting: false,
      nowHoverMenu: 0,
      pk10TabsArr: [
        { label: '快捷', value: 'kj' },
        { label: '两面', value: 'lm' },
        { label: '冠亚和', value: 'gyh' },
        { label: '冠军', value: 'gj' }
      ],
      sscTabsArr: [
        { label: '快捷', value: 'kj' },
        { label: '两面', value: 'lm' },
        { label: '第一球', value: 'dyq' },
        { label: '第二球', value: 'deq1' },
        { label: '第二球', value: 'deq2' },
        { label: '第二球', value: 'deq3' },
        { label: '第二球', value: 'deq4' },
        { label: '第二球', value: 'deq5' }
      ],
      k3Jsks: [
        { label: '和值点数', value: 'hzds' },
        { label: '豹子', value: 'bz' },
        { label: '顺子', value: 'sz' },
        { label: '短牌', value: 'dp' }
      ],
      pk10TabIcon: pk10TabIcon
    }
  },
  computed: {
    ...mapGetters([
      'betIdsList',
      'userMenuList'
    ]),
    height () {
      return this.collecting ? `${window.innerHeight - 357}px` : `${window.innerHeight - 216}px`
    }
  },
  methods: {
    onCollectingShow () {
      this.collecting = true
      this.$nextTick(function () {
        console.log(this.$refs)
        this.$refs.playsScroll.reset()
        this.$refs.playGroupScroll.reset({top: 0})
      })
    },
    onCollectingHide () {
      this.collecting = false
      this.$nextTick(function () {
        this.$refs.playsScroll.reset()
        this.$refs.playGroupScroll.reset({top: 0})
      })
    },
    _onPlayClick (playId, index) {
      this.playGroupList = []
      this.playIndex = index
      this._getPlayGroups(playId)
    },
    isSelected (id) {
      return this.betIdsList.indexOf(id) !== -1
    },
    handleBet (groupName, groupInfo) {
      const {ruleMasterName} = this.playList[this.playIndex]
      const {id, ruleOdds, showName} = groupInfo

      this.selectBet(new Bet({
        playName: ruleMasterName,
        groupName: groupName,
        ruleId: id,
        ruleName: showName,
        ruleOdds: ruleOdds,
        amount: ''
      }))
    },
    isStopSell (pGroupCode, pGameCode) {
      const _this = this
      const obj = {
        isStopSell: false,
        ruleContent: ''
      }
      if (_this.menuList && _this.menuList.length > 0) {
        for (let x = 0; x < _this.menuList.length; x++) {
          const {typeCode, children} = _this.menuList[x]
          if (typeCode === pGroupCode && children && children.length > 0) {
            for (let y = 0; y < children.length; y++) {
              const {gameCode, removed, lotteryText} = children[y]
              if (gameCode === pGameCode) {
                obj.isStopSell = removed === 1
                obj.ruleContent = lotteryText
                break
              }
            }
            break
          }
        }
      }
      return obj
    },
    ...mapActions([
      'selectBet'
    ]),
    ...mapMutations({
      setHeaderTitle: 'SET_HEADER_TITLE',
      setLotteryId: 'SET_LOTTERY_ID',
      setLotteryCode: 'SET_LOTTERY_CODE',
      setLotteryName: 'SET_LOTTERY_NAME',
      setGroupId: 'SET_LOTTERY_GROUP_ID',
      setGroupCode: 'SET_LOTTERY_GROUP_CODE',
      setLotteryRule: 'SET_LOTTERY_RULE',
      setStopSell: 'SET_STOP_SELL',
      setStopBet: 'SET_STOP_BET'
    }),
    ...mapMutations([
      'updateLoadingStatus'
    ])
  }
}
