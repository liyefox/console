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

import React, { lazy, Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Loading } from '@kube-design/components'

import { getValue } from 'utils/yaml'

import styles from './index.scss'

const AceEditor = lazy(() =>
  import(/* webpackChunkName: "react-ace" */ './AceEditor')
)

class CodeEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    mode: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    mode: 'yaml',
    options: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: getValue(props.value),
      originValue: props.value,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props
    if (prevState.originValue !== value) {
      this.setState({ value: getValue(value), originValue: value })
    }
  }

  handleChange = value => {
    const { onChange } = this.props
    this.setState({ value, originValue: value }, () => onChange(value))
  }

  render() {
    const { className, mode, options } = this.props

    return (
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <AceEditor
          {...options}
          className={classnames(styles.editor, className)}
          value={this.state.value}
          mode={mode}
          onChange={this.handleChange}
        />
      </Suspense>
    )
  }
}

export default CodeEditor
