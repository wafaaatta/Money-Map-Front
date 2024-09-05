import React from 'react';
import { ChevronRight, DollarSign, PieChart, Shield, Users, Facebook, Twitter, Instagram } from 'lucide-react';

export default function VueAccueil() {
  return (
    <div className="min-h-screen bg-white">

      {/* Section Héros */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Maîtrisez vos finances <br />
              <span className="text-blue-600">Suivez chaque transaction</span>
            </h1>
            <p className="text-gray-600 mb-8">
              TransactPro offre une plateforme puissante et intuitive pour gérer vos transactions personnelles et professionnelles. Obtenez des insights, restez organisé et prenez des décisions financières éclairées en toute simplicité.
            </p>
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 flex items-center">
              Commencer <ChevronRight className="ml-2" />
            </button>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Gestion financière" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fonctionnalités clés</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <DollarSign className="h-8 w-8 text-blue-600" />,
                title: "Suivi des dépenses",
                description: "Enregistrez et catégorisez facilement toutes vos dépenses pour une meilleure gestion financière."
              },
              {
                icon: <PieChart className="h-8 w-8 text-blue-600" />,
                title: "Rapports visuels",
                description: "Obtenez des rapports visuels perspicaces pour comprendre vos habitudes de dépenses et votre santé financière."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Transactions sécurisées",
                description: "Un chiffrement de niveau bancaire garantit que vos données financières sont toujours protégées."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Accès multi-utilisateurs",
                description: "Collaborez avec votre famille ou les membres de votre équipe pour une gestion financière partagée."
              }
            ].map((fonctionnalite, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="mb-4">{fonctionnalite.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{fonctionnalite.title}</h3>
                <p className="text-gray-600">{fonctionnalite.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Inscrivez-vous",
                description: "Créez votre compte gratuit en quelques minutes et connectez vos comptes bancaires en toute sécurité."
              },
              {
                step: "2",
                title: "Suivez vos transactions",
                description: "Importez et catégorisez automatiquement vos transactions pour un suivi facile."
              },
              {
                step: "3",
                title: "Obtenez des insights",
                description: "Consultez des rapports détaillés et des analyses pour prendre des décisions financières éclairées."
              }
            ].map((etape, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {etape.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{etape.title}</h3>
                <p className="text-gray-600">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignage */}
      <section className="bg-blue-600 py-12 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ce que disent nos utilisateurs</h2>
            <blockquote className="text-xl italic mb-4">
              "TransactPro a complètement transformé ma façon de gérer mes finances. Les insights que j'ai obtenus m'ont aidé à économiser de l'argent et à prendre de meilleures décisions financières."
            </blockquote>
            <p className="font-semibold">- Sarah Johnson, Propriétaire de petite entreprise</p>
          </div>
        </div>
      </section>

    </div>
  );
}