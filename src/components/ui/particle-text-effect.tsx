"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 80
  maxSpeed = 2
  maxForce = 0.15
  particleSize = 2

  move() {
    const distance = Math.sqrt(
      (this.pos.x - this.target.x) ** 2 +
      (this.pos.y - this.target.y) ** 2
    )

    let proximity = 1
    if (distance < this.closeEnoughTarget) {
      proximity = distance / this.closeEnoughTarget
    }

    const desired = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const mag = Math.sqrt(desired.x ** 2 + desired.y ** 2)

    if (mag > 0) {
      desired.x = (desired.x / mag) * this.maxSpeed * proximity
      desired.y = (desired.y / mag) * this.maxSpeed * proximity
    }

    const steer = {
      x: desired.x - this.vel.x,
      y: desired.y - this.vel.y,
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y

    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black"
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }
}

export function ParticleTextEffect({ text = "CYBOTIXX" }: { text?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const pixelStep = 6

  const generateRandomPos = (w: number, h: number) => {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
    }
  }

  const createTextParticles = (canvas: HTMLCanvasElement) => {
    const offCanvas = document.createElement("canvas")
    offCanvas.width = canvas.width
    offCanvas.height = canvas.height

    const offCtx = offCanvas.getContext("2d")!

    offCtx.fillStyle = "black"
    offCtx.font = "bold 140px Arial"
    offCtx.textAlign = "center"
    offCtx.textBaseline = "middle"

    offCtx.fillText(text, canvas.width / 2, canvas.height / 2)

    const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imgData.data

    const particles: Particle[] = []

    for (let i = 0; i < pixels.length; i += pixelStep * 4) {
      if (pixels[i + 3] > 150) {
        const x = (i / 4) % canvas.width
        const y = Math.floor(i / 4 / canvas.width)

        const p = new Particle()

        const rand = generateRandomPos(canvas.width, canvas.height)

        p.pos.x = rand.x
        p.pos.y = rand.y

        p.target.x = x
        p.target.y = y

        particles.push(p)
      }
    }

    particlesRef.current = particles
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current

    particles.forEach((p) => {
      p.move()
      p.draw(ctx)
    })

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 1000
    canvas.height = 300

    createTextParticles(canvas)

    animate()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-5xl mx-auto"
    />
  )
}