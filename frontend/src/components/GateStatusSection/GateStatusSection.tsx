// GateStatusSection.tsx
import React from 'react'
import {
  Card, CardContent, CardHeader, CardTitle
} from '../ui/'
import { ShieldAlert, ShieldCheck, Info, Calendar } from 'lucide-react'
import './GateStatusSection.css'

type Gate = {
  id: number
  name: string
  status: 'open' | 'closed'
  waterLevel: number
  location: string
  lastUpdated: string
  irrigationSchedule: string
}

type GateStatusSectionProps = {
  gates: Gate[]
  getWaterLevelStatus: (level: number) => string
  formatDate: (dateString: string) => string
}

const GateStatusSection: React.FC<GateStatusSectionProps> = ({ gates, getWaterLevelStatus, formatDate }) => {
  return (
    <section className="gate-section">
      <div className="gate-grid">
        {gates.map(gate => (
          <Card key={gate.id}>
            <CardHeader>
              <CardTitle className="gate-title">
                <span>{gate.name}</span>
                <span
                  className={`gate-status-badge ${
                    gate.status === 'open' ? 'open' : 'closed'
                  }`}
                >
                  {gate.status === 'open' ? (
                    <>
                      <ShieldCheck className="open-icon-small" />
                      Open
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="open-icon-small" />
                      Closed
                    </>
                  )}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gate-info">
                <div>
                  <p className="waterlabel">Water Level</p>
                  <p
                    className={`water-level ${
                      getWaterLevelStatus(gate.waterLevel).includes('Critical')
                        ? 'critical'
                        : getWaterLevelStatus(gate.waterLevel).includes('High')
                        ? 'high'
                        : getWaterLevelStatus(gate.waterLevel).includes('Low')
                        ? 'low'
                        : 'normal'
                    }`}
                  >
                    {Math.round(gate.waterLevel)}% - {getWaterLevelStatus(gate.waterLevel)}
                  </p>
                </div>
                <div className='update-time'>
                <div className="flex-row">
                  <Calendar className="icon-small gray-icon" />
                  <div>
                    <p className="label">Irrigation Schedule</p>
                    <p className="value">{gate.irrigationSchedule}</p>
                  </div>
                </div>

                <div className="flex-row">
                  <Info className="icon-small gray-icon" />
                  <div>
                    <p className="label">Last Updated</p>
                    <p className="value">{formatDate(gate.lastUpdated)}</p>
                  </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default GateStatusSection
