import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import GateStatusSection from './components/GateStatusSection/GateStatusSection'
import WaterManagementInfo from './components/WaterManagementInfo/WaterManagementInfo'
import BenefitsSection from './components/BenefitsSection/BenefitsSection'
import MapEmbed from './components/MapEmbed/MapEmbed'
import IranamaduTank from './components/IranamaduTank/IranamaduTank'
import AddNumber from './components/AddNumber/AddNumber'
import './PublicPortal.css'

type Gate = {
  id: number
  name: string
  status: 'open' | 'closed'
  waterLevel: number
  location: string
  lastUpdated: string
  irrigationSchedule: string
}

const CRITICAL_LEVEL = 80
const HIGH_LEVEL = 60
const LOW_LEVEL = 20

const PublicPortal = () => {
  const [gates, setGates] = useState<Gate[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getWaterLevelStatus = (level: number): string => {
    if (level > CRITICAL_LEVEL) return 'Critical (Flood Risk)'
    if (level > HIGH_LEVEL) return 'High'
    if (level < LOW_LEVEL) return 'Low (Drought Risk)'
    return 'Normal'
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/gates')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data: Gate[] = await response.json()
      const mainGate = data.filter(gate => gate.name === 'Main Gate')
      setGates(mainGate)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="full-screen-container">
      <Header isLoading={isLoading} onRefresh={fetchData} />
      <GateStatusSection gates={gates} getWaterLevelStatus={getWaterLevelStatus} formatDate={formatDate} />

      <WaterManagementInfo />
      <BenefitsSection />
      <IranamaduTank />
      <MapEmbed />
      <AddNumber />
    </div>
  )
}

export default PublicPortal
