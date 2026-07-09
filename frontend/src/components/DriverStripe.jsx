import React from 'react'

export default function DriverStripe({ color }) {
  return (
    <div
      className="shrink-0 w-0.75 h-7 rounded-full bg-(--stripe-color)"
      style={{ '--stripe-color': color }}
    />
  )
}
