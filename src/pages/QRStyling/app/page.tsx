import { QRCodeBuilder } from "../components/qr-code-builder";
const QRStyling = () => {
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <QRCodeBuilder />
      </div>
    </main>
  )
}

export default QRStyling;