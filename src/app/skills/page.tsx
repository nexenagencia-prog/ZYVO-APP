'use client';

import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import styles from './skills.module.css';

type IconName = 'chat'|'sun'|'ear'|'target'|'question'|'bars'|'users'|'spark'|'doc'|'check'|'play'|'arrow'|'bulb'|'warn';

function Icon({name,size=22}:{name:IconName;size?:number}){
  const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.55,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,'aria-hidden':true};
  const paths:Record<IconName,React.ReactNode>={
    chat:<><path d="M20 11.5a8 8 0 1 1-3.5-6.6"/><path d="M7 18.2 4 20l.8-3.3"/></>,
    sun:<><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    ear:<><path d="M16.8 14.2c-.8 1.2-1.4 1.3-2.3 1.8-.8.5-1.3 1.3-1.5 2.3-.3 1.5-1.3 2.7-3 2.7-2.1 0-3.4-1.7-3.4-3.7V9.4A5.6 5.6 0 0 1 12.2 4c3.2 0 5.5 2.5 5.5 5.5 0 2-.6 3.4-.9 4.7Z"/><path d="M10 10.2a2.2 2.2 0 0 1 4.4.1c0 1.2-.6 1.9-1.4 2.4"/></>,
    target:<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12 18.5 5.5M17 5h2v2"/></>,
    question:<><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 3.6 2.3c-.8.4-1.3 1-1.3 1.7v.5M12 17h.01"/></>,
    bars:<><path d="M6 20V11M12 20V5M18 20v-8"/></>,
    users:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c3.7 0 6 1.5 6 5"/></>,
    spark:<><path d="M12 2c.7 4.6 2.6 6.5 7 7-4.4.5-6.3 2.4-7 7-.7-4.6-2.6-6.5-7-7 4.4-.5 6.3-2.4 7-7Z"/></>,
    doc:<><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/></>,
    check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/></>,
    play:<><path d="m9 7 8 5-8 5z" fill="currentColor" stroke="none"/></>,
    arrow:<><path d="m9 6 6 6-6 6"/></>,
    bulb:<><path d="M9 18h6M10 21h4"/><path d="M8.5 14.8A6 6 0 1 1 15.5 15c-.9.6-1.5 1.5-1.5 2.5h-4c0-1-.6-1.9-1.5-2.7Z"/></>,
    warn:<><path d="M12 7v6M12 17h.01"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const metrics=[
  {label:'Comunicação',value:88,icon:'chat' as IconName},
  {label:'Clareza',value:91,icon:'sun' as IconName},
  {label:'Escuta',value:84,icon:'ear' as IconName},
  {label:'Objetividade',value:76,icon:'target' as IconName},
  {label:'Perguntas',value:89,icon:'question' as IconName},
  {label:'Argumentação',value:81,icon:'bars' as IconName},
  {label:'Condução',value:85,icon:'users' as IconName},
];

export default function SkillsPage(){
  return <main className={styles.page}>
    <Sidebar />
    <Topbar />
    <section className={styles.canvas}>
      <div className={styles.topGrid}>
        <section className={styles.intro}>
          <span className={styles.eyebrow}>SKILLS</span>
          <h1>Veja aqui o<br/>resultado da<br/>última reunião.</h1>
          <p>Sua performance em detalhes,<br/>com insights da IA.</p>
          <button className={styles.highlightButton}><span><Icon name="play" size={18}/></span>Reproduzir highlights</button>
        </section>

        <article className={styles.visualCard}>
          <div className={styles.visualImage}/>
          <div className={styles.visualOverlay}/>
          <div className={styles.visualCaption}>CONVERSAS<br/>QUE GERAM<br/>EVOLUÇÃO<div/></div>
          <div className={styles.zyvo}>ZYVO</div>
        </article>

        <article className={styles.scoreCard}>
          <button className={styles.more}>•••</button>
          <h2>Seu desempenho</h2>
          <div className={styles.scoreBody}>
            <div className={styles.scoreRing}><div><strong>86</strong><span>/100</span><b>↑ +7%</b><small>em relação à<br/>última reunião</small></div></div>
            <div className={styles.scoreText}><strong>Ótima evolução!</strong><p>Você foi mais objetivo e fez<br/>perguntas mais estratégicas<br/>nesta reunião.</p></div>
          </div>
        </article>
      </div>

      <div className={styles.metrics}>
        {metrics.map(metric=><article key={metric.label} className={styles.metricCard}>
          <div className={styles.metricTop}><span className={styles.metricIcon}><Icon name={metric.icon} size={20}/></span><span>{metric.label}</span></div>
          <strong>{metric.value}%</strong>
          <div className={styles.track}><i style={{width:`${metric.value}%`}}/></div>
        </article>)}
      </div>

      <div className={styles.bottomGrid}>
        <article className={styles.detailCard}>
          <header><span><Icon name="spark" size={23}/></span><h3>Principais insights da IA</h3><button><Icon name="arrow" size={18}/></button></header>
          <div className={styles.insightRow}><span className={`${styles.status} ${styles.green}`}>↑</span><div><strong>Sua clareza aumentou 12%</strong><p>em relação às últimas 5 reuniões.</p></div></div>
          <div className={styles.insightRow}><span className={`${styles.status} ${styles.orange}`}><Icon name="warn" size={19}/></span><div><strong>Você interrompeu 3 vezes</strong><p>Tente dar mais espaço para o outro.</p></div></div>
          <div className={styles.insightRow}><span className={`${styles.status} ${styles.orange}`}><Icon name="bulb" size={19}/></span><div><strong>O cliente demonstrou alto interesse</strong><p>quando você falou sobre a proposta.</p></div></div>
        </article>

        <article className={styles.detailCard}>
          <header><span><Icon name="doc" size={23}/></span><h3>Momentos importantes</h3><button><Icon name="arrow" size={18}/></button></header>
          <div className={styles.momentRow}><button className={styles.play}><Icon name="play" size={15}/></button><time>12:43</time><div><strong>Objeção sobre preço</strong><p>Cliente levantou uma<br/>preocupação importante.</p></div></div>
          <div className={styles.momentRow}><button className={styles.play}><Icon name="play" size={15}/></button><time>18:27</time><div><strong>Oportunidade identificada</strong><p>Interesse em implementar<br/>ainda este ano.</p></div></div>
          <div className={styles.momentRow}><button className={styles.play}><Icon name="play" size={15}/></button><time>31:10</time><div><strong>Decisão</strong><p>Alinhamento para próxima etapa.</p></div></div>
        </article>

        <article className={styles.detailCard}>
          <header><span><Icon name="check" size={23}/></span><h3>Próximas ações</h3><button><Icon name="arrow" size={18}/></button></header>
          <label className={styles.actionRow}><input type="checkbox" defaultChecked/><span/><div><strong>Enviar proposta</strong><p>Sandro · até sexta-feira</p></div></label>
          <label className={styles.actionRow}><input type="checkbox"/><span/><div><strong>Revisar contrato</strong><p>Cliente · 15/09</p></div></label>
          <label className={styles.actionRow}><input type="checkbox"/><span/><div><strong>Agendar nova reunião</strong><p>Sandro · 22/09</p></div></label>
        </article>
      </div>
    </section>
  </main>;
}
