/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import { takeLatest } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'

import { LOGIN, GET_LOGIN_USER } from './constants'
import { logged } from './actions'

import request from '../../../app/utils/request'
import { errorHandler } from '../../../app/utils/util'
import api from '../../../app/utils/api'

export function* login (action) {
  const { username, password, shareInfo, resolve } = action.payload
  try {
    const userInfo = yield call(request, {
      method: 'post',
      url: `${api.share}/login/${shareInfo}`,
      data: {
        username,
        password
      }
    })
    yield put(logged(userInfo.payload))
    resolve()
  } catch (err) {
    errorHandler(err)
  }
}

export default function* rootAppSaga (): IterableIterator<any> {
  yield [
    takeLatest(LOGIN, login)
  ]
}
