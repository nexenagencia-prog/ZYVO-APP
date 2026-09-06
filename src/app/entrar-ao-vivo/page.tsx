import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import styles from './live.module.css';

const people = [
  {name:'Sandro',tone:'p1',status:'speaking'},
  {name:'Amanda',tone:'p2',status:'muted'},
  {name:'Marcus',tone:'p3',status:'muted'},
  {name:'Julia',tone:'p4',status:'muted'},
];

const skills = [
  ['Participação',82],['Objetividade',76],['Clareza',88],['Escuta ativa',86]
] as const;

const Icon = ({children}:{children:React.ReactNode}) => <span className={styles.icon}>{children}</span>;

export default function LiveMeetingPage(){
  return <main className={styles.page}>
    <Sidebar />
    <Topbar />
    <div className={styles.workspace}>
      <section className={`${styles.panel} ${styles.hostPanel}`}>
        <div className={styles.hostHeader}>
          <div className={`${styles.miniAvatar} ${styles.p1}`}>S</div>
          <div><strong>Sandro</strong><span>Seu vídeo · sempre fixo</span></div>
          <i className={styles.onlineDot}/>
        </div>
        <div className={styles.hostPortrait}>
          <div className={styles.faceGlow}/>
          <div className={styles.faceShape}>S</div>
        </div>
        <div className={styles.sideActions}><button>♡</button><button>◯</button><button>➤</button><button>•••</button></div>
        <div className={styles.floatingControls}><button>◉</button><button>▣</button><button>▤</button><button>•••</button><button className={styles.hangup}>⌕</button></div>
      </section>

      <section className={`${styles.panel} ${styles.participantsPanel}`}>
        <header className={styles.sectionHead}><div><h2>Participantes</h2><span className={styles.count}>4</span><span className={styles.arrow}>›</span></div><button className={styles.pill}>▦ <span>Mosaico</span></button></header>
        <div className={styles.peopleGrid}>
          {people.map((p,index)=><article key={p.name} className={`${styles.personCard} ${styles[p.tone]} ${index===1?styles.activePerson:''}`}>
            <div className={styles.personFace}>{p.name[0]}</div>
            <div className={styles.personLabel}><span>{p.name}</span><small>{p.status==='speaking'?'▥▥▥':'⌁'}</small></div>
          </article>)}
        </div>
        <button className={styles.invite}><span>＋</span><b>Convidar participante</b></button>
      </section>

      <div className={styles.rightColumn}>
        <section className={`${styles.panel} ${styles.skillsPanel}`}>
          <header className={styles.sectionHead}><div><h2>Skills em tempo real</h2></div><span className={styles.liveBadge}>AO VIVO</span></header>
          <p className={styles.subtle}>Análise baseada em fala, participação e interação</p>
          <div className={styles.skillsBody}>
            <div className={`${styles.scanFace} ${styles.p1}`}><span>S</span><i/><i/><i/><i/></div>
            <div className={styles.metrics}>{skills.map(([label,value])=><div key={label} className={styles.metric}><div><span>{label}</span><strong>{value}/100</strong></div><div className={styles.track}><b style={{width:`${value}%`}}/></div></div>)}</div>
          </div>
        </section>

        <section className={`${styles.panel} ${styles.slidesPanel}`}>
          <header className={styles.sectionHead}><div><h2>Slides da reunião</h2></div><div className={styles.navArrows}><button>‹</button><button>›</button></div></header>
          <div className={styles.slideActions}><button>▧ Escolher apresentação</button><button>↥ Adicionar arquivo</button></div>
          <div className={styles.slidePreview}><div className={styles.slideImage}><span/></div><div className={styles.slideWords}>IDEIAS<br/>PLANEJAMENTO<br/>RESULTADOS</div></div>
        </section>
      </div>

      <nav className={styles.bottomBar} aria-label="Controles da reunião">
        <button><Icon>◉</Icon><span>Microfone</span></button>
        <button><Icon>▣</Icon><span>Câmera</span></button>
        <button><Icon>◯</Icon><span>Chat</span></button>
        <button><Icon>▱</Icon><span>Anotar</span></button>
        <button><Icon>♧</Icon><span>Participantes</span></button>
        <button><Icon>▽</Icon><span>Filtros</span></button>
        <button><Icon>▤</Icon><span>Compartilhar</span></button>
        <button><Icon>•••</Icon><span>Mais</span></button>
        <button className={styles.exit}><Icon>✂</Icon><span>Sair</span></button>
      </nav>
    </div>
  </main>;
}
