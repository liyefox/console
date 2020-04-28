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
import { Input, Columns, Column } from '@pitrix/lego-ui'
import { Modal, Text, Form } from 'components/Base'

import styles from './index.scss'

export default class AddIPRangesModal extends React.Component {
  get types() {
    return [
      {
        label: 'Control',
        value: 'control',
      },
      {
        label: 'Worker',
        value: 'worker',
      },
      {
        label: 'ETCD',
        value: 'etcd',
      },
    ]
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal.Form
        visible={visible}
        onCancel={onCancel}
        width={825}
        icon="eip-group"
        title={t('NETWORK_IPRANGES_CREATE')}
      >
        <Columns>
          <Column className="is-5">
            <Form.Item label="IP地址:">
              <Input name="name" />
            </Form.Item>
          </Column>
          <Column className="is-2">
            <Form.Item label="掩码位">
              <Input name="name1" />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label="创建数量:">
              <Input name="name1" />
            </Form.Item>
          </Column>
        </Columns>
        <Text title="即将创建的CIDR:" />

        <Columns className={styles.cidcols}>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name" />
            </Form.Item>
          </Column>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
          <Column className={[styles.cidcol, 'is-5'].join(' ')}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
        </Columns>
        <Columns className={styles.cidcols}>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name" />
            </Form.Item>
          </Column>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
          <Column className={[styles.cidcol, 'is-5'].join(' ')}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
        </Columns>
        <Columns className={styles.cidcols}>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name" />
            </Form.Item>
          </Column>
          <Column className={styles.cidcol}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
          <Column className={[styles.cidcol, 'is-5'].join(' ')}>
            <Form.Item>
              <Input name="name1" />
            </Form.Item>
          </Column>
        </Columns>
      </Modal.Form>
    )
  }
}
