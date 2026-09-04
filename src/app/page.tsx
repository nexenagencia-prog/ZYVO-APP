'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const hotspots = [
  ['brand','/','ZYVO'],['profile','/configuracoes','Perfil'],['nav-home','/','Início'],['nav-skills','/skills','Skills'],['nav-agenda','/agenda','Agenda'],['nav-plans','/planos','Planos e Preços'],['nav-access','/login','Acessar'],
  ['create','/reuniao-instantanea','Criar reunião'],['enter','/reunioes','Entrar'],['quick-notes','/minhas-anotacoes','Minhas anotações'],['quick-slides','/criar-slides','Criar slides'],['quick-recordings','/gravacoes','Gravações recentes'],['quick-create','/reuniao-instantanea','Criar reunião'],
  ['side-home','/','Início'],['side-meeting','/reuniao-instantanea','Criar reunião'],['side-agenda','/agenda','Agenda'],['side-contacts','/contatos','Contatos'],['side-notes','/minhas-anotacoes','Anotações'],['side-settings','/configuracoes','Configurações'],['side-alerts','/notificacoes','Notificações']
] as const;

export default function HomePage() {
  const router = useRouter();
  const [query,setQuery] = useState('');
  const submit = (e:FormEvent) => { e.preventDefault(); const q=query.trim(); if(q) router.push(`/reunioes?q=${encodeURIComponent(q)}`); };

  return <main className="viewport">
    <section className="stage" aria-label="ZYVO — Reuniões com Performance Pro">
      <img className="artwork" src="/zyvo-hero-reference.webp" alt="ZYVO — Reuniões com Performance Pro" draggable={false}/>
      <h1 className="sr-only">Reuniões com Performance Pro</h1>
      <form className="search-layer" onSubmit={submit}>
        <label htmlFor="zyvo-search" className="sr-only">Buscar reuniões, pessoas ou gravações</label>
        <input id="zyvo-search" value={query} onChange={e=>setQuery(e.target.value)} aria-label="Buscar reuniões, pessoas ou gravações" autoComplete="off" />
      </form>
      {hotspots.map(([cls,href,label]) => <Link key={`${cls}-${href}`} href={href} className={`hotspot ${cls}`} aria-label={label} title={label}><span className="sr-only">{label}</span></Link>)}
      <Sidebar />
    </section>
  </main>;
}
