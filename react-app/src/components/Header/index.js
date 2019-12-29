import React from 'react';
import {Row, Col} from 'antd';
import './index.less';
import moment from 'moment';
import ajax from '../../ajax';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '河畔一角'
    }
  }
  componentDidMount() {
    // console.log(process.env.NODE_ENV) 访问环境变量
    setInterval(() => {
      const sysTime = moment().format('YYYY-MM-DD hh:mm:ss');
      this.setState({sysTime})
    }, 1000);
    // this.getWeather();
  }
  getWeather() {
    // api无法访问，所以注释了
    ajax.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=00LICcGlcUNj3pqBCqRxmtaX4w9SZttj'
    }).then(data => {
      console.log('data---' + data)
    }).catch(err => console.log('err---' + err))
  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.name}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            homepage
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}