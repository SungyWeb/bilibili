import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Card, Button, Table } from 'antd'
import { getArticles } from '../../ajax'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
export default class ArticleList extends Component<RouteComponentProps> {
  componentDidMount() {
    getArticles().then(data => {
      console.log(data)
    })
  }
  render() {
    return (
      <Card
        title='文章列表'
        bordered={false}
        extra={<Button size='small'>导出</Button>}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            total: dataSource.length
          }}
        />
      </Card>
    )
  }
}
