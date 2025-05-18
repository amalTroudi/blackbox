
// Page d'accueil
import NavBar from "@/components/NavBar";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <section className="hero-bg py-20 px-4 flex flex-col items-center justify-center text-white animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">Tests Logiciels & Partitions <span className="block text-2xl mt-2 font-light tracking-tight">avec Belhaj Ouajdi</span></h1>
        <p className="text-lg md:text-2xl font-light mb-6 animate-fade-in">Plongez dans les tests d’équivalence et l’analyse des valeurs limites avec des quiz interactifs !</p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link to="/partitions" className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow hover:scale-105 hover:bg-yellow-200 hover:text-violet-700 transition-all font-bold text-lg">Partitions d'Équivalence</Link>
          <Link to="/bva-3points" className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow hover:scale-105 hover:bg-cyan-200 hover:text-violet-700 transition-all font-bold text-lg">Valeurs Limites (3 Points)</Link>
          <Link to="/bva-2points" className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow hover:scale-105 hover:bg-purple-200 hover:text-violet-700 transition-all font-bold text-lg">Valeurs Limites (2 Points)</Link>
        </div>
      </section>
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="bg-white/95 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto mt-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Bienvenue 👋</h2>
          <p className="mb-2 text-gray-700">Explorez les techniques clés de tests logiciels à travers des quiz :</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><b>Partitions d’Équivalence</b> : Réduire les cas de tests sans perdre en qualité.</li>
            <li><b>Valeurs Limites</b> (2 points, 3 points) : Tester là où les bugs se cachent souvent.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">Suivez les liens ci-dessus pour commencer à vous entraîner.</p>
        </div>
      </main>
      <footer className="text-center py-4 mt-auto bg-white shadow animate-fade-in">
        ©2025 - Belhaj Ouajdi | Tous droits réservés
      </footer>
    </div>
  );
}
