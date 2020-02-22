import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataUrl: ''
    }
  }
  componentDidMount() {
    console.log(this.props.metadata)
    const canvas = document.getElementById('ad')
    const ctx = canvas.getContext('2d')
    const imgHash = this.props.metadata.ad.img_hash
    const image = new Image(this.props.metadata.images[imgHash].width, this.props.metadata.images[imgHash].height)
    const logo = new Image(this.props.metadata.ad.logo.coordinates.width, this.props.metadata.ad.logo.coordinates.height)
    
    window.onload = () => {
      ctx.drawImage(image, 0, 0)
      ctx.drawImage(logo, this.props.metadata.ad.logo.coordinates.x, this.props.metadata.ad.logo.coordinates.y)
      
      for (let split of this.props.metadata.ad.copys[0].splits) {
        ctx.font = `${split.size}px ${this.props.metadata.ad.copys[0].font.family}`
        ctx.fillStyle = this.props.metadata.ad.copys[0].text_color
        ctx.fillText(split.content, split.x, split.y)
      }

      canvas.toBlob(blob => {
        this.setState({dataUrl: URL.createObjectURL(blob)})
      })
    }

    image.src = this.props.metadata.images[imgHash].resource
    image.crossOrigin="Anonymous"
    logo.src = this.props.metadata.ad.logo.logo_resource
    logo.crossOrigin="Anonymous"
  }
  render() {
    return (
      <div>
        <canvas id="ad" width={this.props.metadata.ad.dimensions[0]} height={this.props.metadata.ad.dimensions[1]}></canvas>
        <a download={`${this.props.metadata.ad.img_hash}.${this.props.format}`} href={this.state.dataUrl} className="btn">Download</a>
      </div>
    )
  }
}

export default App;
