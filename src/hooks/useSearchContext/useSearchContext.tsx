import React, { createContext, useState, useContext, ReactNode } from 'react'


interface SearchContextType {
    searchValue: string;
    setSearchValue: (value: string) => void;
}


const SearchContext = createContext<SearchContextType | undefined>(undefined)


export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}