"use client"

import { useEffect, useRef } from "react"

type Dot = {
    x: number
    y: number
    vx: number
    vy: number
}

const DOT_COUNT = 60
const CONNECTION_DISTANCE = 150
const DOT_RADIUS = 1.5

export function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        let dots: Dot[] = []

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const init = () => {
            dots = Array.from({ length: DOT_COUNT }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
            }))
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const dot of dots) {
                dot.x += dot.vx
                dot.y += dot.vy

                if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
                if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

                ctx.beginPath()
                ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(255,255,255,0.4)"
                ctx.fill()
            }

            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x
                    const dy = dots[i].y - dots[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.3
                        ctx.beginPath()
                        ctx.moveTo(dots[i].x, dots[i].y)
                        ctx.lineTo(dots[j].x, dots[j].y)
                        ctx.strokeStyle = `rgba(255,255,255,${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            animationId = requestAnimationFrame(draw)
        }

        const handleResize = () => {
            resize()
            init()
        }

        resize()
        init()
        draw()

        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}