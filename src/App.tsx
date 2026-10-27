import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThemesSection } from './components/ThemesSection';
import { ConsultationForm } from './components/ConsultationForm';
import { YouthTechSection } from './components/YouthTechSection';
import { ProposalsSection } from './components/ProposalsSection';
import { DashboardSection } from './components/DashboardSection';
import { MethodologySection } from './components/MethodologySection';
import { AboutFounderSection } from './components/AboutFounderSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { FloatingCTA } from './components/FloatingCTA';

import { AdminModal } from './components/AdminModal';

export const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [submissionCount, setSubmissionCount] = useState<number>(0);

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    const formElement = document.getElementById('consulta');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmissionSuccess = () => {
    setSubmissionCount((prev) => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg)' }}>
      {/* Top Header */}
      <Header onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Seção A: Hero */}
        <Hero />

        {/* Seção B: A Cidade pela Perspectiva dos Moradores */}
        <ThemesSection onSelectTheme={handleSelectTheme} />

        {/* Seção C: Consulta Pública */}
        <ConsultationForm
          preselectedTheme={selectedTheme}
          onSubmissionSuccess={handleSubmissionSuccess}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />

        {/* Seção D: Juventude, Tecnologia e Empreendedorismo */}
        <YouthTechSection />

        {/* Seção E: Propostas em Desenvolvimento */}
        <ProposalsSection />

        {/* Seção 7: Dashboard de Dados / Resultados da Escuta */}
        <DashboardSection key={submissionCount} />

        {/* Seção F: Transparência e Metodologia */}
        <MethodologySection />

        {/* Seção G: Apresentação do Responsável */}
        <AboutFounderSection />
      </main>

      {/* Seção H: Rodapé com Banner CTA */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating CTA Button */}
      <FloatingCTA />

      {/* LGPD Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Admin Triage & Management Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default App;
