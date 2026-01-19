import React, { useState, useRef } from 'react'
import { Scene } from './components/Scene'
import { Upload, Download, Sparkles, Image as ImageIcon, Palette, Lock, CheckCircle, Clock, Smartphone, Monitor, Shirt } from 'lucide-react'
import { CONFIG } from './config'
import './App.css'

const COLORS = [
  { name: 'Titanium Black', hex: '#1c1c1c' },
  { name: 'Deep Purple', hex: '#4a3b5a' },
  { name: 'Sierra Blue', hex: '#7ea3cc' },
  { name: 'Gold', hex: '#fae7cf' },
  { name: 'Silver', hex: '#e2e4e1' },
  { name: 'Crimson', hex: '#8a1c1c' },
  { name: 'White', hex: '#ffffff' },
]

function App() {
  const [modelType, setModelType] = useState('phone') // 'phone' | 'laptop' | 'tshirt'
  const [color, setColor] = useState(COLORS[0].hex)
  const [image, setImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  
  const fileInputRef = useRef(null)
  const captureRef = useRef(null)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (image) URL.revokeObjectURL(image)
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    link.click()
  }

  const handleDownloadFree = () => {
    if (!captureRef.current) return
    const dataUrl = captureRef.current(1) 
    
    const img = new Image()
    img.src = dataUrl
    img.onload = () => {
       const canvas = document.createElement('canvas')
       canvas.width = img.width
       canvas.height = img.height
       const ctx = canvas.getContext('2d')
       ctx.drawImage(img, 0, 0)
       
       ctx.font = 'bold 30px Arial'
       ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
       ctx.shadowColor = 'rgba(0,0,0,0.8)'
       ctx.shadowBlur = 6
       ctx.textAlign = 'right'
       ctx.fillText('SnapFrame 3D - Free Version', canvas.width - 40, canvas.height - 40)
       
       downloadImage(canvas.toDataURL('image/png'), `snapframe-${modelType}-free.png`)
    }
  }

  const openProModal = () => {
      setShowModal(true)
      setUnlocked(false)
      setUnlocking(false)
      setTimeLeft(0)
  }

  const startUnlockProcess = () => {
    window.open(CONFIG.MONETIZED_LINK, '_blank')
    setUnlocking(true)
    setTimeLeft(CONFIG.WAIT_TIME_SECONDS)
    
    const interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(interval)
                setUnlocking(false)
                setUnlocked(true)
                return 0
            }
            return prev - 1
        })
    }, 1000)
  }

  const handleDownloadPro = () => {
     if (!captureRef.current) return
     const dataUrl = captureRef.current(2) 
     downloadImage(dataUrl, `snapframe-${modelType}-pro.png`)
     setShowModal(false)
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Scene modelType={modelType} image={image} color={color} captureRef={captureRef} />
      
      {/* UI Overlay */}
      <div className="ui-container">
        <div className="title">
          <Sparkles size={20} color="#FFD700" fill="#FFD700" />
          SnapFrame 3D
        </div>

        {/* Model Selector */}
        <div className="control-group">
           <div className="label">1. Choose Model</div>
           <div style={{display: 'flex', gap: '10px'}}>
              <button 
                className={`btn ${modelType === 'phone' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setModelType('phone')}
                title="Phone"
              >
                  <Smartphone size={20}/>
              </button>
              <button 
                className={`btn ${modelType === 'laptop' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setModelType('laptop')}
                title="Laptop"
              >
                  <Monitor size={20}/>
              </button>
              <button 
                className={`btn ${modelType === 'tshirt' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setModelType('tshirt')}
                title="T-Shirt"
              >
                  <Shirt size={20}/>
              </button>
           </div>
        </div>

        {/* Upload Section */}
        <div className="control-group">
          <div className="label">2. Upload Image</div>
          <button className="btn btn-secondary" onClick={triggerUpload}>
            <ImageIcon size={18} />
            {image ? 'Change Image' : 'Select Image'}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden-input" 
            accept="image/*" 
            onChange={handleUpload}
          />
        </div>

        {/* Color Section */}
        <div className="control-group">
          <div className="label">3. Customize Color</div>
          <div className="color-picker">
            {COLORS.map((c) => (
              <div 
                key={c.name}
                className={`color-dot ${color === c.hex ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColor(c.hex)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="control-group">
          <div className="label">4. Export</div>
          <button className="btn btn-primary" onClick={handleDownloadFree}>
            <Download size={18} />
            Download Free
          </button>
          <button className="btn btn-premium" onClick={openProModal}>
            <Sparkles size={18} />
            Download 4K Pro
          </button>
        </div>
        
        <div style={{ fontSize: '0.75rem', color: '#888', textAlign: 'center', marginTop: '10px' }}>
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* PRO MODAL */}
      {showModal && (
        <div className="modal-overlay">
            <div className="modal-content">
                {!unlocked && !unlocking && (
                    <>
                        <div className="modal-title">Unlock 4K Quality</div>
                        <div className="modal-text">
                            Support us by visiting our sponsor to unlock the Ultra-HD watermark-free version.
                        </div>
                        <button className="btn btn-premium" onClick={startUnlockProcess}>
                            <Lock size={18} />
                            Unlock Now (Free)
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            style={{marginTop: '10px', fontSize: '0.8rem'}}
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </>
                )}

                {unlocking && (
                    <>
                        <div className="modal-title">Verifying...</div>
                        <div className="timer-box">
                            <Clock size={24} style={{display:'inline', verticalAlign:'middle', marginRight:'10px'}}/>
                            {timeLeft}s
                        </div>
                        <div className="modal-text">
                            Please wait while we verify the sponsor visit...
                        </div>
                    </>
                )}

                {unlocked && (
                    <>
                        <div className="modal-title" style={{color: '#4CAF50'}}>
                            <CheckCircle size={30} style={{display:'inline', verticalAlign:'middle', marginRight:'10px'}}/>
                            Unlocked!
                        </div>
                        <div className="modal-text">
                            Your 4K render is ready.
                        </div>
                        <button className="btn btn-premium" onClick={handleDownloadPro}>
                            <Download size={18} />
                            Download 4K Image
                        </button>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default App
