import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThemesSection } from './components/ThemesSection';
import { ThemeDetailModal } from './components/ThemeDetailModal';
import { ConsultationForm } from './components/ConsultationForm';
import { YouthTechSection } from './components/YouthTechSection';
import { ProposalsSection } from './components/ProposalsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DashboardSection } from './components/DashboardSection';
import { MethodologySection } from './components/MethodologySection';
import { AboutFounderSection } from './components/AboutFounderSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { FloatingCTA } from './components/FloatingCTA';
import { AdminModal } from './components/AdminModal';
import type { CivicArea } from './types';

export const App: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedThemeForModal, setSelectedThemeForModal] = useState<CivicArea | null>(null);
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

        {/* Seção B: A Cidade pela Perspectiva dos Moradores (Catálogo dos 12 Temas) */}
        <ThemesSection
          onSelectTheme={handleSelectTheme}
          onOpenThemeDetails={(area) => setSelectedThemeForModal(area)}
        />

        {/* Seção C: Consulta Pública / Relate um Problema no seu Bairro */}
        <ConsultationForm
          preselectedTheme={selectedTheme}
          onSubmissionSuccess={handleSubmissionSuccess}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />

        {/* Seção D: Como Funciona o Mandato & Limites Constitucionais */}
        <HowItWorksSection />

        {/* Seção E: Juventude, Tecnologia e Empreendedorismo */}
        <YouthTechSection />

        {/* Seção F: Propostas Técnicas em Desenvolvimento */}
        <ProposalsSection />

        {/* Seção G: Dashboard de Dados, Critérios de Priorização & Repositório de Fontes */}
        <DashboardSection key={submissionCount} />

        {/* Seção H: Transparência e Metodologia Cívica */}
        <MethodologySection />

        {/* Seção I: Apresentação do Responsável / Idealizador */}
        <AboutFounderSection />
      </main>

      {/* Seção J: Rodapé com Banner CTA */}
      <Footer
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Floating CTA Button */}
      <FloatingCTA />

      {/* Modal de Detalhamento do Tema e Status dos Relatos */}
      <ThemeDetailModal
        area={selectedThemeForModal}
        isOpen={!!selectedThemeForModal}
        onClose={() => setSelectedThemeForModal(null)}
        onReportIssue={(themeId) => handleSelectTheme(themeId)}
      />

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
