// pages/campusService/campusService.js
var app = getApp()
var entertainment
var accommodation
var shopping
var eating
var post
var bank
var contact
var study
var printStore
var cafe
var tips
var under29
var under45

Page({
  data:{
    content: [
      {chinese: '娱乐设施', english: 'entertainment'},
      {chinese: '临时住宿', english: 'accommodation'},
      {chinese: '购物去处', english: 'shopping'},
      {chinese: '食堂信息', english: 'eating'},
      {chinese: '邮局', english: 'post'},
      {chinese: '银行', english: 'bank'},
      {chinese: '网站服务及电话服务', english: 'contact'},
      {chinese: '自习点', english: 'study'},
      {chinese: '打印店', english: 'printStore'},
      {chinese: '咖啡厅', english: 'cafe'},
      {chinese: '生活提示', english: 'tips'},
      {chinese: '29楼地下店面', english: 'under29'},
      {chinese: '45甲地下店面', english: 'under45'}
    ]
  },
  onLoad:function(){
    entertainment = [{
      name: '百周年纪念讲堂',
      content: '有电影和演出信息，售票时间：上午9:30-13:00 下午15:00-19:30，售票地点：百周年纪念讲堂。\n咨询电话：62752278、62768588。\n网址：http://www.pku-hall.com/'
    },{
      name: '图书馆南配楼',
      content: ' 图书馆南侧东南门，门口的布告牌子上面写着电影名，或者把电影介绍贴在那里的玻璃上， 分楼上和楼下两个厅，楼上一般是三元看两个电影，如果你只看后一个两元。楼下可以点片子看， 按片子的时间长度收钱，一般6-10元。 '
    },{
      name: '体育健身场馆-二体网球场',
      content:[['时间安排-开放时段','校内学生','校内教工','其他人员'],['每周一至周五-06:00 ~ 08:00','10元/h','20元/h','30元/h'],['每周一至周五-12:00 ~ 13:00','20元/h','30元/h','60元/h'],['每周一至周五-17:00 ~ 22:00','20元/h','30元/h','50元/h'],['周末及节假日-06:00 ~ 08:00','10元/h','20元/h','30元/h'],['周末及节假日-08:00 ~ 22:00','20元/h','30元/h','60元/h']],
      addition:"开灯加收费10元/小时，以校内人员标准预定者，每块场地只允许带一名其他人员进场打球。如超过以上标准，则按其他人员标准收费。联系电话：62759094\n咨询电话：62759094"
    },{
      name: '体育健身场馆-羽毛球',
      content: '邱德拔体育场（咨询电话：62760676）、五四体育馆（咨询电话：62753697）'
    },{
      name: '体育健身场馆-乒乓球',
      content: '邱德拔体育场（咨询电话：62744432）、理科1号楼地下1层康美乐（咨询电话：62757424）'
    },{
      name: '体育健身场馆-健身',
      content: '邱德拔体育场（咨询电话：62756582）、理科1号楼地下1层康美乐（咨询电话：62757424）'
    },{
      name: '体育健身场馆-游泳',
      content: '五四游泳馆（咨询电话：62767306）、邱德拔体育场（咨询电话：62744178）'
    },{
      name: '康美乐体育健身会（北京大学店）',
      content: '项目:乒乓球、羽毛球、台球、健身、瑜伽、羽毛球、健美操等。\n地点:北京大学理科一号楼地下一层。\n电话:010-62757424。'
    },{
      name: '中关新园康乐中心',
      content: [['项目','规格','营业时间'],['游泳（含桑拿）','5条泳道（25m*14m）','15:00 ~ 23:00'],['健身','有氧、无氧（器械）','15:00 ~ 23:00'],['保龄球','4条球道（宾士域）','15:00 ~ 23:00'],['羽毛球','标准场地','15:00 ~ 23:00'],['壁球','一代场地','15:00 ~ 23:00'],['台球（美式落袋、斯诺克）','标准（星牌）','15:00 ~ 23:00'],['棋牌室','自动麻将机','16:00 ~ 24:00'],['KTV','小包、中包、大包','16:00 ~ 24:00']],
      addition:'地址：中关新园4号楼南侧\n咨询电话：62752257'
    }]
    accommodation = [{
      name: '北大勺园',
      content: '勺园地处北大校内，现有标准间、单人间、套间各类客房212套。客房舒适典雅，简洁明亮，所有房间可以免费无线上网，拥有独立卫生间，提供24小时热水，房间内配有电视、空调。欢迎广大师生、宾客惠顾。\n联系电话：62752218，62752200'
    },{
      name: '北京大学中关新园（留学生专家公寓园区）',
      content: '中关新园位于北京大学东南门外，是集住宿、餐饮、会议、康乐等多功能于一体的综合性服务园区。1号楼客房按四星级标准配备，共有标准间、行政套房等各类房型203套。9号楼客房按三星级标准配备，共有标准间、大床间、行政套房等176套。房间设计简洁典雅，功能设施一应俱全，为宾客提供舒适和便利的旅居环境。\n联系电话：62752288转70888、70808'
    }]
    shopping = [{
      name: '物美超市',
      content: '三处分别位于45楼甲地下室、五四操场旁、邱德拔体育馆内，是北大最大和品种最齐超市。物美超市底下的博雅堂以及旁边的 两个书店，可以购书。'
    },{
      name: '北大教材中心',
      content: '位于二教东北侧，营业时间：周一至周五为9：00 – 17：30、周末为9：30 – 17：00。主要销售教材资料。'
    },{
      name: '新华书店',
      content: '位于29楼地下一层，营业时间：8：30 – 18：00。出售各类书籍，包括工具书，经济类，法律类，计算机类等等。'
    },{
      name: '国安社区',
      content: '两处分别位于新太阳中心地下和29楼地下'
    },{
      name: '小卖部',
      content: '一体旁、二体旁各有一间'
    },{
      name: '果宝果园',
      content: '45楼甲地下'
    },{
      name: '山合谷',
      content: '（29楼地下）\n水果种类更多，价格更低，而且还有切片装和果味饮料'
    },{
      name: '博雅堂书店',
      content: '位于物美超市内，营业时间：9：00 – 22：30。出售各类书籍。不同的书籍有不同的折扣。可以预定各种教材。咨询电话为：010–62760120。'
    },{
      name: '野草书店',
      content: '位于物美超市内，营业时间：9：00 – 22：00。出售各类书籍。不同的书籍有不同的折扣。'
    },{
      name: '周末书市',
      content: '位于小西门附近，只在周末开放。同学们可以找到物美价廉的二教科书、参考书等，还有各种各样的学习用品，讨价还价的热闹场面也别有一番情趣。'
    }]
    eating = [{
      name: '食堂营业时间表',
      content: [['食堂名称','早餐时间','午餐时间(一~五、常)','午餐时间(六、日、节)','晚餐开餐时间'],['学一-食堂','7:00-8:30','11:00-13:30','11:00-12:30','17:00-18:30'],['学一-临时售饭亭','7:00-13:30','7:00-13:30','7:00-13:30','16:30-23:00'],['学一-主食售卖点','无','11:00-12:30','无','17:00-18:00'],['艺园-食堂','6:30-8:30','10:30-13:30','10:30-12:40','16:30-18:40'],['艺园-二层','无','11:00-14:00','11:00-14:00','17:00-21:00'],['艺园-临时售饭亭','7:00-13:30','7:00-13:30','7:00-13:30','16:30-23:00'],['学五食堂-中式快餐、水饺部','10:00-22:00','10:00-22:00','10:00-22:00','10:00-22:00'],['学五食堂-西式快餐、桂林米粉','7:30-22:00','7:30-22:00','7:30-22:00','7:30-22:00'],['学五食堂-二楼快餐','9:00-19:00','9:00-19:00','9:00-19:00','9:00-19:00'],['学五食堂-临时售饭亭(37楼旁)','无','11:00-13:30','11:00-13:30','16:30-23:00'],['学五食堂-面食部','7:00-14:00','7:00-14:00','7:00-14:00','16:30-21:30'],['燕南美食-食堂','7:00-8:30','10:40-13:30','10:40-13:00','16:40-19:00'],['燕南美食-地下餐厅','无','11:00-13:30','11:00-13:30','17:00-20:00'],['燕南美食-泊星地','7:00-24:00','7:00-24:00','7:00-24:00','7:00-24:00'],['勺园食堂-一层','6:45-8:30','11:00-13:30','11:00-13:00','17:00-19:00'],['勺园食堂-二层','无','11:00-13:30','11:00-13:00','17:00-19:00'],['勺园食堂-三层','无','11:00-13:30','11:00-13:00','无'],['最美时光-咖啡厅','11:00-23:00(20:30后不提供餐品)','11:00-23:00(20:30后不提供餐品)','11:00-23:00(20:30后不提供餐品)','11:00-23:00(20:30后不提供餐品)'],['松林-餐厅','6:30-14:00','6:30-14:00','6:30-14:00','16:00-21:30'],['农园-一层','无','11:00-13:30','11:00-13:00','17:00-19:00'],['农园-二层','无','11:00-13:00','11:00-13:00','17:00-21:00'],['农园-三层','无','11:00-13:00','11:00-13:00','17:00-19:00'],['农园-主食售卖点','无','11:00-12:30','无','17:00-21:00'],['畅春园-一层','6:50-8:30','11:00-13:30','11:00-13:30','17:00-21:00'],['畅春园-二层','无','11:00-13:00','11:00-13:00','17:00-19:00'],['畅春园-三层','无','11:00-14:00','11:00-14:00','17:00-21:00'],['佟园-清真食堂','7:00-8:30','11:00-13:30','11:00-13:30','17:00-19:00'],['勺园7号楼中餐厅-一层二层','无','11:00-14:30','11:00-14:30','17:30-21:00'],['勺园西餐厅-勺园6号楼一层、负一层','7:00-9:00','9:00-21:00','9:00-21:00','9:00-21:00'],['和园主题餐厅-中关新园5号楼1层','无','11:00-14:30','11:00-14:30','17:00-22:00'],['怡园中餐厅-中关新园2号楼1层','无','11:30-14:00','11:30-14:00','17:00-21:00'],['时光西餐厅-中关新园2号楼2层','6:30-9:30','无','无','无'],['辰光咖啡厅-中关新园6号楼B2层','7:00-9:00','11:00-13:30(教职工餐)','11:00-13:30(教职工餐)','无']]
    }]
    post = [{
      name: '北大邮电所',
      content: '43楼南侧底商\n电话：010-62757455'
    },{
      name: '中关村邮局',
      content: '海淀区北京市海淀区中关村大街（海龙南面，近邻E世界）\n网址http://www.zgcpost.com'
    }]
    bank = [{
      name: '工商银行（营业厅）',
      content: '43楼北侧底商，在校内多处设有自动取款机。'
    },{
      name: '农业银行（营业厅）',
      content: '物美超市北侧，在校内多处设有自动取款机。'
    },{
      name: '邮政储蓄银行（营业厅）',
      content: '43楼南侧底商，营业厅旁有ATM取款机。'
    },{
      name: '中国银行（ATM机）',
      content: '新太阳活动中心一层南侧。'
    },{
      name: '交通银行（ATM机）',
      content: '松林包子铺北侧。'
    },{
      name: '建设银行（ATM机）',
      content: '三教东侧（靠近邱德拔体育馆那侧）。'
    },{
      name: '建设银行',
      content: '正南门外往东100米左右，北大资源东楼。'
    },{
      name: '北京银行',
      content: '东南门马路对面方正大厦一层北侧'
    },{
      name: '工商银行',
      content: '北大西南门出门过马路后往南走80米左右，硅谷电脑城旁。'
    },{
      name: '民生银行',
      content: '东南门马路对面方正大厦一层南侧。'
    },{
      name: '招商银行',
      content: '清华东侧紫光大厦一层，北四环西路56号辉煌时代大厦1层，ATM机：东南门出去往南走三角地咖啡附近。'
    },{
      name: '中国银行',
      content: '出西南门往南走20米左右。'
    }]
    contact = [{
      name: '网络服务',
      content: [{
        name: '校医院',
        contact: 'https://hospital.pku.edu.cn/'
      },{
        name: '校内信息门户',
        contact: 'https://portal.pku.edu.cn'
      },{
        name: '教务部',
        contact: 'https://dean.pku.edu.cn'
      },{
        name: '网络服务(修改密码、设置邮件)',
        contact: 'https://its.pku.edu.cn'
      },{
        name: '访客上网服务',
        contact: 'https://its.pku.edu.cn/service_1_visitor.jsp'
      },{
        name: '形势与政策课程平台',
        contact: 'https://xszc.pku.edu.cn'
      },{
        name: '北京大学收费平台(学费住宿费、澡卡充值)',
        contact: 'https://cwsf.pku.edu.cn'
      },{
        name: '正版软件下载',
        contact: 'https://software.pku.edu.cn'
      },{
        name: '财务部综合信息门户(需VPN)',
        contact: 'https://cwfw.pku.edu.cn'
      },{
        name: '北大网盘',
        contact: 'https://disk.pku.edu.cn'
      },{
        name: 'P大树洞',
        contact: 'https://pkuhelper.pku.edu.cn/hole/'
      },{
        name: '用电服务',
        contact: '微信公众号：北京大学用电管理服务号'
      }]
    },{
      name: '应急电话',
      content: [{
        name: '校内查号台',
        contact: '62752114，62752060'
      },{
        name: '校消防',
        contact: '62752119'
      },{
        name: '救护车',
        contact: '999'
      },{
        name: '保卫部值班室',
        contact: '62751321'
      },{
        name: '燕园派出所',
        contact: '62751331'
      },{
        name: '校医院急诊',
        contact: '62751919'
      },{
        name: '电话障碍台',
        contact: '62752222'
      },{
        name: '铁通电话维修',
        contact: '112，51532000'
      }]
    },{
      name: '日常服务',
      content: [{
        name: '修暖气',
        contact: '62755433'
      },{
        name: '校电工队',
        contact: '62751556'
      },{
        name: '教材中心',
        contact: '62752078，62752079，62752077'
      },{
        name: '校零修（水电暖木、钢窗玻璃）',
        contact: '62753319'
      },{
        name: '校园环境（校园服务中心）',
        contact: '62751561'
      },{
        name: '校园服务中心运行办公室',
        contact: '62752020'
      },{
        name: '综合服务（会场绿植、花卉租摆、条幅制作，校园服务中心负责）',
        contact: '62753120'
      },{
        name: '教室服务',
        contact: '62755281'
      },{
        name: '报刊订阅投递',
        contact: '62751567'
      },{
        name: '大浴室',
        contact: '62753116'
      },{
        name: '畅春园浴室',
        contact: '62760726'
      },{
        name: '百周年纪念讲堂',
        contact: '62768588，62752278'
      },{
        name: '学生就业手续政策咨询热线',
        contact: '62756357'
      },{
        name: '学生资助咨询电话',
        contact: '8008100186，4006507191 '
      }]
    },{
      name: '住宿相关',
      content: [{
        name: '后勤招待所',
        contact: '62755755'
      },{
        name: '中关新园',
        contact: '62752288，62752236'
      },{
        name: '中关村酒店',
        contact: '62565577'
      },{
        name: '北大资源宾馆',
        contact: '62757199，62750998，62750855'
      },{
        name: '中科院一招',
        contact: '62565511'
      }]
    },{
      name: '出行参考',
      content: [{
        name: '28楼订票室',
        contact: '62753455'
      },{
        name: '中关新园司机班组电话',
        contact: '62752288转70111'
      },{
        name: '北京市出租车召车电话',
        contact: '96106'
      },{
        name: '北京交通服务热线',
        contact: '96166'
      },{
        name: '民航、火车订票 清华东门外华业大厦对面',
        contact: '62783630，62784949'
      },{
        name: '北京巴士股份有限公司旅游客运分公司（北京北旅时代旅游客运分公司）',
        contact: '67276666 '
      }]
    }]
    study = [{
      name: '北京大学图书馆',
      content: '地点：文史楼、一教附近\n时间：大门及自习区：周一至周日6:30-22:30\n主要借阅区：周一至周日 8:30-22:00\n设备及体验：期末考前两周会推迟半小时闭馆，人比较多（考试周尤甚）但自习环境安静；自习座位4000余个（分布在各阅览室及楼层通道），楼道自习区有圆形插座（较多），部分阅览室内插座较少；东区2-4层有饮水间；缺点是夏季空调效果一般且施工未完成期间较吵'
    },{
      name: '教学楼',
      content: '地点：校内各处\n时间：周一至周日 7:30-22:30（期末季会延迟至23:00）\n科普时间：校内用于讨论的小教室（二教、四教、地学楼等）可以网上通过小程序"北大空间"预约，需要至少三位同学一起。\n一教：一楼有麦叔；距生活区较远，夜晚回寝可能不太安全；教室较小，自习人数很少，环境非常安静但蚊虫较多；设备略陈旧，空调效果一般\n二教：共五层，二楼楼梯拐角有麦叔，每层有自动售货机，离食堂近；教室多但需要提前查看是否用作教室；楼道中自习区也较多，学习气氛浓；每间教室电源插座数量不定；树下是很好的自习场所（如果周围没有人讨论最佳）\n三教：共五层，有自动售货机，二层有麦叔，离食堂近；教室较多且人较少，座位较多；每间教室一般两侧各两个插头，前后各两个插头共六个插头；三四教楼道中可以背书，但不影响三教教室；靠近五四体育场，可能有时受影响较为嘈杂\n四教：均为小教室，且需要网上预定（三人及以上），现一般用作讨论或开会\n理教：共四层，有自动售货机，一楼有麦叔；教室多但需要提前查看是否用作教室，学习气氛浓；每层外部有沙发等自由讨论区，露天楼梯、阳台与一楼小花园可以朗诵背书\n文史楼：晚上较空，但蚊虫较多，空调适宜（若教室内未开空调需要通知一楼工作人员控制）\n地学楼：一般预约作讨论用（小教室隔音好，适合讨论），101等大教室可自习；灯光明亮光线充足，设备新\n注意：人员流动性较大，需随时注意随身贵重物品；同时时常有校外奇怪人员出没，自习时需注意安全；二教理教等教学楼夏季空调很足，小心感冒；二教与三教在二楼是联通的，二教五层一般用作讨论室需要网上提前预约；四教在一二三四楼与三教相联通（主要从三教进入四教）'
    },{
      name: '双创地下',
      content: '地点：二教旁\n时间：-22：00\n体验：桌子很大，晚上自习/讨论区可能会关灯；内有咖啡馆，可作为讨论/自习地点'
    },{
      name: '新太阳活动中心',
      content: '地点：百年讲堂、三角地旁边\n时间：6:30-24:00（22:00关侧门，23:00左右开始熄灯）\n体验：一层的自习区因为安全问题暂封，不知下学期会不会开；二三层有零散的自习座位，但数量较少；夏季蚊虫较多；光线较暗，建议自带台灯；B1有国安社区可以购买食品等'
    },{
      name: '前言后记',
      content: '地点：45楼地下，物美超市旁边\n时间：9:00-23:00\n体验：环境很好、非常安静、灯光较暗，有插座但数量较少；有空调及WiFi；可体验免费借书，买书7折优惠'
    },{
      name: '北大书店',
      content: '地点：新太阳地下一层，正对国安社区\n时间：8:00-22:00\n体验：环境不错、较为安静；光线很好，有插座，有中央空调，提供咖啡甜品等；位置较少且座椅较高'
    },{
      name: '麦叔',
      content: '地点：45楼地下\n时间：24小时\n体验：较安静，有电源，位置有限且抢手，吧台座椅舒适度较差，苍蝇较多；最大的诱惑是旁边就可以买吃的，空气中弥漫着食物的香气，可能在填饱脑子前先填饱肚子；晚上可能会有各色人等出没，女生尽量不要一个人在麦叔刷夜！'
    },{
      name: '全家',
      content: '地点：29楼地下\n时间：24小时\n体验：晚上位置较抢手且时常有人讨论，11-12点以前较吵；仅两侧座位有电源，有自助打印机；食物的诱惑比知识的吸引力更大；晚上可能会有各色人等出没甚至会有奇怪的人搭讪，女生尽量不要一个人在全家刷夜！'
    },{
      name: '最美时光咖啡厅',
      content: '地点：学五食堂正对面，29/30楼附近\n时间：9:00-22:00（日常最晚至22:30，期末季会延长营业时间）\n体验：无最低消费限制；时常有人交谈，安静度一般，常做讨论用；位置一般，有WiFi但不是特别快'
    },{
      name: '寝室',
      content: '时间：晚11:00熄灯\n体验：不建议自制力差的同学整天呆在寝室，可能会荒废人生；若室友不介意，寝室是夜间学习的最佳场所~当然，室友间互相体谅是必不可少的，刷夜的同学最好不要打扰早睡同学休息。'
    },{
      name: '外院院图',
      content: '地点：外院新楼负一楼，较偏远（校园东北角）\n时间：上午8:00-11:30 下午1:00-5:00\n体验：大致30-40座位，桌子较大，空调效果好；没有WiFi（对脱机自习友好）\n注意：其他院系可以进入'
    },{
      name: '物理学院（东门外）',
      content: '时间：可通宵\n体验：有自习点，西楼3层位置较多，缺点是有人讨论，安静度一般；地下自习室较安静\n注意：可能需要出示学生卡验证学生身份，外院系原则上不能进，但可进出'
    },{
      name: '化学与分子工程学院（东门外）',
      content: '时间：6:00-24:00（仅化院学生可凭导师签字通宵，早上6点即可进入）\n体验：（A区）新楼环境好，较为安静，空调较适宜；晚上不会关门，但12点会催人离开\n注意：可能需要出示学生卡验证学生身份，但外院系可进出'
    },{
      name: '光华楼',
      content: '地点：图书馆斜对面，二教至理教的路上\n时间：7:00-不封楼（22:00左右开始赶人）\n体验：走廊有沙发、插座、空调，下午202一般空闲无课，但一二层讨论的同学较多，安静度一般；工作人员可能询问在走廊上的同学院系，会驱赶非gsm同学；WiFi较差，手机信号差，适合脱机自习'
    },{
      name: 'ZOO COFFEE',
      content: '地点：小西门对面，原KFC旁\n营业时间：7:30-24:00（期末季可能会调整）\n人均消费：45\n体验：有WiFi但网速较慢，且有连接人数上限；插座数量不少，但借用插线板需要押金；店面较小但环境比较舒适，灯光要看座位选择；提供西式简餐，价格略贵但味道不错，不强制点单；但夏天二层空调不太给力，且时常有组聚和讨论，安静度比校内教室差'
    },{
      name: '肯德基',
      content: '地点：五道口\n营业时间：24小时（偶尔半夜关门）\n体验：非常吵，有插座，空调稍有些冷'
    },{
      name: '麦当劳',
      content: '地点：海淀桥南，出小西门向南走过海淀桥外'
    },{
      name: '星巴克',
      content: '地点：小西门外\n营业时间：8:00-20:30'
    },{
      name: '依云轩茶楼',
      content: '地点：畅春园食街，乘电梯上2楼\n营业时间：24小时\n体验：有WiFi且速度较快，每桌有电源；环境很安静，分为隔间和包间，包间收取每小时包厢费（不受外界打扰，但包间之间隔音较差；光线较暗；夏季蚊虫较多），隔间收取每人茶位费，茶水免费续杯；最大的缺点是贵（人均70-80，学生证9折）'
    },{
      name: '兰咖咖啡馆',
      content: '地点：海淀体育馆北门院内\n时间：24:00左右准备关门，最晚至2:00\n体验：座位多，较安静，有部分电源；小包间收包间费，散座点一杯饮料即可自习；距离较远'
    },{
      name: '三联韬奋书店',
      content: '地点：离清华较近，海淀区王庄路1号清华同方大厦D座1层\n时间：装修完毕非24小时营业\n体验：期末季人不少，离清华较近；书籍较多，装修好；有咖啡与甜点'
    },{
      name: '已拆柏拉图咖啡厅',
      content: '地点：成府路69号 蓝旗营外\n时间：可通宵\n体验：非周五六日通宵可以选择，节假日期间可能有人玩棋牌较吵；店面不大，在二楼比较安全；平均消费30；沙发椅足够但期末季人较多，可找到座位但去太晚可能会没座位'
    },{
      name: 'bridge coffee',
      content: '地点:五道口sensation旁，离北大很近，往蓝旗营方向骑车约十几分钟\n体验：门面较小，二、三层较安静；插线板多，有沙发、体验舒适；若人少可能后半夜关闭三楼将人集中在二楼；食品好吃（4-8点有早餐8折优惠），旁边club的音乐影响不大'
    }]
    printStore = [{
      name: '29楼地下四号快印',
      content: '营业时间：周一-周五8:30-22:00；周末9:30-21:00\n电话：13120421238；62760090\n微信：545259418'
    },{
      name: '29楼地下七号快印',
      content: '营业时间：8:30-22:30\n电话：010-62759171\nQQ：714992930\n邮箱：Idfy69@163.com'
    },{
      name: '快递点地下',
      content: '电话：13439766368\nQQ：2570575226\n邮箱：xdky_2006@163.com'
    },{
      name: '物美地下印吧',
      content: '营业时间：8:00-23:00\n电话：13520170668；62758319\nQQ：835720764\n邮箱：ouyang73@163.com；835720764@qq.com'
    },{
      name: '物美地下铭艺(未名礼品)',
      content: '营业时间：7:30-22:30\n电话：15652626788\nQQ：2807349891\n邮箱：2807349891@qq.com'
    },{
      name: '新太阳106',
      content: '营业时间：8:30-17:00\n新太阳的教学服务大厅的打印机，同样适用联创，但是和图书馆不是同一个，所以操作类似于普通打印店'
    },{
      name: '图书馆联创',
      content: '营业时间：6:30-22:30（理论上开门后即可，临近八点肯定是可以的）\n联创系统可以在自己的电脑安装客户端，然后在自己的电脑点打印后再去图书馆进行打印，其实还是挺方便的'
    },{
      name: '理科一号楼文印部',
      content: '营业时间：周一-周五8:00-18:30；周六到周日：8:30-18:30\nQQ：2537465398\n急需加班提前来电：13911893958'
    },{
      name: '理二打印店',
      content: '营业时间：6:00-18:30\n不能在线传文件'
    },{
      name: '廖凯原楼打印店',
      content: '营业时间：8:00-18:00\nQQ: 1811836569\n邮箱：s2102@pku.edu.cn'
    },{
      name: '遥感楼打印店',
      content: '营业时间：平时9:00-18:30；周六9:00-16:30\nQQ：595210087'
    },{
      name: '心理系文印部',
      content: '营业时间：周一-周五8:00-18:30；周六到周日：8:30-18:30\n电话：62765509；13911893958\nQQ：972958637\n邮箱：S2102@pku.edu.cn'
    }]
    cafe = [{
      name: '泊星地咖啡厅',
      content: '燕南'
    },{
      name: '最美时光咖啡厅',
      content: '31楼北面'
    },{
      name: 'YOUNG 咖啡厅',
      content: '二教一楼'
    },{
      name: '树下咖啡厅',
      content: '二教三楼'
    },{
      name: '农园咖啡厅',
      content: '农园'
    }]
    tips = [{
      name: '如何打印成绩单？',
      content: '如果需要带GPA的成绩单，可以自己上教务部网站，复制粘贴下来自己的成绩单内容到word文档，而后打印出来找院系教务老师帮忙盖章；如果需要正式中文成绩单，在办公时间到新太阳1楼教务部办公室即到即取，每学期第1份免费；如果需要正式英文成绩单，则先到教务部网站预订，并交好费，一般第二周周二或者周四去新太阳1楼教务部办公室领取。'
    },{
      name: '如何打印在学证明？',
      content: '在办公时间到新太阳1楼教务部办公室即到即取，每学期第1份免费；新太阳1楼有自助机器可以刷校园卡打印了。'
    },{
      name: '校园卡掉了怎么办？',
      content: '可登陆card.pku.edu.cn挂失（不挂失的话有可能被盗刷造成财物损失）；可以通过BBS、朋友圈发布信息方式看看有没有人捡到；补办的话请在办公时间去新太阳B117补办，要40块，即到即办即取。'
    },{
      name: '校园卡没钱了怎么办？',
      content: '可以用支付宝-校园生活-一卡通功能，充值，一般几分钟内可以到账；此外，关注PKUCampusCard可以使用微信给校园卡充值。\n线下实体的话，可以去28楼后勤服务大厅窗口充值'
    },{
      name: '澡卡掉了怎么办？',
      content: '看看是否有有缘人捡到，放在了澡堂里；去31楼地下大澡堂窗口补办，需要10块，即到即办即取。'
    },{
      name: '如何交网费？',
      content: '首选登陆its.pku.edu.cn后使用支付宝充值；网费用完也会使得某天突然断网造成自己被开除的错觉，注意及时充值哦；使用北大VPN也需要不欠网费，但是使用不另外扣费。'
    },{
      name: '到哪里买文具？',
      content: '物美地下和29楼地下全家有文具可以购买，此外教学楼中麦叔的铺子也有，但总的种类不是特别多；可以用淘宝或天猫网购，比较实惠且选择多。'
    },{
      name: '到哪里买北大周边？',
      content: '新太阳地下有专门的直营店，出售正版周边。肥猴也会时不时有一些创意产品，但是获得方式云谲波诡。'
    },{
      name: '正装怎么借/买？',
      content: '貌似只能发送朋友圈借正装；购买正装的话，校内有一家杰士迈，在29楼地下，价格相对便宜，质感和价格相符；新中关、西单、王府井有不少出售正装的品牌，大家可以按需选购；正装的得体、质感和合身最重要。所以大家在买正装的时候一定要找一个审美比较好的同学帮助评价或者量身定制。\n正装在学校生活中虽然不会随时用到，但却必不可少，在参加正式活动、各类面试、各类答辩中是必要的。 '
    },{
      name: '到哪里剪头发、烫染头发？',
      content: '很遗憾，并没有最优选择……\n校内大澡堂旁边有一家价格较低的理发屋，但很多同学表示是“燕园毁发店”；校外理发店往往都会推销会员卡，请大家注意守住钱包，遵循“我是消费者我是大爷”的心态进行消费，不要受骗不要冲动消费，被欺负了要勇敢维权（东方美悦什么的……）；大众点评和美团会有这些理发店的评价、地址等，也有一些较实惠的理发套餐可以选择。'
    },{
      name: '证件照/护照照片哪里照？',
      content: '学校29楼地下，物美地下都有照相馆可以照，部分打印店也可以拍照，但是质量和专业程度不一；校外的话，有微笑时刻、天真蓝、小象馆等照相馆，大家可以用微信搜索其公众号，进入了解地址、价格和预约方式。选择之前注意搜索朋友圈看看已经拍了的同学拍的怎么样（有的照相馆修的连妈都不认识了）'
    },{
      name: '如何办护照（学校集体户口）？',
      content: '登陆北京市公安局出入境管理办事大厅（http://www.bjgaj.gov.cn/jjcrj/?parm=jj1），网上预约时间和地点（最近地点在苏州街），而后准备好材料准时去办证即可，护照办好后会寄回学校。'
    },{
      name: '买牛奶去哪里？',
      content: '鲜牛奶和酸奶可以在各个食堂，物美，以及29楼底下全家、山合谷、国安社区、新太阳国安买到；网购一些利乐装纯牛奶也很方便哦，但是需要自己从快递点扛回寝室……29楼地下国安社区提供送货服务，可以看其商品清单是否有习惯喝的牛奶。'
    },{
      name: '如果生病了怎么办？',
      content: '出门往北去校医院；虽然校医院医生确实不算靠谱，但是小病小伤还是没问题，做各种检查也还是够用的；并且大部分医疗医药费用可以打一折，如果自费去北医三等医院可能无法控制花费。\n如果比较严重，可以先去校医院挂号看医生，强烈要求他开转诊单，你就可以去北医三就医；收好各种收费发票，一个月内到校医院旁边小房子里报销，还是一折。\n如果自己想去北医三直接看病，可以关注其微信公众平台，预约挂号，免去排队和挂不上号的问题。'
    },{
      name: '如何需要看牙了怎么办？',
      content: '可以拨打校医院口腔科电话：6275-4203/6275-9014，进行预约。\n如果很着急也可以直接去校医院口腔科（在门诊隔壁一栋楼，和妇产科一栋），和前台小姐姐说自己没挂号，她可能会有点点生气并要求你下次挂了号再过来，但是一般还是可以就诊的！\n（沙师兄按：根据个人的亲身经历，如果大家牙有问题需要补牙或者根管，最好去口腔医院看，尽管很可能是全自费，但是实际上补牙和根管等费用最大的材料费都是不报销的，这时候医生的水平很关键，但是校医院的医生实在是……补牙了需要钻掉重补等等都出现过）'
    }]
    under29 = [{
      name: '全家',
      content: '二十四小时营业的便利店。夏有冰品，冬有煮物，一年四季皆有熟食及可加热食品。店内自习区支持边吃边学，常用于刷夜自习和小组讨论，然地小人多，需要一定的占座熟练度和抗噪音能力。'
    },{
      name: '鲜花坊',
      content: '经营盆栽、捧花、礼品等。'
    },{
      name: '缝纫部',
      content: '提供衣帽缝纫、衣服修补、班服定制等服务，需要正装的同学也可以在此购买或租借。'
    },{
      name: '四号快印',
      content: '营业时间8:30-22:00（周一至周五）或9:00-21:00（周六及周日），价格单面一张一角，双面一面七分。'
    },{
      name: '明亮世界眼镜',
      content: '配眼镜'
    },{
      name: '燕鸿润照相馆',
      content: '拍摄并打印证件照'
    },{
      name: '七号快印',
      content: '营业时间8:30-22:30，价格单面一张一角，双面一面七分。'
    },{
      name: '修鞋部',
      content: '在这里你可以买到鞋垫。此外，你可以在这家店配锁或钥匙。'
    },{
      name: '中国电信',
      content: '/'
    },{
      name: '新华书店',
      content: '能买到很多教科书和拓展教材，店面规模较小。'
    },{
      name: '山合谷',
      content: '营业时间6:30-24:00，出售新鲜水果、果切、拼盘、干果、零食、酸奶、果汁以及口味较全的港田冰沙，冬天有糖葫芦供应。和食堂相比，优点是种类丰富，缺点是价格较高。'
    },{
      name: '国安社区',
      content: '可购置生活用品'
    },{
      name: '紫日金利百货',
      content: '可购置学习用品和部分生活用品'
    }]
    under45 = [{
      name: '物美超市',
      content: '校内最大的超市，8：30-23:00营业。零食饮料、生活用品较为齐全，学习用品种类较少，此外出售水果。价格相对便宜，适合批量购买和宿舍物资屯备。'
    },{
      name: '禾日香小吃店',
      content: '校内唯一一家现做现卖的小吃店，经营冰淇淋、冰粉、炒酸奶、水果捞、冰沙、鸡蛋仔、干果炒货等，冬天则可以买到糖葫芦和糖炒栗子。除了禾日香和山合谷，冬天的南门外也有糖葫芦出没。'
    },{
      name: '麦叔的铺子',
      content: '二十四小时营业的便利店，经营范围与上文的全家相似。麦叔也设有自习区，但与全家相比校外人士较多。不过，由于附近有奶茶店和书店，人不多的时候可以在这里度过一个愉快的下午茶。'
    },{
      name: '果宝果园',
      content: '营业时间7:00-23:00的水果店，经营范围与上文的山合谷相似。这家店的会员可以免费办理，积分用于兑换水果拼盘，周六周日则有九折优惠。此外，不想走出宿舍的同学可以通过微信下单，享受校内配送服务。'
    },{
      name: 'Cosmetic Garden',
      content: '化妆品店'
    },{
      name: '印吧图文快印',
      content: '营业时间9:00-22:30，单面一张一角，双面一面七分，QQ835720764'
    },{
      name: '铭印快印',
      content: '营业时间8:00-23:00，单面一张一角，双面一面一角，QQ2807349891'
    },{
      name: '博雅堂书店',
      content: '营业时间9:00-22:30，对不同种类的书籍有不同程度的折扣，可以预定教材。最新图书7.5折。咨询电话010-62760120'
    },{
      name: '前言后记',
      content: '书店，也出售一些精致的文创产品'
    },{
      name: '燕盛优品',
      content: '实用类文创产品和学习、办公用品，价格适中'
    },{
      name: '紫日金利杂货店',
      content: '和29楼底下的那一家差不多，不过这一家店龄更大。'
    },{
      name: 'Hi果',
      content: '奶茶店，营业时间11:00-23:00。优惠较多，上新较快。不过对于口味挑剔的同学来说，多数产品味道平凡，无功无过。'
    },{
      name: '小明奶茶',
      content: '奶茶店，营业时间11:00-23:00，支持校内外卖。部分同学反映味道较佳。另有部分同学反映，目前店员的操作熟练度有待提高，所以等待时间会长一点点。(2019/08/18)'
    },{
      name: '手机、手表维修',
      content: '该店宣称其功能包括“碎屏保障、手机维修、手机回收、全民不断网”。'
    },{
      name: '中国移动',
      content: '/'
    },{
      name: '中国农业银行',
      content: '在45楼外部'
    }]
    app.globalData.service = {
      entertainment: entertainment,
      accommodation: accommodation,
      shopping: shopping,
      eating: eating,
      post: post,
      bank: bank,
      contact: contact,
      study: study,
      printStore: printStore,
      cafe: cafe,
      tips: tips,
      under29: under29,
      under45: under45
    }
  }
})