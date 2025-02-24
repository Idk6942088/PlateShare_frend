import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Admin({admin}) {
  return (
    <div>{admin ? "admin" : <Navigate to="/"/>}</div>
  )
}
