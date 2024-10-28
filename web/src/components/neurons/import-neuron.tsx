'use client'
import { useEffect, useState } from "react"

interface ImportNeuronProps {
  neurons: {
    name: string
  }[]
}

export function ImportNeuron({ neurons }: ImportNeuronProps) {

  useEffect(() => {
    neurons.forEach((neuron) => {
      import(
        /* webpackIgnore: true */
        `http://api.onyx.local/frontend/${neuron.name}/script.js`
      ).then((module) => {
        if (module) {
          console.log(`Loaded ${neuron.name}`)
        }
      }).catch(err => {
        console.error(`Failed to load ${neuron.name}:`, err)
      })
    })
  }, [neurons])

  return null
}
