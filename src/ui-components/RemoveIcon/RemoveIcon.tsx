import React from 'react'
import styled from 'styled-components'

const StyledImg = styled.img`
    opacity: 0.6;
`
export const RemoveIcon = ({ size = 15 }: { size?: number }) => {
    const src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9ImluZm8iLz48ZyBpZD0iaWNvbnMiPjxwYXRoIGQ9Ik0xNC44LDEybDMuNi0zLjZjMC44LTAuOCwwLjgtMiwwLTIuOGMtMC44LTAuOC0yLTAuOC0yLjgsMEwxMiw5LjJMOC40LDUuNmMtMC44LTAuOC0yLTAuOC0yLjgsMCAgIGMtMC44LDAuOC0wLjgsMiwwLDIuOEw5LjIsMTJsLTMuNiwzLjZjLTAuOCwwLjgtMC44LDIsMCwyLjhDNiwxOC44LDYuNSwxOSw3LDE5czEtMC4yLDEuNC0wLjZsMy42LTMuNmwzLjYsMy42ICAgQzE2LDE4LjgsMTYuNSwxOSwxNywxOXMxLTAuMiwxLjQtMC42YzAuOC0wLjgsMC44LTIsMC0yLjhMMTQuOCwxMnoiIGlkPSJleGl0Ii8+PC9nPjwvc3ZnPg=='
    return <StyledImg width={size} height={size} src={src} />
}

