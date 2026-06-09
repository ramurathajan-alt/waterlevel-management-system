// Header.tsx
import React from 'react'
import { Button } from '../ui'
import { RefreshCw } from 'lucide-react'
import tankImage2 from '../../frontend/src/assets/tank2.jpg'
import './Header.css'

type HeaderProps = {
  isLoading: boolean
  onRefresh: () => void
}

const Header: React.FC<HeaderProps> = ({ isLoading, onRefresh }) => {
  return (
    <header className="header-container">
      <div>
        <h1 className="header-title">Public Water Information</h1>
        <p>Current Water Management Status</p>
      </div>
      <Button
        onClick={onRefresh}
        disabled={isLoading}
        className="refresh-button"
      >
        <RefreshCw className={`icon ${isLoading ? 'spin' : ''}`} />
        Refresh
      </Button>
    </header>
  )
}

export default Header
