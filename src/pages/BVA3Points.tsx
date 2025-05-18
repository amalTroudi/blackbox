
import { useState } from "react";
import clsx from "clsx";

const QUESTIONS = [
  {
    question: "Un radar déclenche une amende à plus de 110 km/h. Quelles valeurs limites choisir pour un test BVA à trois points ?",
    answers: [
      { text: "A. 109, 110, 111", correct: true },
      { text: "B. 110, 111, 112", correct: false },
      { text: "C. 108, 110, 112", correct: false },
      { text: "D. 109, 111, 112", correct: false },
    ],
  },
  {
    question: "Quels cas détecteraient l'erreur (total > 50 au lieu de total >= 50) ?",
    answers: [
      { text: "A. 49, 50, 51", correct: true },
      { text: "B. 50, 51, 52", correct: false },
      { text: "C. 48, 50, 52", correct: false },
      { text: "D. Aucun cas", correct: false },
    ],
  },
  {
    question: "Quels cas de test BVA sont adaptés (18-30 ans inclus) ?",
    answers: [
      { text: "A. 17, 18, 30, 31", correct: true },
      { text: "B. 18, 19, 29, 30", correct: false },
      { text: "C. 16, 18, 30, 32", correct: false },
      { text: "D. 17, 19, 29, 31", correct: false },
    ],
  },
  {
    question: "Quelles valeurs limites choisir (arrêt >40°C) ?",
    answers: [
      { text: "A. 39, 40, 41", correct: true },
      { text: "B. 38, 40, 42", correct: false },
      { text: "C. 40, 41, 42", correct: false },
      { text: "D. 39, 41, 42", correct: false },
    ],
  },
  {
    question: "Quels cas de test BVA choisir (8-16 caractères) ?",
    answers: [
      { text: "A. 7, 8, 16, 17", correct: true },
      { text: "B. 8, 9, 15, 16", correct: false },
      { text: "C. 6, 8, 16, 18", correct: false },
      { text: "D. 7, 9, 15, 17", correct: false },
    ],
  },
  {
    question: "Quelles valeurs limites choisir pour appliquer une réduction strictement supérieure à 100 DT ?",
    answers: [
      { text: "A. 99, 100, 101", correct: true },
      { text: "B. 98, 100, 102", correct: false },
      { text: "C. 100, 101, 102", correct: false },
      { text: "D. 99, 101, 102", correct: false },
    ],
  },
  {
    question: "Quelles valeurs limites pour tester un niveau sonore acceptable ≤ 70 dB ?",
    answers: [
      { text: "A. 69, 70, 71", correct: true },
      { text: "B. 68, 70, 72", correct: false },
      { text: "C. 70, 71, 72", correct: false },
      { text: "D. 69, 71, 72", correct: false },
    ],
  },
  {
    question: "Quels cas détecteraient l'erreur (stock < 10 au lieu de stock <= 10) ?",
    answers: [
      { text: "A. 9, 10, 11", correct: true },
      { text: "B. 8, 10, 12", correct: false },
      { text: "C. 10, 11, 12", correct: false },
      { text: "D. Aucun cas", correct: false },
    ],
  },
  {
    question: "Quels cas de test BVA sont corrects pour un colis entre 1 kg et 25 kg inclus ?",
    answers: [
      { text: "A. 0, 1, 25, 26", correct: true },
      { text: "B. 1, 2, 24, 25", correct: false },
      { text: "C. 0, 2, 24, 26", correct: false },
      { text: "D. 1, 13, 25", correct: false },
    ],
  },
  {
    question: "Cas de test pour volume maximal strictement inférieur à 500 litres ?",
    answers: [
      { text: "A. 499, 500, 501", correct: true },
      { text: "B. 498, 500, 502", correct: false },
      { text: "C. 500, 501, 502", correct: false },
      { text: "D. 499, 501, 502", correct: false },
    ],
  },
];

export default function BVA3Points() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">Analyse des Valeurs Limites (BVA)</h1>
          <p className="text-lg md:text-2xl font-light">Identifier précisément les frontières pour optimiser les tests.</p>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white/95 rounded-2xl shadow-md p-6 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Qu’est-ce que l'analyse des valeurs limites à 3 points ?</h2>
          <p className="text-gray-700 leading-relaxed">
            L'<strong>Analyse des Valeurs Limites (BVA - Boundary Value Analysis)</strong> est une technique qui consiste à tester précisément les limites des partitions.
            La méthode à <strong>3 points</strong> teste la valeur limite, et les valeurs immédiatement inférieure et supérieure.
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
            <p className="mb-4">{q.question}</p>
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
