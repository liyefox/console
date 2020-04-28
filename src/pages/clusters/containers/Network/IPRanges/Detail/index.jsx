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
import { observer, inject } from 'mobx-react'
import DetailPage from 'clusters/containers/Base/Detail'
import NetWorkStore from 'stores/network'
// import { getDisplayName } from 'utils'

import routes from './routes'

@inject('rootStore')
@observer
export default class IPRangesDetail extends React.Component {
  componentDidMount() {
    this.store = new NetWorkStore()
  }

  render() {
    const stores = { detailStore: this.store }

    const sideProps = {
      module: this.module,
      name: 'name',
      desc: 'desc',
      // operations: this.getOperations(),
      // attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Cluster Nodes'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} sideProps={sideProps} />
  }
}
