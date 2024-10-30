'use client'
import { useEffect, useState } from "react"

interface ImportNeuronProps {
  neurons: {
    manifest: any
  }[]
}

export function ImportNeuron({ neurons }: ImportNeuronProps) {

  useEffect(() => {
    neurons.forEach((neuron) => {
      import(
        /* webpackIgnore: true */
        `http://api.onyx.local/frontend/${neuron.manifest.slug}/script.js`
      ).then((module) => {
        if (module) {
          console.log(`Loaded ${neuron.manifest.name}`)
        }
      }).catch(err => {
        console.error(`Failed to load ${neuron.manifest.name}:`, err)
      })
    })
  }, [neurons])

  return null
}
