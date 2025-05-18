
import { useState } from "react";
import clsx from "clsx";

const QUESTIONS = [
  {
    question: `Vous testez un régulateur de vitesse automatique d'une voiture :
• En dessous de 30 km/h, le régulateur ne peut pas être activé.
• Entre 30 km/h et 120 km/h inclus, il fonctionne normalement.
• Au-dessus de 120 km/h, alerte vitesse excessive.
Quelle liste minimale de valeurs pour obtenir une couverture de 100% (2 points BVA)?`,
    answers: [
      { text: "30, 120", correct: false },
      { text: "29, 30, 120, 121", correct: true },
      { text: "25, 60, 125", correct: false },
      { text: "29, 31, 119, 121", correct: false },
    ],
  },
  {
    question: `Application bancaire, transferts de 50 € à 1000 € inclus.
Quel ensemble de valeurs pour couverture optimale à deux valeurs (2VBVA) ?`,
    answers: [
      { text: "49, 50, 1000, 1001", correct: true },
      { text: "50, 500, 1000", correct: false },
      { text: "48, 51, 999, 1002", correct: false },
      { text: "0, 49, 50, 1000", correct: false },
    ],
  },
  {
    question: "Inscription à une activité (âge entre 18 et 65 inclus). Quelle combinaison de valeurs pour couvrir les limites (2VBVA) ?",
    answers: [
      { text: "18, 65", correct: false },
      { text: "17, 18, 65, 66", correct: true },
      { text: "16, 19, 64, 67", correct: false },
      { text: "15, 18, 65, 70", correct: false },
    ],
  },
  {
    question: `Gestion de stock : alerte sous 5, refus dès 0.
Quelles quantités pour une couverture optimale (2VBVA) ?`,
    answers: [
      { text: "0, 1, 4, 5", correct: true },
      { text: "1, 5", correct: false },
      { text: "0, 5, 6", correct: false },
      { text: "2, 4, 5", correct: false },
    ],
  },
  {
    question: "Mot de passe entre 8 et 16 caractères inclus. Quels longueurs pour une couverture complète des limites (2VBVA) ?",
    answers: [
      { text: "7, 8, 16, 17", correct: true },
      { text: "8, 16", correct: false },
      { text: "6, 9, 15, 18", correct: false },
      { text: "1, 8, 16, 20", correct: false },
    ],
  },
  {
    question: "Réservations évènement : 10 à 200 inclus. Quelles valeurs pour une couverture optimale (2VBVA) ?",
    answers: [
      { text: "9, 10, 200, 201", correct: true },
      { text: "10, 100, 200", correct: false },
      { text: "8, 11, 199, 202", correct: false },
      { text: "5, 10, 200, 205", correct: false },
    ],
  },
  {
    question: "Aquarium automatique 24°C à 28°C inclus. Quelles valeurs pour une couverture optimale (2VBVA) ?",
    answers: [
      { text: "24, 28", correct: false },
      { text: "23, 24, 28, 29", correct: true },
      { text: "22, 25, 27, 30", correct: false },
      { text: "20, 24, 28, 32", correct: false },
    ],
  },
  {
    question: "Recharge carte prépayée : 5€ à 100€ inclus. Quelles valeurs pour une couverture optimale (2VBVA) ?",
    answers: [
      { text: "4, 5, 100, 101", correct: true },
      { text: "5, 50, 100", correct: false },
      { text: "3, 6, 99, 102", correct: false },
      { text: "1, 5, 100, 105", correct: false },
    ],
  },
  {
    question: "Appel téléphonique : durée entre 1 et 120 minutes inclus. Quelles valeurs pour couvrir les limites (2VBVA) ?",
    answers: [
      { text: "0, 1, 120, 121", correct: true },
      { text: "1, 60, 120", correct: false },
      { text: "0, 2, 119, 122", correct: false },
      { text: "1, 5, 115, 120", correct: false },
    ],
  },
  {
    question: "Drone : altitude autorisée de 50 à 500 mètres inclus. Quel ensemble d’altitudes tester (2VBVA) ?",
    answers: [
      { text: "49, 50, 500, 501", correct: true },
      { text: "50, 250, 500", correct: false },
      { text: "48, 51, 499, 502", correct: false },
      { text: "45, 50, 500, 505", correct: false },
    ],
  },
];

export default function BVA2Points() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(0);

  const handleSelect = (qi: number, ai: number) => {
    if (submitted) return;
    setSelected((prev) => prev.map((v, i) => (i === qi ? ai : v)));
  };

  const handleValidate = () => {
    let correct = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
      const s = selected[i];
      if (s !== null && QUESTIONS[i].answers[s].correct) correct++;
    }
    setResult(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setResult(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in">
      <section className="hero-bg py-16 px-4 flex items-center justify-center">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">Analyse des Valeurs Limites (2 Points)</h1>
          <p className="text-lg md:text-2xl font-light">Optimisez vos cas de test en ciblant précisément les limites.</p>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white/95 rounded-2xl shadow-md p-6 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Qu’est-ce que l'analyse des valeurs limites à 2 points ?</h2>
          <p className="text-gray-700 leading-relaxed">
            L'<strong>Analyse des Valeurs Limites (BVA)</strong> à 2 points consiste à tester uniquement les valeurs directement sur les limites définissant les partitions, optimisant ainsi la couverture avec le minimum de tests.
          </p>
        </section>
        {QUESTIONS.map((q, qi) => (
          <section
            key={qi}
            className={clsx(
              "bg-white rounded-2xl shadow-md p-6 mb-8 animate-fade-in",
              submitted && selected[qi] !== null
                ? (q.answers[selected[qi]!].correct
                  ? "border-2 border-green-400"
                  : "border-2 border-red-300")
                : ""
            )}
            style={{ animationDelay: `${qi * 0.07}s` }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-3">Exercice {qi + 1}</h2>
            <p className="mb-4 whitespace-pre-line">{q.question}</p>
            <ul className="text-gray-700 space-y-2">
              {q.answers.map((a, ai) => (
                <li key={ai} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q${qi}`}
                    checked={selected[qi] === ai}
                    disabled={submitted}
                    onChange={() => handleSelect(qi, ai)}
                    className="accent-cyan-500 focus:ring-violet-500"
                  />
                  <span
                    className={clsx(
                      submitted && selected[qi] === ai
                        ? (a.correct
                          ? "text-green-600 font-semibold"
                          : "text-red-500")
                        : ""
                    )}
                  >
                    {a.text}
                  </span>
                  {submitted && selected[qi] === ai && (
                    a.correct ? <span className="ml-1 text-green-400">✔</span> : <span className="ml-1 text-red-400">✘</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-col items-center gap-4 mt-8">
          {!submitted ? (
            <button
              onClick={handleValidate}
              className="bg-gray-700 text-white px-8 py-3 rounded shadow hover:scale-105 hover:bg-cyan-700 transition-all duration-200 text-lg"
            >
              Valider
            </button>
          ) : (
            <>
              <div className={clsx(
                "text-2xl font-bold animate-fade-in",
                result === QUESTIONS.length
                  ? "text-green-500"
                  : result > QUESTIONS.length / 2
                    ? "text-yellow-600"
                    : "text-red-500"
              )}>
                Score : {result}/{QUESTIONS.length}
              </div>
              <button
                onClick={handleReset}
                className="mt-2 bg-cyan-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-400 hover:text-violet-800 transition"
              >
                Réessayer
              </button>
            </>
          )}
        </div>
      </main>
      <footer className="text-center py-4 mt-auto bg-white shadow">
        ©2025 - Belhaj Ouajdi | Tous droits réservés
      </footer>
    </div>
  );
}
