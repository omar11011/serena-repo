const RectangleRound = (ctx, x, y, width, height, radius, color) => {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x, y + radius)
    ctx.lineTo(x, y + height - radius)
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
    ctx.lineTo(x + width - radius, y + height)
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    ctx.lineTo(x + width, y + radius)
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
    ctx.lineTo(x + radius, y)
    ctx.quadraticCurveTo(x, y, x, y + radius)
    ctx.fill()
    ctx.stroke()
}

const Line = (ctx, x1, y1, x2, y2, line = 1, color) => {
    ctx.lineWidth = line
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

const Circle = (ctx, x, y, radius, linecolor, fondo, line = 1) => {
    ctx.lineWidth = line
    ctx.strokeStyle = linecolor
    ctx.fillStyle = fondo
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fill()
}

const Text = (ctx, x, y, size, family, color, position, text) => {
    ctx.font = `${size}px ${family}`//'50px Arial'
    ctx.fillStyle = color
    ctx.textAlign = position
    ctx.fillText(text, x, y)
}

module.exports = { RectangleRound, Line, Circle, Text }