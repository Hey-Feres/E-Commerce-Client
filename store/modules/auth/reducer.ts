/*

  * Reducer *

  - Description: Vamos impotar o createSlice do redux-toolkit para criarmos o reducer e as actions de forma unificada. Basicamente o createSlice irá criar o reducer e as actions em apenas uma função, assim dispensando a necessidade de criarmos um arquivo de contants, um de action e um para o reducer.

  Utilizaremos o PayloadAction <User> para tiparmos o action da função setLoggedUser e a interface User para tiparmos o estado do redux.

  As ultimas duas linhas são necessárias para realizarmos a exportação das actions e do reducer que foram criados pela função createSlice.

*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import User from '../../../dtos/User'

const authSlice = createSlice({
  name: 'auth',
  initialState: { loggedUser: null as User },
  reducers: {
    setLoggedUser(state, action: PayloadAction<User>) {
      state.loggedUser = action.payload
    },
    clearLoggedUser(state) {
      state.loggedUser = null
    },
  }
})

export const { setLoggedUser, clearLoggedUser } = authSlice.actions

export default authSlice.reducer