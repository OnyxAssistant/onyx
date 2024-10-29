'use client'
import { useEffect, useState, Suspense } from "react"
import OnyxSDK from "@/sdk"

interface NeuronPageProps {
  neuron: {
    name: string,
    pages: {
      path: string,
      componentName: string
    }[]
  }
  path: string
}

export function NeuronPage({ neuron, path }: NeuronPageProps) {
  const [page, setPage] = useState<{ name: string, path: string, component: () => HTMLElement }>()

  useEffect(() => {
    import(
      /* webpackIgnore: true */
      `http://api.onyx.local/frontend/${neuron.name}/script.js`
    ).then((module) => {
      if (module) {
        setPage(module.pages(OnyxSDK).find((page: { path: string }) => page.path === path))
      }
    }).catch(err => {
      console.error(`Failed to load ${neuron.name}:`, err)
    })
  }, [neuron, path])

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {page && (
          <div ref={(node) => {
            if (node) {
              node.appendChild(page.component())
            }
          }} />
        )}
      </Suspense>
    </div>
  )
}
