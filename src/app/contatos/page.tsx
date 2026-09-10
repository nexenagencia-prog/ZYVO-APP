'use client';

import { useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import styles from './contatos.module.css';

type Contact = {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status?: 'online' | 'offline';
};

const CONTACTS: Contact[] = [
  { id: 1, name: 'Marina Costa', role: 'Estratégia', email: 'marina@zyvo.app', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=88', status: 'online' },
  { id: 2, name: 'Lucas Almeida', role: 'Produto', email: 'lucas@zyvo.app', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=88', status: 'offline' },
  { id: 3, name: 'Clara Mendes', role: 'Conteúdo', email: 'clara@zyvo.app', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=88', status: 'online' },
  { id: 4, name: 'Rafael Nunes', role: 'Comercial', email: 'rafael@zyvo.app', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=320&q=88', status: 'online' },
  { id: 5, name: 'Ana Ribeiro', role: 'Performance', email: 'ana@zyvo.app', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=320&q=88', status: 'offline' },
  { id: 6, name: 'Pedro Martins', role: 'Operações', email: 'pedro@zyvo.app', avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=320&q=88', status: 'online' },
];

function Icon({ name }: { name: 'search' | 'plus' | 'video' | 'more' | 'mail' | 'users' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.45, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>;
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
  if (name === 'video') return <svg {...common}><rect x="3" y="6" width="13" height="12" rx="3"/><path d="m16 10 5-3v10l-5-3"/></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>;
  if (name === 'users') return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-4 2.4-6 6-6s6 2 6 6M14 15c3.7 0 6 1.5 6 5"/></svg>;
  return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></svg>;
}

export default function ContatosPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return CONTACTS;
    return CONTACTS.filter((contact) => `${contact.name} ${contact.role} ${contact.email}`.toLowerCase().includes(value));
  }, [query]);

  return (
    <main className={styles.page}>
      <div className={styles.landscape} aria-hidden="true" />
      <div className={styles.lightWash} aria-hidden="true" />
      <Sidebar />
      <Topbar />

      <section className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>SUA REDE</span>
            <h1>Contatos</h1>
            <p>Pessoas que fazem parte das suas reuniões, organizadas de um jeito simples.</p>
          </div>
          <button className={styles.addButton} type="button"><Icon name="plus"/><span>Adicionar contato</span></button>
        </header>

        <div className={styles.glassPanel}>
          <div className={styles.toolbar}>
            <label className={styles.searchField}>
              <Icon name="search" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar pessoa, função ou e-mail" />
            </label>
            <div className={styles.count}><Icon name="users"/><span>{filtered.length} contatos</span></div>
          </div>

          <div className={styles.contactStage}>
            <div className={`${styles.ghostTile} ${styles.ghostA}`} />
            <div className={`${styles.ghostTile} ${styles.ghostB}`} />
            <div className={`${styles.ghostTile} ${styles.ghostC}`} />
            <div className={`${styles.ghostTile} ${styles.ghostD}`} />

            <div className={styles.grid}>
              {filtered.map((contact, index) => (
                <article className={`${styles.card} ${index === 2 ? styles.featured : ''}`} key={contact.id}>
                  <div className={styles.avatarWrap}>
                    <img className={styles.avatar} src={contact.avatar} alt={contact.name} />
                    <span className={`${styles.status} ${contact.status === 'online' ? styles.online : ''}`} />
                  </div>
                  <div className={styles.meta}>
                    <strong>{contact.name}</strong>
                    <span>{contact.role}</span>
                  </div>
                  <button className={styles.moreButton} aria-label={`Mais opções para ${contact.name}`}><Icon name="more"/></button>
                  <div className={styles.actions}>
                    <button type="button" aria-label={`Enviar e-mail para ${contact.name}`}><Icon name="mail"/></button>
                    <button type="button" aria-label={`Iniciar reunião com ${contact.name}`}><Icon name="video"/></button>
                  </div>
                </article>
              ))}

              <button className={styles.inviteCard} type="button">
                <span className={styles.inviteIcon}><Icon name="plus"/></span>
                <span>
                  <strong>Convidar alguém</strong>
                  <small>Adicionar à sua rede</small>
                </span>
              </button>
            </div>

            {filtered.length === 0 && <div className={styles.empty}>Nenhum contato encontrado.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
