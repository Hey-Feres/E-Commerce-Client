// Estamos criando um reducer e duas actions para que possamos armazenar a pesquisa desejada pelo usuário no redux, dessa forma podemos observar esse estado e quando o mesmo for alterado, forçar o SWR a revalidar os dados, assim realizando a pesquisa na api utilizando o dado digitado pelo usuário como critério.

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch(state: string, action: PayloadAction<string>) {
      return state = action.payload
    },
    clearSearch(state: string) {
      return state = ''
    }
  }
})

export const { setSearch, clearSearch } = searchSlice.actions
export default searchSlice.reducer