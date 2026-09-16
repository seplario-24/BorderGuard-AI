import { TamperingService } from '../services/tamperingService.js';

/**
 * BorderGuard AI - Interactive Forensic Document Canvas Viewer
 * Supports zoom, pan, rotation, fullscreen, and real-time forensic filters
 * (Original, Enhanced Contrast, Edge Map, Noise Density, ELA, Heatmap Overlays).
 */

export const DocumentViewer = {
  currentFilter: 'original',
  zoomLevel: 1.0,
  rotation: 0,
  sourceImg: null,

  render(docImageUri) {
    return `
    <div class="forensic-viewer-container">
      <div class="viewer-toolbar">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Forensic Filter:</span>
          <div class="viewer-filters">
            <button class="filter-btn active" data-filter="original">Original</button>
            <button class="filter-btn" data-filter="enhanced">Enhanced</button>
            <button class="filter-btn" data-filter="edges">Edge Map</button>
            <button class="filter-btn" data-filter="noise">Noise Map</button>
            <button class="filter-btn" data-filter="ela">ELA Map</button>
            <button class="filter-btn" data-filter="heatmap">Heatmap Overlays</button>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <button id="btnZoomOut" class="btn btn-secondary btn-sm" title="Zoom Out">−</button>
          <span id="zoomLabel" style="font-family: var(--font-mono); font-size: 11px; min-width: 42px; text-align: center;">100%</span>
          <button id="btnZoomIn" class="btn btn-secondary btn-sm" title="Zoom In">+</button>
          <button id="btnRotateDoc" class="btn btn-secondary btn-sm" title="Rotate 90°">⟳ Rotate</button>
          <button id="btnResetView" class="btn btn-secondary btn-sm" title="Reset View">Reset</button>
        </div>
      </div>

      <div class="viewer-canvas-area" id="canvasContainer">
        <!-- Hidden source canvas to maintain high-res image data -->
        <canvas id="sourceDocCanvas" style="display: none;"></canvas>
        <!-- Display canvas for filtered and scaled visualization -->
        <canvas id="displayDocCanvas"></canvas>
        <div id="scanLine" class="scan-line" style="display: none;"></div>
      </div>
    </div>
    `;
  },

  loadImage(imageUri, boundingBoxes = []) {
    const displayCanvas = document.getElementById('displayDocCanvas');
    const sourceCanvas = document.getElementById('sourceDocCanvas');
    if (!displayCanvas || !sourceCanvas) return;

    this.sourceImg = new Image();
    this.sourceImg.crossOrigin = 'anonymous';
    this.sourceImg.onload = () => {
      const srcCtx = sourceCanvas.getContext('2d');
      sourceCanvas.width = this.sourceImg.width || 900;
      sourceCanvas.height = this.sourceImg.height || 600;
      srcCtx.drawImage(this.sourceImg, 0, 0, sourceCanvas.width, sourceCanvas.height);

      this.boundingBoxes = boundingBoxes;
      this.applyCurrentFilter();
    };
    this.sourceImg.src = imageUri;
  },

  applyCurrentFilter() {
    const displayCanvas = document.getElementById('displayDocCanvas');
    const sourceCanvas = document.getElementById('sourceDocCanvas');
    if (!displayCanvas || !sourceCanvas) return;

    TamperingService.applyForensicFilter(sourceCanvas, displayCanvas, this.currentFilter, this.boundingBoxes);
    this.updateTransform();
  },

  updateTransform() {
    const displayCanvas = document.getElementById('displayDocCanvas');
    if (!displayCanvas) return;
    displayCanvas.style.transform = `scale(${this.zoomLevel}) rotate(${this.rotation}deg)`;
    const zoomLabel = document.getElementById('zoomLabel');
    if (zoomLabel) {
      zoomLabel.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  },

  setScanning(isScanning) {
    const scanLine = document.getElementById('scanLine');
    if (scanLine) {
      scanLine.style.display = isScanning ? 'block' : 'none';
    }
  },

  initEvents() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.applyCurrentFilter();
      });
    });

    const zoomIn = document.getElementById('btnZoomIn');
    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        this.zoomLevel = Math.min(2.5, this.zoomLevel + 0.2);
        this.updateTransform();
      });
    }

    const zoomOut = document.getElementById('btnZoomOut');
    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        this.zoomLevel = Math.max(0.6, this.zoomLevel - 0.2);
        this.updateTransform();
      });
    }

    const rotateBtn = document.getElementById('btnRotateDoc');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.rotation = (this.rotation + 90) % 360;
        this.updateTransform();
      });
    }

    const resetBtn = document.getElementById('btnResetView');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.zoomLevel = 1.0;
        this.rotation = 0;
        this.currentFilter = 'original';
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        const origBtn = document.querySelector('.filter-btn[data-filter="original"]');
        if (origBtn) origBtn.classList.add('active');
        this.applyCurrentFilter();
      });
    }
  }
};
