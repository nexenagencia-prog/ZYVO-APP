'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

function RailIcon({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

const items = [
  { label: 'Início', href: '/', icon: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></> },
  { label: 'Criar reunião', href: '/reuniao-instantanea', icon: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></> },
  { label: 'Agenda', href: '/agenda', icon: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2"/></> },
  { label: 'Contatos', href: '/contatos', icon: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c3.7 0 6 1.5 6 5"/></> },
  { label: 'Minhas anotações', href: '/minhas-anotacoes', icon: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/></> },
  { label: 'Configurações', href: '/configuracoes', icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1 1.6V21h-4v-.1a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.6-1H3v-4h.1a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.4-2l-.1-.1L7 4l.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1-1.6V3h4v.1a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1L20 7l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1h.1v4h-.1a1.8 1.8 0 0 0-1.7.9Z"/></> },
  { label: 'Notificações', href: '/notificacoes', icon: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></> },
  { label: 'Skills', href: '/skills', icon: <><path d="M12 3 4 8v8l8 5 8-5V8z"/><path d="m8 10 4 3 4-3"/></> },
] as const;

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <>
    <aside className="rail" aria-label="Navegação lateral">
      <Link href="/configuracoes" className="rail-avatar" aria-label="Perfil">
        <span className="avatar-monogram">SB</span>
        <span className="status-dot" aria-hidden="true" />
      </Link>

      <nav className="rail-nav">
        {items.slice(0, 6).map((item, index) => (
          <Link key={item.href} href={item.href} className={index === 0 ? 'selected' : ''} aria-label={item.label} title={item.label}>
            <RailIcon>{item.icon}</RailIcon>
          </Link>
        ))}
        <Link href="/notificacoes" aria-label="Notificações" title="Notificações">
          <RailIcon>{items[6].icon}</RailIcon>
        </Link>
      </nav>

      <button className="rail-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Recolher menu' : 'Expandir menu'} aria-expanded={open}>
        <span/><span/><span/>
      </button>
    </aside>

    <div className={`sidebar-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
    <aside className={`sidebar-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="sidebar-panel-head">
        <span>ZYVO</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">×</button>
      </div>
      <nav>
        {items.map((item) => (
          <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <span className="panel-icon"><RailIcon>{item.icon}</RailIcon></span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  </>;
}
