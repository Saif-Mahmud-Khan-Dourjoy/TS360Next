"use client"
import { createContext, useContext } from "react"

const CategoryContext = createContext()

export function CategoryContextProvider({ children, categories }) {
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoryContext)
}
