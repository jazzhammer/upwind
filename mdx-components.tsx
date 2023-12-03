"use client"
import type { MDXComponents } from 'mdx/types'
import React from 'react'

function H1({children}) {
  return <h1></h1>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    ...components,
  }
}