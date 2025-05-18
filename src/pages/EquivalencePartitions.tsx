
import { useState } from "react";
import clsx from "clsx";

type Q = {
  question: string;
  answers: { text: string; correct: boolean }[];
};

const QUESTIONS: Q[] = [
  {
    question: "Un système électoral accepte uniquement les personnes âgées entre 18 et 100 ans inclus. Quelle valeur représente une partition invalide ?",
    answers: [
      { text: "17 ans", correct: true },
      { text: "18 ans", correct: false },
      { text: "50 ans", correct: false },
      { text: "30 ans", correct: false },
    ],
  },
  {
    question: "Un mot de passe doit contenir entre 6 et 12 caractères. Quelle option représente une partition valide ?",
    answers: [
      { text: "abc (3 caractères)", correct: false },
      { text: "abcdef (6 caractères)", correct: true },
      { text: "abcdefghijklm (13 caractères)", correct: false },
      { text: "abcd (4 caractères)", correct: false },
    ],
  },
  {
    question: "Une boutique accepte entre 1 et 20 articles par commande. Quel cas représente une partition invalide ?",
    answers: [
      { text: "0 article", correct: true },
      { text: "10 articles", correct: false },
      { text: "15 articles", correct: false },
      { text: "1 article", correct: false },
    ],
  },
  {
    question: "Vous testez un système de réservation d'hôtel acceptant des séjours allant de 1 à 14 nuits inclus, avec deux types de chambres disponibles : Simple (1 pers.) et Double (2 pers. max). Combien de cas de test minimaux faut-il prévoir avec la couverture « Each Choice » ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Inscription à un atelier : En ligne ou Présentiel. Les internationaux doivent choisir En ligne. Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Commande de produits frais : Les produits frais nécessitent une livraison express, les autres en express ou standard. Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Système de notation des examens, réussite si note entre 10 et 20 inclus. Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },
  {
    question: "Une appli cinéma propose des billets standards et réduits (réduits : -13 ans ou +64 ans). Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Paiement en ligne : Carte ou virement (virement à partir de 50 €). Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Formulaire newsletter : âge entre 16 et 90 inclus + CGU obligatoires. Combien de cas de test minimaux faut-il prévoir ?",
    answers: [
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
    ],
  },
];

export default function EquivalencePartitions() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">Partitions d'Équivalence</h1>
          <p className="text-lg md:text-2xl font-light">Découpez intelligemment vos tests grâce aux partitions d'équivalence.</p>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="bg-white/95 rounded-2xl shadow-md p-6 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Qu’est-ce que les partitions d'équivalence ?</h2>
          <p className="text-gray-700 leading-relaxed">
          Les <strong>Partitions d'Équivalence</strong> permettent de diviser les données d'entrée en partitions distinctes,
            chaque partition étant testée par une valeur représentative pour réduire le nombre total de tests nécessaires tout en garantissant une bonne couverture.
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
              className="bg-gray-700 text-white px-8 py-3 rounded shadow hover:scale-105 hover:bg-violet-700 transition-all duration-200 text-lg"
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
