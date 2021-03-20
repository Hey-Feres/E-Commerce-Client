// Quando formos alterar uma categoria, a mesma será salva no redux para que o componente de edição da categoria possa ter acesso aos dados sem a necessidade de fazer um fetch na api.

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Category from '../../../../dtos/Category'

const categorySlice = createSlice({
  name: 'category',
  initialState: null,
  reducers: {
    setCategoryToEdit(state: Category, action: PayloadAction<Category>) {
      return state = action.payload
    },
    clearCategoryToEdit(state: Category) {
      return state = null
    },
  }
})

export const { setCategoryToEdit, clearCategoryToEdit } = categorySlice.actions
export default categorySlice.reducer