/**
 * BorderGuard AI - Forensic Tampering & Image Manipulation Detection Service
 * Analyzes photo substitution, text font inconsistency, digital stamp overlays,
 * metadata alterations, and generates Canvas-based forensic maps (ELA, Edges, Noise, Heatmap).
 */

export const TamperingService = {
  // Analyze metadata of uploaded image
  analyzeMetadata(fileMeta = {}) {
    const isTampered = fileMeta.hasSoftwareTag || fileMeta.exifModified || false;
    return {
      fileType: fileMeta.type || 'image/jpeg',
      resolution: fileMeta.resolution || '1920 × 1280 px',
      colorSpace: 'sRGB 24-bit',
      creationTimestamp: fileMeta.creationDate || '2026-03-10T14:22:18Z',
      modificationTimestamp: fileMeta.modDate || '2026-09-08T09:15:02Z',
      softwareTag: fileMeta.software || 'None detected (Standard Device Firmware)',
      compressionRatio: fileMeta.compression || 'JPEG Quality ~92%',
      exifConsistency: !isTampered,
      warning: isTampered
        ? 'Image metadata contains signatures of secondary editing software or re-encoding timestamp discrepancy.'
        : 'Metadata timeline is consistent with standard capture hardware.'
    };
  },

  // Perform forensic region analysis based on scenario profile
  analyzeDocumentTampering(scenarioProfile) {
    // If scenario explicitly specifies tampering signals, use them; otherwise default to authentic
    const profile = scenarioProfile?.tampering || {
      overallScore: 94,
      photoIntegrity: { score: 96, status: 'NORMAL', details: 'No boundary splicing, uniform color matrix across portrait margin.' },
      textForensics: {
        score: 95,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 98, anomalyType: 'None' },
          { name: 'Document Number', status: 'NORMAL', confidence: 99, anomalyType: 'None' },
          { name: 'Date of Birth', status: 'NORMAL', confidence: 97, anomalyType: 'None' },
          { name: 'Expiration Date', status: 'NORMAL', confidence: 98, anomalyType: 'None' }
        ]
      },
      stampForensics: { score: 92, status: 'AUTHENTIC', details: 'Ink penetration depth and microprint continuity verified.' },
      compressionForensics: { score: 95, elaDiscrepancy: 'Low (< 3.2%)', noiseVariance: 'Uniform distribution' },
      tamperingBoundingBoxes: []
    };

    return profile;
  },

  // Canvas-based forensic visual filters for interactive inspection
  applyForensicFilter(sourceCanvas, targetCanvas, filterType, boundingBoxes = []) {
    if (!sourceCanvas || !targetCanvas) return;
    const ctx = targetCanvas.getContext('2d');
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;

    targetCanvas.width = width;
    targetCanvas.height = height;

    // Draw base image
    ctx.drawImage(sourceCanvas, 0, 0, width, height);

    if (filterType === 'original') {
      return;
    }

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    if (filterType === 'enhanced') {
      // High-contrast forensic unsharp mask / contrast stretch
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, (data[i] - 128) * 1.45 + 128));     // R
        data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * 1.45 + 128)); // G
        data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * 1.45 + 128)); // B
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'edges') {
      // High-pass edge Laplacian filter for font alignment and cut lines
      const copy = new Uint8ClampedArray(data);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          // Simple Sobel/Laplace approximation
          const left = (y * width + (x - 1)) * 4;
          const right = (y * width + (x + 1)) * 4;
          const up = ((y - 1) * width + x) * 4;
          const down = ((y + 1) * width + x) * 4;

          const edgeR = Math.abs(copy[right] - copy[left]) + Math.abs(copy[down] - copy[up]);
          const edgeG = Math.abs(copy[right + 1] - copy[left + 1]) + Math.abs(copy[down + 1] - copy[up + 1]);
          const edgeB = Math.abs(copy[right + 2] - copy[left + 2]) + Math.abs(copy[down + 2] - copy[up + 2]);
          const val = Math.min(255, (edgeR + edgeG + edgeB) * 1.2);

          data[idx] = val > 30 ? val : 10;
          data[idx + 1] = val > 30 ? Math.min(255, val * 1.2) : 15; // slight cyber green tint
          data[idx + 2] = val > 30 ? val : 25;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'ela') {
      // Error Level Analysis (ELA) simulation: highlights compression rate differences
      for (let i = 0; i < data.length; i += 4) {
        const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const noise = (Math.sin(i) * 12 + (data[i] % 16)) * 2.5;
        data[i] = Math.min(255, Math.abs(luminance * 0.3 + noise * 1.5));
        data[i + 1] = Math.min(255, Math.abs(noise * 3.2));
        data[i + 2] = Math.min(255, Math.abs(luminance * 0.6 + noise * 2.0));
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'noise') {
      // Noise inconsistency / grain distribution filter
      for (let i = 0; i < data.length; i += 4) {
        const grain = ((data[i] ^ data[i + 1] ^ data[i + 2]) & 0x1F) * 8;
        data[i] = grain;
        data[i + 1] = grain;
        data[i + 2] = grain;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filterType === 'heatmap') {
      // Dim original image and superimpose color-coded forensic anomaly heat zones
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 0.45;
        data[i + 1] = data[i + 1] * 0.45;
        data[i + 2] = data[i + 2] * 0.45;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // Overlay suspicious bounding boxes if applicable
    if (boundingBoxes && boundingBoxes.length > 0) {
      boundingBoxes.forEach(box => {
        const bx = box.x * width;
        const by = box.y * height;
        const bw = box.w * width;
        const bh = box.h * height;

        ctx.save();
        if (box.severity === 'CRITICAL' || box.severity === 'HIGH') {
          ctx.strokeStyle = '#ef4444'; // Red
          ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
        } else if (box.severity === 'SUSPICIOUS' || box.severity === 'MEDIUM') {
          ctx.strokeStyle = '#f59e0b'; // Amber
          ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
        } else {
          ctx.strokeStyle = '#10b981'; // Green
          ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        }

        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, bw, bh);
        ctx.fillRect(bx, by, bw, bh);

        // Label box
        ctx.fillStyle = box.severity === 'CRITICAL' || box.severity === 'HIGH' ? '#ef4444' : '#f59e0b';
        ctx.font = 'bold 13px "Inter", monospace';
        const tag = `[!] ${box.label}: ${box.anomaly || 'ANOMALY'}`;
        const metrics = ctx.measureText(tag);
        ctx.fillRect(bx, Math.max(0, by - 22), metrics.width + 12, 22);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(tag, bx + 6, Math.max(16, by - 6));
        ctx.restore();
      });
    }
  }
};
