'use client';

import Link from 'next/link';
import { useState } from 'react';

const items = [
  ['⌂','Início','/'],['◫','Criar reunião','/reuniao-instantanea'],['▣','Agenda','/agenda'],['♟','Contatos','/contatos'],['▤','Minhas anotações','/minhas-anotacoes'],['⚙','Configurações','/configuracoes'],['●','Notificações','/notificacoes'],['◇','Skills','/skills']
] as const;

export default function Sidebar(){
  const [open,setOpen]=useState(false);
  return <>
    <button className="sidebar-toggle" type="button" aria-expanded={open} aria-controls="expanded-sidebar" aria-label={open?'Encolher menu lateral':'Expandir menu lateral'} onClick={()=>setOpen(v=>!v)}>
      <span aria-hidden="true">{open?'‹':'☰'}</span>
    </button>
    <aside id="expanded-sidebar" className={`sidebar-panel ${open?'is-open':''}`} aria-hidden={!open}>
      <div className="sidebar-brand">ZYVO</div>
      <nav>
        {items.map(([icon,label,href])=><Link key={href+label} href={href} tabIndex={open?0:-1}><span className="side-symbol">{icon}</span><span>{label}</span></Link>)}
      </nav>
      <button type="button" className="collapse-row" tabIndex={open?0:-1} onClick={()=>setOpen(false)}><span>‹</span><span>Encolher menu</span></button>
    </aside>
  </>;
}
