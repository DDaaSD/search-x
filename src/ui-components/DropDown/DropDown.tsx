import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useEventListener } from '../../hooks/useEventListener/useEventListener'
import { debounce } from 'lodash'
import { SearchIcon } from '../SearchIcon/SearchIcon'

interface DropdownProps<T> {
  items: T[];
  renderItem: (item: T, onClick: (item: T) => void) => JSX.Element
  getTitle: (item: T) => string
  onSelect?: (item: T | string) => void
  onType?: (value: string) => void
  placeholder?: string,
}

const DropdownContainer = styled.div`
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    background-color: #ffffff;
    margin-top: 8px;
    position: relative;
`

const Input = styled.input<{ $showDropdown: boolean }>`
    width: 100%;
    padding: 12px 16px 12px 35px;
    font-size: 16px;
    border: 1px solid #dfe1e5;
    border-radius:  ${({ $showDropdown }) => ($showDropdown ? '24px 24px 0 0' : '24px')};
    box-shadow: none;
    outline: none;
    transition: box-shadow 0.2s ease-in-out;
    &:focus {
        box-shadow: 0px 1px 6px rgba(32, 33, 36, 0.28);
    }
`

const ItemsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0 0 24px 24px;
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledIsonSearch = styled.div`
  position: absolute;
  left: 10px;
  top: 55%;
  transform: translateY(-50%);
`

export function Dropdown<T>({ items, onSelect, getTitle, renderItem, onType, placeholder = 'Search Google' }: DropdownProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isDropdownShown = showDropdown && items.length > 0



  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEventListener('mousedown', e => handleClickOutside(e))
  const debouncedOnType = debounce((val) => onType?.(val.trim()), 500)

  useEffect(() => debouncedOnType(inputValue), [inputValue])

  const handleClickOutside = (event: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    setShowDropdown(true)
  }

  const handleClick = (suggestion: T) => {
    const title = getTitle(suggestion)
    setInputValue(title)
    setShowDropdown(false)
    onSelect?.(suggestion)
  }

  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const selectedString = inputValue.trim()
    if (!selectedString.length || event.key !== 'Enter') {
      return
    }
    setInputValue(inputValue.trim())
    setShowDropdown(false)
    onSelect?.(selectedString)
    // handle search logic here
  }

  const renderSearchIcon = () => {
    return (
      <StyledIsonSearch>
        <SearchIcon />
      </StyledIsonSearch>
    )
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      {renderSearchIcon()}
      <Input
        type="text"
        ref={inputRef}
        value={inputValue}
        placeholder={placeholder}
        $showDropdown={isDropdownShown}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={onPressEnter}
      />
      {isDropdownShown &&
        <ItemsList>
          {items
            .map(item => renderItem(item, handleClick))
          }
        </ItemsList>
      }
    </DropdownContainer>
  )
}

