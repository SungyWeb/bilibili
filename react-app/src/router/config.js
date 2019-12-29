
const base = '/admin';
const ui_base = base + '/ui';
const form_base = base + '/form';
const table_base = base + '/table';
const chart_base = base + '/chart';

const menu = [
  {
    title: '首页',
    key: base + '/home'
  },
  {
    title: 'UI',
    key: base + '/ui',
    children: [
      {
        title: '按钮',
        key: ui_base + '/admin'
      },
      {
        title: '弹窗',
        key: ui_base + '/modals'
      },
      {
        title: 'loading',
        key: ui_base + '/loading'
      },
      {
        title: '通知提醒',
        key: ui_base + '/notification'
      },
      {
        title: 'Message',
        key: ui_base + '/message'
      },
      {
        title: 'tab标签页',
        key: ui_base + '/tabs'
      },
      {
        title: '图片画廊',
        key: ui_base + '/gallery'
      },
      {
        title: '轮播图',
        key: ui_base + '/carousel'
      },
    ]
  },
  {
    title: '表单',
    key: form_base,
    children: [
      {
        title: '登录',
        key: form_base + '/login'
      },
      {
        title: '注册',
        key: form_base + '/reg'
      },
    ]
  },
  {
    title: '表格',
    key: table_base,
    children: [
      {
        title: '基础表格',
        key: table_base + '/basic'
      },
      {
        title: '高级表格',
        key: table_base + '/high'
      },
    ]
  },
  {
    title: '富文本',
    key: base + '/rich'
  },
  {
    title: '城市管理',
    key: base + '/city'
  },
  {
    title: '订单管理',
    key: base + '/order',
    btnList: [
      {
        title: '订单详情',
        key: 'detail',
      },
      {
        title: '结束',
        key: 'finish',
      },
    ]
  },
  {
    title: '员工管理',
    key: base + '/user',
  },
  {
    title: '车辆地图',
    key: base + '/bikemap',
  },
  {
    title: '图表',
    key: chart_base,
    children: [
      {
        title: '柱形图',
        key: chart_base + '/bar',
      },
      {
        title: '饼图',
        key: chart_base + '/pie',
      },
      {
        title: '折线图',
        key: chart_base + '/line',
      },
    ]
  },
  {
    title: '权限管理',
    key: base + '/permission',
  },
];

export default menu;