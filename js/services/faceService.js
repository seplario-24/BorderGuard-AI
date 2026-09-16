/**
 * BorderGuard AI - Biometric Face Verification & Anti-Spoofing Liveness Service
 * Matches document facial portrait against live/captured traveller image with cosine similarity,
 * threshold evaluation, landmark coordinates, and simulated liveness anti-spoofing checks.
 */

export const FaceService = {
  // Default threshold per border control standards (e.g. FMR 1:100000 target)
  DEFAULT_THRESHOLD: 80.0,

  // Evaluate match between document image and live traveller capture
  verifyFaces(scenarioFaceData, threshold = 80.0) {
    const similarity = scenarioFaceData?.similarityScore !== undefined
      ? scenarioFaceData.similarityScore
      : 96.8;

    const isMatch = similarity >= threshold;

    return {
      docFaceDetected: true,
      travellerFaceDetected: true,
      docFaceQuality: scenarioFaceData?.docQuality || 'Optimal (ICAO 9303 Compliant)',
      travellerFaceQuality: scenarioFaceData?.liveQuality || 'Good (Even lighting, frontal pose)',
      similarityScore: similarity,
      threshold,
      isMatch,
      status: isMatch ? 'MATCH' : 'MISMATCH',
      docFaceBox: { x: 0.12, y: 0.28, w: 0.35, h: 0.50 },
      travellerFaceBox: { x: 0.18, y: 0.20, w: 0.64, h: 0.65 },
      landmarks: {
        doc: { leftEye: [0.22, 0.45], rightEye: [0.36, 0.45], nose: [0.29, 0.55], mouth: [0.29, 0.67] },
        traveller: { leftEye: [0.38, 0.42], rightEye: [0.62, 0.42], nose: [0.50, 0.53], mouth: [0.50, 0.68] }
      },
      explanation: isMatch
        ? `Facial biometric similarity is ${similarity}%, exceeding the configured verification threshold of ${threshold}%. High biometric concordance across cranial structure and inter-pupillary distance.`
        : `Facial biometric similarity is only ${similarity}%, which falls critically below the ${threshold}% verification threshold. Distinct structural variations observed in nasal bridge and mandibular jawline.`
    };
  },

  // Simulated Anti-Spoofing & Liveness detection
  checkLiveness(overrideState = null) {
    if (overrideState === 'FAIL') {
      return {
        facePresent: true,
        movementDetected: false,
        presentationAttackDetected: true,
        attackType: 'Digital Screen Replay (Pixel Moire Pattern detected)',
        livenessConfidence: 24,
        status: 'FAIL',
        recommendation: 'Potential presentation attack / spoofing detected. Conduct in-person physical challenge.'
      };
    }

    if (overrideState === 'REVIEW') {
      return {
        facePresent: true,
        movementDetected: true,
        presentationAttackDetected: false,
        attackType: 'Sub-optimal lighting / High glare reflection',
        livenessConfidence: 68,
        status: 'REVIEW',
        recommendation: 'Marginal liveness confidence. Re-capture with uniform illumination.'
      };
    }

    // Default PASS
    return {
      facePresent: true,
      movementDetected: true,
      presentationAttackDetected: false,
      attackType: 'None Detected (Volumetric depth & micro-texture verified)',
      livenessConfidence: 95,
      status: 'PASS',
      recommendation: 'Natural biometric presentation verified.'
    };
  }
};
