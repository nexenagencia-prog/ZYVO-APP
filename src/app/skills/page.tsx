'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import hero0 from '@/lib/hero45-0';
import hero1 from '@/lib/hero45-1';
import hero2 from '@/lib/hero45-2';
import hero3 from '@/lib/hero45-3';
import hero4 from '@/lib/hero45-4';
import hero5 from '@/lib/hero45-5';
import styles from './skills.module.css';

const hero4K = `data:image/avif;base64,${hero0}${hero1}${hero2}${hero3}${hero4}${hero5}`;
const metrics = [
  ['Comunicação',88],['Clareza',91],['Escuta',84],['Objetividade',76],['Perguntas',89],['Argumentação',81],['Condução',85]
] as const;

function MetricRing({label,target,index}:{label:string;target:number;index:number}){
  const [value,setValue]=useState(0);
  useEffect(()=>{
    let current=0;
    const delay=setTimeout(()=>{
      const step=()=>{
        current=Math.min(target,current+1);
        setValue(current);
        if(current<target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },220+index*90);
    return()=>clearTimeout(delay);
  },[target,index]);
  return <article className={styles.metricCard}>
    <span>{label}</span>
    <div className={styles.metricRing} style={{'--value':`${value*3.6}deg`} as React.CSSProperties}><strong>{value}</strong></div>
  </article>;
}

export default function SkillsPage(){
  const [score,setScore]=useState(0);
  const [uploadProgress,setUploadProgress]=useState(0);

  useEffect(()=>{
    let n=0;
    const timer=setInterval(()=>{n+=1;setScore(Math.min(n,82));if(n>=82)clearInterval(timer)},18);
    return()=>clearInterval(timer);
  },[]);

  useEffect(()=>{
    let raf=0;
    const target=48;
    const duration=1900;
    const started=performance.now();
    const animate=(now:number)=>{
      const progress=Math.min(1,(now-started)/duration);
      const eased=1-Math.pow(1-progress,3);
      setUploadProgress(Math.round(target*eased));
      if(progress<1) raf=requestAnimationFrame(animate);
    };
    raf=requestAnimationFrame(animate);
    return()=>cancelAnimationFrame(raf);
  },[]);

  return <main className={styles.page}>
    <Sidebar />
    <Topbar />
    <div className={styles.ambient} aria-hidden="true" />
    <section className={styles.content}>
      <header className={styles.intro}>
        <p>PERFORMANCE HUMANA</p>
        <h1>Skills</h1>
        <h2>Inteligência que transforma<br/>suas reuniões em resultados.</h2>
      </header>

      <div className={styles.dashboardGrid}>
        <section className={styles.mainColumn}>
          <div className={styles.topCards}>
            <article className={`${styles.panel} ${styles.performance}`}>
              <div className={styles.panelHead}><h3>Seu desempenho</h3><button>Últimas 8 reuniões⌄</button></div>
              <div className={styles.performanceBody}>
                <div className={styles.scoreRing} style={{'--score':`${score*3.6}deg`} as React.CSSProperties}><div><strong>{score}</strong><span>/100</span></div></div>
                <div className={styles.trendBlock}>
                  <div className={styles.delta}><b>↑</b><strong>+6,4%</strong><span>em relação ao período anterior</span></div>
                  <svg className={styles.trend} viewBox="0 0 520 160" preserveAspectRatio="none" aria-label="Evolução de desempenho"><defs><linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9d61" stopOpacity=".34"/><stop offset="1" stopColor="#ff9d61" stopOpacity="0"/></linearGradient></defs><path className={styles.trendArea} d="M0 128 C45 148 60 104 105 105 S155 128 205 91 S265 83 305 102 S360 114 405 65 S465 43 520 55 L520 160 L0 160Z"/><path className={styles.trendLine} d="M0 128 C45 148 60 104 105 105 S155 128 205 91 S265 83 305 102 S360 114 405 65 S465 43 520 55"/><circle cx="520" cy="55" r="5" fill="#ffab72"/></svg>
                </div>
              </div>
            </article>

            <article className={`${styles.panel} ${styles.analyzed}`}>
              <h3>Reuniões analisadas</h3><strong className={styles.bigNumber}>8</strong><p>6 com alta<br/>evidência de engajamento</p>
              <div className={styles.bars}>{[36,48,58,70,76,86,100].map((h,i)=><i key={i} style={{height:`${h}%`}} className={i===6?styles.hotBar:''}/>)}</div>
            </article>
          </div>

          <div className={styles.metrics}>{metrics.map(([label,value],i)=><MetricRing key={label} label={label} target={value} index={i}/>)}</div>

          <article className={`${styles.panel} ${styles.upload}`}>
            <div><h3>Analisar nova reunião</h3><p>Envie sua gravação e receba uma análise completa com insights de performance.</p></div>
            <div className={styles.uploadRow}>
              <div className={styles.progressTrack} aria-label={`Upload ${uploadProgress}%`}>
                <span style={{width:`${uploadProgress}%`}}/>
                <b>Enviando... {uploadProgress}%</b>
                <i/>
              </div>
              <div className={styles.dropMark}>◌</div>
              <div className={styles.dropCopy}>Ou arraste e solte<br/>o seu vídeo aqui<small>MP4, MOV ou WEBM</small></div>
            </div>
          </article>
        </section>

        <aside className={styles.analysisPanel}>
          <div className={styles.portrait}><img src={hero4K} alt="Análise facial em tempo real" draggable={false}/><div className={styles.faceOrbit}/></div>
          <div className={styles.analysisCopy}><p>ANÁLISE EM TEMPO REAL</p><h3>Reconhecimento de expressões,<br/>engajamento e padrões de fala.</h3>
            <ul>{['Analisando expressões','Processando fala','Identificando engajamento','Gerando insights'].map((x,i)=><li key={x}><i style={{'--delay':`${i*.35}s`} as React.CSSProperties}/><span>{x}</span></li>)}</ul>
          </div>
        </aside>
      </div>
    </section>
  </main>;
}
