"use client"

import { useEffect, useRef } from "react"

export function RuggedTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const generateTerrain = (offset: number, amplitude: number, frequency: number, yBase: number) => {
      const points: [number, number][] = []
      const width = canvas.getBoundingClientRect().width
      const segments = 120

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width
        let y = yBase

        // Multiple octaves of noise for rugged look
        y += Math.sin((i / segments) * Math.PI * frequency + offset) * amplitude
        y += Math.sin((i / segments) * Math.PI * frequency * 2.3 + offset * 1.5) * (amplitude * 0.5)
        y += Math.sin((i / segments) * Math.PI * frequency * 4.1 + offset * 0.8) * (amplitude * 0.25)
        y += Math.sin((i / segments) * Math.PI * frequency * 7.7 + offset * 2.1) * (amplitude * 0.1)

        points.push([x, y])
      }

      return points
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const layers = [
        { amplitude: 40, frequency: 2, yBase: rect.height * 0.45, color: "rgba(200, 120, 80, 0.15)", speed: 0.0003 },
        { amplitude: 50, frequency: 2.5, yBase: rect.height * 0.55, color: "rgba(200, 120, 80, 0.25)", speed: 0.0005 },
        { amplitude: 60, frequency: 3, yBase: rect.height * 0.65, color: "rgba(200, 120, 80, 0.4)", speed: 0.0007 },
        { amplitude: 45, frequency: 3.5, yBase: rect.height * 0.78, color: "rgba(200, 120, 80, 0.6)", speed: 0.001 },
        { amplitude: 30, frequency: 4, yBase: rect.height * 0.88, color: "rgba(200, 120, 80, 0.8)", speed: 0.0015 },
      ]

      layers.forEach((layer) => {
        const points = generateTerrain(time * layer.speed, layer.amplitude, layer.frequency, layer.yBase)

        ctx.beginPath()
        ctx.moveTo(0, rect.height)

        points.forEach(([x, y]) => {
          ctx.lineTo(x, y)
        })

        ctx.lineTo(rect.width, rect.height)
        ctx.closePath()

        ctx.fillStyle = layer.color
        ctx.fill()

        // Add subtle stroke to top edge
        ctx.beginPath()
        points.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.strokeStyle = layer.color.replace(/[\d.]+\)$/, "0.3)")
        ctx.lineWidth = 1
        ctx.stroke()
      })

      time++
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
