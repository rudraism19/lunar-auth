import React, { useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

interface QrCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      /* verbose= */ false
    );

    const handleError = (errorMessage: string) => {
      // handle scan failure, usually better to ignore and keep scanning.
    };

    scanner.render(onScanSuccess, handleError);

    return () => {
        // It's important to clear the scanner when the component unmounts.
        // This will stop the camera and remove the scanner UI.
        scanner.clear();
    };
  }, [onScanSuccess]);

  return <div id="qr-reader" style={{ width: '100%' }} />;
};

export default QrCodeScanner;
