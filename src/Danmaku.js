/// the danmaku base class
export class Danmaku {

	constructor(type, renderer, content, style = {}) {

		// record type to find danmaku pool
		this.type = type

		// basic
		this.renderer = renderer
		this.content = content

		// style
		this.style = Object.assign({}, this.renderer.style, style)

		// get size
		this.renderer.canvas.font = this.style.fontSize + "px " + this.style.fontFamily
		this.renderer.canvas.textAlign = "left"
		this.renderer.canvas.textBaseline = "top"
		let textMeasure = this.renderer.canvas.measureText(this.content)
		this.height = this.style.fontSize * 1.15 // get an around height
		this.width = textMeasure.width

		// init
		this.age = 0
		this._initLayout()
	}

	/// step into next frame
	step(time) {
		this.age += time
		if (this.age > this.style.time) {
			this.renderer.danmakuPools.get(this.type).delete(this)
		}
	}

	/// render danmaku into renderer
	render() {
		this.renderer.canvas.fillStyle = this.style.color
		this.renderer.canvas.strokeStyle = this.style.strokeColor
		this.renderer.canvas.lineWidth = 2
		this.renderer.canvas.textAlign = "left"
		this.renderer.canvas.textBaseline = "top"
		this.renderer.canvas.font = this.style.fontSize + "px " + this.style.fontFamily
		let position = this._getPosition()
		this.renderer.canvas.strokeText(this.content, position.x, position.y)
		this.renderer.canvas.fillText(this.content, position.x, position.y)
	}

	/// init Layout
	_initLayout() {
		throw new Error("This is an abstract method!")
	}

	/// get paint position used by render method
	/// if render method is not overrided, this should return top-left position {x,y}
	_getPosition() {
		throw new Error("This is an abstract method!")
	}

	/// get limit to other same kind danmaku
	_getLimit(...args) {
		throw new Error("This is an abstract method!")
	}
}