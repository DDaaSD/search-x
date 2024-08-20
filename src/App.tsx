import React from 'react'
import './App.css'
import { SearchPage } from './components/SearchPage/SearchPage'
import { SearchProvider } from './hooks/useSearchContext/useSearchContext'



export const App = () => {
  return (
    <div className="App">
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    </div>
  )
}
