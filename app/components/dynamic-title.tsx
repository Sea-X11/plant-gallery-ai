"use client"

import { useEffect } from "react"

export function DynamicTitle() {
  useEffect(() => {
    document.title = "Plant Gallery"
  }, [])

  return null
}

