import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Upload({partner}) {
  return (
    <div>{partner ? "Upload" : <Navigate to="/"/>}</div>
  )
}
