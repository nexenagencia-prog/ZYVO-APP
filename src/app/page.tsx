'use client';

import Link from 'next/link';
import { FormEvent, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { heroDataUri } from '@/lib/heroData';

function Icon({ children, size = 20 }: { children: ReactNode; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

const quickActions = [
  { label: 'Minhas\nanotações', href: '/minhas-anotacoes', icon: <><path d="M5 4h11a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2V4Z"/><path d="M9 8h5M9 12h5M18 8l2-2"/></> },
  { label: 'Criar slides', href: '/criar-slides', icon: <><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/></> },
  { label: 'Gravações\nrecentes', href: '/gravacoes', icon: <path d="m8 5 11 7-11 7V5Z"/> },
  { label: 'Criar\nreunião', href: '/reuniao-instantanea', icon: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></> },
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (value) router.push(`/reunioes?q=${encodeURIComponent(value)}`);
  };

  return (
    <main className="home-shell">
      <Sidebar />

      <div className="hero-visual" aria-hidden="true">
        <img src={heroDataUri} alt="" draggable={false} />
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <header className="topbar">
        <Link href="/" className="wordmark" aria-label="ZYVO início">ZYVO</Link>

        <form className="search-box" onSubmit={submit}>
          <Icon size={19}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></Icon>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar reuniões, pessoas ou gravações"
            aria-label="Buscar reuniões, pessoas ou gravações"
          />
          <span className="shortcut">⌘ K</span>
        </form>

        <nav className="topnav" aria-label="Navegação principal">
          <Link className="active" href="/">Início</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/planos">Planos e Preços</Link>
        </nav>

        <Link href="/login" className="access-button">
          <span>Acessar</span>
          <Icon size={20}><path d="M5 12h13M14 7l5 5-5 5"/></Icon>
        </Link>
      </header>

      <section className="hero-copy" aria-labelledby="home-title">
        <p className="eyebrow">TECNOLOGIA QUE TRANSFORMA</p>
        <h1 id="home-title">Reuniões com<br/><span>Performance Pro</span></h1>
        <p className="lead">Ferramentas inteligentes para reuniões<br/>mais produtivas, análises precisas e<br/>resultados que fazem a diferença.</p>

        <div className="hero-actions">
          <Link className="primary-action" href="/reuniao-instantanea">
            <Icon size={21}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></Icon>
            <span>Criar reunião</span>
            <span className="plus">+</span>
          </Link>
          <Link className="secondary-action" href="/reunioes">
            <Icon size={22}><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></Icon>
            <span>Entrar</span>
          </Link>
        </div>

        <div className="quick-actions" aria-label="Ações rápidas">
          {quickActions.map((item) => (
            <Link key={item.href} href={item.href} className="quick-action">
              <Icon size={22}>{item.icon}</Icon>
              <span>{item.label.split('\n').map((line, index) => <span key={line}>{index > 0 && <br/>}{line}</span>)}</span>
            </Link>
          ))}
        </div>

        <p className="motto">CONECTE · EVOLUA · REALIZE MAIS</p>
      </section>

      <aside className="right-tagline" aria-label="Inteligência para pessoas reais">
        <span>INTELIGÊNCIA</span>
        <span>PARA PESSOAS</span>
        <span>REAIS</span>
        <i />
      </aside>
    </main>
  );
}
