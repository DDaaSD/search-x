import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useEventListener } from '../../hooks/useEventListener/useEventListener'

interface DropdownProps<T> {
  items: T[];
  renderItem: (item: T, onClick: (item: T) => void) => JSX.Element
  getTitle: (item: T) => string
  onSelect?: (item: T) => void
  onType?: (value: string) => void
}

const DropdownContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const ItemsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
`

export function Dropdown<T>({ items, onSelect, getTitle, renderItem, onType }: DropdownProps<T>) {
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEventListener('mousedown', e => handleClickOutside(e))

  const handleClickOutside = (event: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  //const debouncedOnType = lodash(onType, 250)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    setShowDropdown(true)
    onType?.(val)
  }

  const handleClick = (suggestion: T) => {
    const title = getTitle(suggestion)
    setInputValue(title)
    setShowDropdown(false)
    onSelect?.(suggestion)
  }

  return (
    <DropdownContainer ref={dropdownRef}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown &&
        <ItemsList>
          {items
            .map(item => renderItem(item, handleClick))
          }
        </ItemsList>
      }
    </DropdownContainer>
  )
}

