'use client'
import { useEffect, useState, Suspense } from "react"
import OnyxSDK from "@/sdk"

interface NeuronPageProps {
  neuron: {
    manifest: {
      name: string,
      slug: string,
      pages: {
        path: string,
        name: string
      }[]
    }
  }
  path: string
}

export function NeuronPage({ neuron, path }: NeuronPageProps) {
  const [page, setPage] = useState<{ name: string, path: string, component: () => HTMLElement }>()

  useEffect(() => {
    import(
      /* webpackIgnore: true */
      `http://api.onyx.local/frontend/${neuron.manifest.slug}/script.js`
    ).then((module) => {
      if (module) {
        setPage(module.pages(OnyxSDK).find((page: { path: string }) => page.path === path))
      }
    }).catch(err => {
      console.error(`Failed to load ${neuron.manifest.name}:`, err)
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
