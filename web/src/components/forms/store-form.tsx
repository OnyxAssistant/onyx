'use client'

import { useState } from 'react'
import { Button, Input } from "@/components"

export function StoreForm() {
  const [githubUrl, setGithubUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGithubUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="GitHub link of the neuron"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <Button type="submit">Install the neuron</Button>
    </form>
  )
}
