import React from "react";
import Image from "next/image";

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  expoUrl: string;
  appName: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCodeUrl,
  expoUrl,
  appName,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(expoUrl);
      // You could add a toast notification here
      console.log("Expo URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const isExpoUrl = expoUrl.startsWith("exp://");

  return (
    <div className="text-center">
      {/* QR Code */}
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg inline-block mb-3 shadow-lg">
          <Image
            src={qrCodeUrl}
            alt={`QR Code for ${appName}`}
            className="w-48 h-48"
            width={192}
            height={192}
          />
        </div>
        <p className="text-sm text-gray-400 mb-2">📱 Scan with Expo Go app</p>
      </div>

      {/* Expo URL */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">
          {isExpoUrl ? "Expo URL (copy to Expo Go):" : "App URL:"}
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <a
            href={expoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-mono break-all max-w-xs"
          >
            {expoUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors"
            title="Copy URL"
          >
            📋
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg text-left max-w-md mx-auto">
        <h4 className="font-semibold text-white mb-2">How to use:</h4>
        {isExpoUrl ? (
          <ol className="text-sm text-gray-300 space-y-1">
            <li>
              1. Download <strong>Expo Go</strong> from your app store
            </li>
            <li>
              2. Open Expo Go and tap{" "}
              <strong>&ldquo;Enter URL manually&rdquo;</strong>
            </li>
            <li>3. Paste the Expo URL above</li>
            <li>4. Your app will load automatically!</li>
          </ol>
        ) : (
          <ol className="text-sm text-gray-300 space-y-1">
            <li>
              1. Download <strong>Expo Go</strong> from your app store
            </li>
            <li>
              2. Open Expo Go and tap{" "}
              <strong>&ldquo;Scan QR Code&rdquo;</strong>
            </li>
            <li>3. Point your camera at the QR code above</li>
            <li>4. Your app will load automatically!</li>
            <li className="mt-2 text-yellow-300">
              💡 If QR code doesn&apos;t work, copy the URL above and paste it
              manually in Expo Go
            </li>
          </ol>
        )}
      </div>

      {/* Additional Help */}
      {!isExpoUrl && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
          <p className="text-sm text-yellow-300">
            <strong>Note:</strong> This URL opens in your browser. To run the
            app on your phone, use the QR code above with Expo Go, or copy the
            URL and paste it manually in Expo Go.
          </p>
        </div>
      )}

      {/* Expo Tunnel Information */}
      {(expoUrl.includes("tunnel.expo.dev") ||
        expoUrl.includes("bacon.exp.direct")) && (
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Expo Tunnel Active:</strong> This app is accessible online
            via Expo&apos;s tunnel service. The QR code should work with Expo Go
            to load your app on any device with internet access.
          </p>
        </div>
      )}

      {/* Daytona Preview Information */}
      {expoUrl.includes("daytona.io") && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
          <p className="text-sm text-green-300">
            <strong>Daytona Preview Active:</strong> This app is accessible
            online via Daytona&apos;s preview service. The QR code should work
            with Expo Go to load your app on any device with internet access.
          </p>
        </div>
      )}
    </div>
  );
};
