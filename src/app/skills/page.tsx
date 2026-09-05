'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import heroRef from '@/lib/skills-ref-hero';
import performanceRef from '@/lib/skills-ref-performance';
import insightsRef from '@/lib/skills-ref-insights';
import meetingRef from '@/lib/skills-ref-meeting';
import analysisRef from '@/lib/skills-ref-analysis';
import styles from './skills.module.css';

const metrics = [['Comunicação',88],['Clareza',91],['Escuta',84],['Objetividade',76],['Perguntas',89],['Condução',85]] as const;

function MetricRing({label,target,index}:{label:string;target:number;index:number}){
  const [value,setValue]=useState(0);
  useEffect(()=>{
    let raf=0; const started=performance.now()+index*70; const duration=1350;
    const tick=(now:number)=>{const p=Math.max(0,Math.min(1,(now-started)/duration));setValue(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(tick)};
    raf=requestAnimationFrame(tick); return()=>cancelAnimationFrame(raf);
  },[target,index]);
  return <div className={styles.metric}><div className={styles.metricRing} style={{'--value':`${value*3.6}deg`} as React.CSSProperties}><strong>{value}</strong></div><span>{label}</span></div>;
}

export default function SkillsPage(){
  const [score,setScore]=useState(0);
  useEffect(()=>{let raf=0;const start=performance.now();const tick=(now:number)=>{const p=Math.min(1,(now-start)/1500);setScore(Math.round(82*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);

  return <main className={styles.page}>
    <Sidebar/><Topbar/>
    <section className={styles.board}>
      <article className={`${styles.card} ${styles.heroCard}`} style={{backgroundImage:`linear-gradient(90deg,rgba(5,20,33,.98) 0%,rgba(5,20,33,.78) 42%,rgba(5,20,33,.14) 100%),url(${heroRef})`}}>
        <div className={styles.heroTop}><p>PERFORMANCE HUMANA</p><h1>Skills</h1><h2>Inteligência que transforma<br/>suas reuniões em resultados.</h2></div>
        <div className={styles.heroBottom}><i/><p>INSIGHTS REAIS</p><strong>Mais que reuniões.<br/>Evolução.</strong><button><span>▷</span> Explorar agora</button></div>
      </article>

      <article className={`${styles.card} ${styles.performanceCard}`}>
        <div className={styles.performanceBackdrop} style={{backgroundImage:`url(${performanceRef})`}} aria-hidden="true"/>
        <div className={styles.performanceContent}>
          <header><h3>Seu desempenho</h3><button>Analisar performance <b>›</b></button></header>
          <div className={styles.performanceMain}>
            <div className={styles.scoreRing} style={{'--score':`${score*3.6}deg`} as React.CSSProperties}><div><strong>{score}</strong><span>/100</span></div></div>
            <div className={styles.trend}><div className={styles.delta}>↑ <strong>+6,4%</strong><small>em relação ao período anterior</small></div><svg viewBox="0 0 320 100" preserveAspectRatio="none"><defs><linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9dd5ff" stopOpacity=".28"/><stop offset="1" stopColor="#9dd5ff" stopOpacity="0"/></linearGradient></defs><path className={styles.area} d="M0 78 C34 76 46 46 80 47 S121 82 160 70 S196 30 232 33 S270 48 320 42 L320 100 L0 100Z"/><path className={styles.line} d="M0 78 C34 76 46 46 80 47 S121 82 160 70 S196 30 232 33 S270 48 320 42"/><circle cx="320" cy="42" r="4"/></svg></div>
          </div>
          <div className={styles.metrics}>{metrics.map(([label,value],i)=><MetricRing key={label} label={label} target={value} index={i}/>)}</div>
        </div>
      </article>

      <div className={styles.sideCards}>
        <article className={`${styles.card} ${styles.insightCard}`} style={{backgroundImage:`linear-gradient(90deg,rgba(5,19,31,.98) 0%,rgba(5,19,31,.76) 56%,rgba(5,19,31,.08) 100%),url(${insightsRef})`}}><span className={styles.icon}>▢</span><h3>Insights e Conteúdo</h3><p>Artigos e guias sobre IA,<br/>comunicação e produtividade.</p><button>→</button></article>
        <article className={`${styles.card} ${styles.meetingCard}`} style={{backgroundImage:`linear-gradient(90deg,rgba(5,19,31,.98) 0%,rgba(5,19,31,.72) 55%,rgba(5,19,31,.06) 100%),url(${meetingRef})`}}><span className={styles.icon}>▣</span><h3>Analisar Reuniões</h3><p>Reviva conversas, identifique<br/>pontos-chave e gere insights.</p><button>→</button></article>
      </div>

      <article className={`${styles.card} ${styles.analysisCard}`}>
        <div className={styles.analysisCopy}><div className={styles.cameraIcon}>▣</div><div><h3>Analise suas reuniões</h3><p>Envie sua gravação e receba uma<br/>análise completa com insights<br/>de performance.</p><button><b>↥</b> Selecionar arquivo</button><small>MP4, MOV ou WEBM</small></div></div>
        <div className={styles.analysisMedia} style={{backgroundImage:`url(${analysisRef})`}} aria-hidden="true"/>
        <div className={styles.capture}><p>CAPTURE.<br/>ANALISE.<br/>EVOLUA.</p><i/><span>Do seu smartphone<br/>para insights reais.</span></div>
      </article>
    </section>
  </main>;
}
