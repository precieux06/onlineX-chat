export default function Debug() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          🎉 TAILWIND TEST 🎉
        </h1>
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl border border-white/30">
          <p className="text-2xl text-white font-semibold">
            Si vous voyez un dégradé rouge/bleu et ce texte blanc, Tailwind FONCTIONNE !
          </p>
          <p className="text-yellow-300 mt-4 text-lg">
            Si c'est noir et blanc, Tailwind ne fonctionne PAS
          </p>
        </div>
      </div>
    </div>
  )
}
