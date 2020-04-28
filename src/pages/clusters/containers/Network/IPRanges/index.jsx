/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react'
import withList, { ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import NetWorkStore from 'stores/network'
import { ICON_TYPES } from 'utils/constants'
import Table from 'components/Tables/List'
import { Avatar } from 'components/Base'

@withList({
  store: new NetWorkStore(),
  name: 'Cluster network',
  module: 'network',
})
export default class IPRanges extends React.Component {
  get tips() {
    return [
      {
        title: t('NETWORK_IPRANGES_Q'),
        description: t('NETWORK_IPRANGES_A'),
      },
      {
        title: t('NETWORK_IPRANGES_Q1'),
        description: t('NETWORK_IPRANGES_A1'),
      },
    ]
  }

  get tableActions() {
    const { trigger, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      actions: [
        {
          key: 'addIPRange',
          type: 'control',
          onClick: () => {
            trigger('cluster.network.add', {
              success: this.getData,
            })
          },
          text: t('NETWORK_IPRANGES_CREATE'),
        },
      ],
    }
  }

  getColumns() {
    const { module, prefix } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        search: true,
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            to={`${prefix}/${name}`}
            title={name}
            desc={record.ip}
          />
        ),
      },
      {
        title: t('NETWORK_IPRANGES_COL_MASK'),
        dataIndex: 'status',
        search: true,
      },
      {
        title: t('NETWORK_IPRANGES_COL_USEDIP'),
        dataIndex: 'role',
        isHideable: true,
        search: true,
        render: roles => roles.join(','),
      },
      {
        title: t('Workspace'),
        dataIndex: 'system',
        isHideable: true,
        search: true,
      },
    ]
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          // itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          // alwaysUpdate={false}
          loading={false}
        />
      </ListPage>
    )
  }
}
