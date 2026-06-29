import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BatteryCharging,
  BriefcaseBusiness,
  Bug,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Globe2,
  Home,
  Image,
  Mail,
  Moon,
  Palette,
  Radio,
  Server,
  Settings,
  Sparkles,
  User,
  Volume2,
  Wifi,
} from 'lucide-react'
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import giftImage from './assets/hopqua.png'
import './App.css'

const introText = "Hello, I'm Nguyen Thuy Linh"
const GITHUB_USERNAME = 'linhhtunn'
const CV_FILE = '/cv/Fresher%20Full%20Stack%20Nguy%E1%BB%85n%20Th%C3%B9y%20Linh.pdf'
const DEFAULT_MODEL =
  'https://huggingface.co/datasets/Linhthuy123/portfolio-assets/resolve/main/nanally_coluccisre_optimized.glb'
const ABOUT_MODEL = import.meta.env.VITE_ABOUT_MODEL_URL || DEFAULT_MODEL
const giftQuestions = [
  {
    question: 'Bạn biết tôi qua đâu?',
    answers: ['Facebook', 'GitHub', 'Trường học', 'Trong mơ'],
  },
  {
    question: 'Bạn nghĩ tôi có tính cách thế nào?',
    answers: ['Dễ thương', 'Hài hước', 'Khó đoán', 'Thân thiện'],
  },
  {
    question: 'Trưa nay ăn gì?',
    answers: ['Ăn cơm', 'Ăn phở', 'Gì cũng được', 'Nhịn luôn'],
  },
  {
    question: 'Bạn nghĩ ngoài đời tôi sẽ thế nào?',
    answers: ['Ít nói', 'Nói nhiều', 'Hơi ngại', 'Siêu lầy'],
  },
  {
    question: 'Bạn có muốn xem trong hộp quà có gì không?',
    answers: ['Có', 'Kó'],
  },
]
const modelBufferPromises = new Map()
let threeModulesPromise

function preloadThreeModules() {
  threeModulesPromise ??= Promise.all([
    import('three'),
    import('three/examples/jsm/controls/OrbitControls.js'),
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/libs/meshopt_decoder.module.js'),
  ])
  return threeModulesPromise
}

function preloadModelBuffer(modelPath) {
  if (!modelBufferPromises.has(modelPath)) {
    const request = fetch(modelPath, { cache: 'force-cache', mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Model request failed with ${response.status}`)
        }
        return response.arrayBuffer()
      })
      .catch((error) => {
        modelBufferPromises.delete(modelPath)
        throw error
      })
    modelBufferPromises.set(modelPath, request)
  }
  return modelBufferPromises.get(modelPath)
}

const services = [
  { icon: Code2, title: 'Full Stack Web Apps' },
  { icon: Server, title: 'REST API Integration' },
  { icon: Database, title: 'SQL Server & MySQL' },
  { icon: Palette, title: 'Dashboard UI/UX' },
  { icon: FileText, title: 'AI/RAG Document Systems' },
  { icon: Bug, title: 'Testing & QA Workflow' },
]

const stacks = [
  {
    title: 'Frontend',
    items: ['HTML5/CSS3', 'TailwindCSS', 'JavaScript/TypeScript', 'ReactJS/NextJS'],
  },
  {
    title: 'Backend & Database',
    items: ['C++/.NET/C#', 'ASP.NET Core', 'Java/Python', 'SQL Server/MySQL'],
  },
  {
    title: 'Tools, AI & Cloud',
    items: ['Git/GitHub/GitLab', 'Docker/GCP', 'Selenium/Postman', 'ChatGPT/GitSkill'],
  },
]

const socialLinks = [
  { icon: Globe2, label: 'Website', href: '#hero', tone: 'green' },
  { icon: Code2, label: 'Code', href: '#hero', tone: 'white' },
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/linhhtunn', tone: 'dark' },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/th%C3%B9y-linh-nguy%E1%BB%85n-73a4423a5/',
    tone: 'linkedin',
  },
  { icon: FaYoutube, label: 'YouTube', href: '#hero', tone: 'youtube' },
  { icon: FaDiscord, label: 'Discord', href: '#hero', tone: 'discord' },
  {
    icon: FaFacebookF,
    label: 'Facebook',
    href: 'https://www.facebook.com/thuy.linhh.3192/',
    tone: 'facebook',
  },
  { icon: FaXTwitter, label: 'X', href: '#hero', tone: 'x' },
]

function useTypingText(text) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      setValue(text.slice(0, index + 1))
      index += 1
      if (index >= text.length) {
        window.clearInterval(timer)
      }
    }, 85)

    return () => window.clearInterval(timer)
  }, [text])

  return value
}

function useClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const time = now
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(' ', '')
    const date = now.toLocaleDateString('en-GB')
    return { time, date }
  }, [now])
}

function useSystemStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const [battery, setBattery] = useState({ supported: false, level: null, charging: false })

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    let batteryManager
    let mounted = true

    const updateBattery = () => {
      if (!batteryManager || !mounted) return
      setBattery({
        supported: true,
        level: Math.round(batteryManager.level * 100),
        charging: batteryManager.charging,
      })
    }

    if ('getBattery' in navigator) {
      navigator.getBattery().then((manager) => {
        batteryManager = manager
        updateBattery()
        manager.addEventListener('levelchange', updateBattery)
        manager.addEventListener('chargingchange', updateBattery)
      })
    }

    return () => {
      mounted = false
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', updateBattery)
        batteryManager.removeEventListener('chargingchange', updateBattery)
      }
    }
  }, [])

  return { online, battery }
}

function useGithubRepos(username) {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRepos() {
      try {
        setStatus('loading')
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=12`,
          {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`)
        }

        const data = await response.json()
        const publicRepos = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description yet.',
            language: repo.language || 'Project',
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          }))

        setRepos(publicRepos)
        setStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error')
        }
      }
    }

    loadRepos()
    return () => controller.abort()
  }, [username])

  return { repos, status }
}

function FloatingDock() {
  const { time, date } = useClock()
  const { online, battery } = useSystemStatus()
  const dockItems = [
    { icon: Home, label: 'Home', href: '#hero' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Settings, label: 'Skills', href: '#skills' },
    { icon: BriefcaseBusiness, label: 'Repos', href: '#repositories' },
    { icon: Mail, label: 'Contact', href: '#contact' },
    { icon: Image, label: 'Gallery', href: '#repositories' },
    { icon: Sparkles, label: 'Ideas', href: '#skills' },
    { icon: FileText, label: 'CV', href: '#about' },
  ]

  return (
    <nav className="dock" aria-label="Portfolio sections">
      <a className="dock-brand" href="#hero">
        Linh.
      </a>
      <span className="dock-divider" />
      <div className="dock-icons">
        {dockItems.map((item) => (
          <DockIcon item={item} key={item.label} />
        ))}
      </div>
      <span className="dock-divider" />
      <button className="dock-mode" type="button" aria-label="Soft night mode">
        <Moon size={18} />
      </button>
      <div className="dock-status" aria-label="Realtime system status">
        <span className="status-pill">L</span>
        <Wifi className={online ? 'status-ok' : 'status-muted'} size={18} />
        <Volume2 size={18} />
        <span className="battery-shell" title={battery.supported ? `${battery.level}%` : 'Battery unavailable'}>
          <span
            className="battery-level"
            style={{ width: `${battery.supported ? battery.level : 74}%` }}
          />
          {battery.charging && <BatteryCharging size={11} />}
        </span>
        <span className="dock-time">
          <strong>{time}</strong>
          <span>{date}</span>
        </span>
      </div>
    </nav>
  )
}

function DockIcon({ item }) {
  const [imageFailed, setImageFailed] = useState(false)
  const Icon = item.icon
  const hasImage = item.image && !imageFailed

  return (
    <a
      className={`dock-icon ${hasImage ? 'has-image' : ''}`}
      href={item.href}
      aria-label={item.label}
    >
      {hasImage ? (
        <img src={item.image} alt="" onError={() => setImageFailed(true)} />
      ) : (
        <Icon size={25} strokeWidth={2.4} />
      )}
    </a>
  )
}

function Hero({ onHoverChange, isHovering }) {
  const typed = useTypingText(introText)

  return (
    <section
      id="hero"
      className="section hero-section"
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
    >
      <div className={`cursor-glow ${isHovering ? 'is-visible' : ''}`} />
      <div className="hero-grid" />
      <div className="hero-content">
        <p className="typing-line">
          {typed}
          <span className="typing-caret" />
        </p>
        <h1>
          Full Stack
          <span>Web Developer</span>
        </h1>
        <p className="hero-copy">
          I create gentle, useful digital experiences with clean interfaces, careful code, and a
          pastel touch.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#contact">
            Get In Touch
          </a>
          <a
            className="ghost-button"
            href={CV_FILE}
            download="Fresher Full Stack Nguyen Thuy Linh.pdf"
          >
            View my CV
          </a>
        </div>
        <div className="hero-socials">
          <GitBranch size={22} />
          <BriefcaseBusiness size={22} />
          <Mail size={22} />
          <Globe2 size={22} />
        </div>
      </div>
      <div className="scroll-cue">↓</div>
      <div className="wave-wrap" aria-hidden="true">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveBlendOne" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d9a3ac" stopOpacity="0.34" />
              <stop offset="48%" stopColor="#b8d9d3" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#75bfb2" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveBlendTwo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#75bfb2" stopOpacity="0.32" />
              <stop offset="52%" stopColor="#f2e5e4" stopOpacity="0.56" />
              <stop offset="100%" stopColor="#d991a4" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="waveBlendThree" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f2e5e4" stopOpacity="0.7" />
              <stop offset="44%" stopColor="#b8d9d3" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#d9a3ac" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path className="wave wave-one" d="M0,90 C180,150 310,20 520,80 C750,146 870,20 1080,76 C1240,118 1320,56 1440,78 L1440,190 L0,190 Z" />
          <path className="wave wave-two" d="M0,122 C210,70 290,156 520,116 C710,82 865,148 1030,104 C1210,56 1324,130 1440,92 L1440,190 L0,190 Z" />
          <path className="wave wave-three" d="M0,140 C180,98 310,150 460,126 C680,86 780,164 980,118 C1170,74 1270,160 1440,116 L1440,190 L0,190 Z" />
        </svg>
      </div>
    </section>
  )
}

function About() {
  const aboutRows = [
    {
      icon: '📍',
      tone: 'blue',
      label: 'Location',
      value: 'Cau Giay, Ha Noi - open to hybrid and collaborative product teams.',
    },
    {
      icon: '📚',
      tone: 'blue',
      label: 'Education',
      value: 'Software Engineering student with a recent GPA of 4.0/4.0 and 3 excellent scholarships.',
    },
    {
      icon: '🎓',
      tone: 'purple',
      label: 'Current Study',
      value: 'Computer Science at VinUniversity, building stronger foundations in systems and problem solving.',
    },
    {
      icon: '🚀',
      tone: 'purple',
      label: 'Coding Journey',
      value: 'Growing as a Fresher Full Stack developer through real Health App, ViBook AI, and LMS projects.',
    },
    {
      icon: '💻',
      tone: 'green',
      label: 'Tech Passion',
      value: 'I enjoy clean dashboards, useful APIs, AI learning tools, and interfaces that feel simple to use.',
    },
    {
      icon: '🔧',
      tone: 'green',
      label: 'Main Focus',
      value: 'Full-stack Java/.NET/Python development with React, REST APIs, SQL, testing, and deployment habits.',
    },
    {
      icon: '✨',
      tone: 'orange',
      label: 'Personality',
      value: 'Curious, responsible, fast-learning, comfortable with teamwork, planning, and iterative delivery.',
    },
    {
      icon: '💡',
      tone: 'orange',
      label: 'Always seeking',
      value: 'Opportunities to build production-ready features, learn architecture, and contribute to larger systems.',
    },
  ]
  const duplicated = [...aboutRows, ...aboutRows]

  return (
    <section id="about" className="section about-section">
      <SectionTitle title="About Me" />
      <div className="about-layout">
        <div className="paper-frame">
          <div className="paper-bar">
            <span />
          </div>
          <div className="paper-scroll">
            <div className="paper-inner">
              <h3>Hi, I'm Nguyen Thuy Linh</h3>
              {duplicated.map((row, index) => (
                <p className={`about-line tone-${row.tone}`} key={`${row.label}-${index}`}>
                  <span className="about-icon" aria-hidden="true">
                    {row.icon}
                  </span>
                  <strong>{row.label}:</strong> {row.value}
                </p>
              ))}
            </div>
          </div>
          <div className="paper-bar">
            <span />
          </div>
        </div>
        <AboutModel modelPath={ABOUT_MODEL} />
      </div>
    </section>
  )
}

function AboutModel({ modelPath }) {
  const mountRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState('loading')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [giftCountdown, setGiftCountdown] = useState(90)
  const [giftOpened, setGiftOpened] = useState(false)
  const quizDone = questionIndex >= giftQuestions.length
  const canReveal = quizDone && giftOpened && status !== 'loading'

  const countdownLabel = useMemo(() => {
    const minutes = Math.floor(giftCountdown / 60)
    const seconds = String(giftCountdown % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [giftCountdown])

  useEffect(() => {
    if (!quizDone || giftOpened) return undefined

    const timer = window.setInterval(() => {
      setGiftCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setGiftOpened(true)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [giftOpened, quizDone])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '220px' },
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return undefined

    const mount = mountRef.current
    if (!mount) return undefined

    let disposed = false
    let renderer
    let controls
    let animationId
    let cleanupResize = () => {}

    async function setupModel() {
      const [THREE, { OrbitControls }, { GLTFLoader }, { MeshoptDecoder }] = await preloadThreeModules()

      if (disposed) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      camera.position.set(0, 1.15, 8.2)

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.enablePan = false
      controls.minDistance = 5.5
      controls.maxDistance = 10
      controls.target.set(0, 0.35, 0)
      controls.autoRotate = false

      const group = new THREE.Group()
      scene.add(group)

      scene.add(new THREE.HemisphereLight(0xffffff, 0xd9a3ac, 2.6))

      const key = new THREE.DirectionalLight(0xffffff, 3.2)
      key.position.set(3, 4, 5)
      scene.add(key)

      const pink = new THREE.PointLight(0xd991a4, 2.6, 8)
      pink.position.set(-2.5, 2, 3)
      scene.add(pink)

      const clock = new THREE.Clock()
      let mixer
      const loader = new GLTFLoader()
      loader.setMeshoptDecoder(MeshoptDecoder)
      const handleModel = (gltf) => {
        if (disposed) return
        const model = gltf.scene
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxAxis = Math.max(size.x, size.y, size.z) || 1

        model.position.sub(center)
        model.position.y -= 0.15
        model.scale.setScalar(2.15 / maxAxis)
        model.rotation.y = -0.2
        group.add(model)

        if (gltf.animations.length > 0) {
          const clip = gltf.animations.reduce((longest, current) =>
            current.duration > longest.duration ? current : longest,
          )
          mixer = new THREE.AnimationMixer(model)
          mixer.clipAction(clip).reset().play()
        }

        setStatus('ready')
      }

      const handleModelError = (error) => {
        if (disposed) return
        console.warn('3D model could not be loaded, showing fallback instead.', error)
        const geometry = new THREE.TorusKnotGeometry(0.74, 0.2, 140, 18)
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xd991a4,
          roughness: 0.25,
          metalness: 0.08,
          transmission: 0.18,
          thickness: 0.8,
        })
        group.add(new THREE.Mesh(geometry, material))
        setStatus('missing')
      }

      preloadModelBuffer(modelPath)
        .then((buffer) => {
          if (disposed) return
          loader.parse(buffer, '', handleModel, handleModelError)
        })
        .catch(handleModelError)

      const resize = () => {
        const rect = mount.getBoundingClientRect()
        const width = Math.max(rect.width, 1)
        const height = Math.max(rect.height, 1)
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      const animate = () => {
        animationId = window.requestAnimationFrame(animate)
        mixer?.update(clock.getDelta())
        controls.update()
        renderer.render(scene, camera)
      }

      resize()
      animate()
      window.addEventListener('resize', resize)
      cleanupResize = () => window.removeEventListener('resize', resize)
    }

    setupModel().catch((error) => {
      if (disposed) return
      console.warn('3D scene failed to initialize.', error)
      setStatus('missing')
    })

    return () => {
      disposed = true
      cleanupResize()
      if (animationId) window.cancelAnimationFrame(animationId)
      controls?.dispose()
      renderer?.dispose()
      if (renderer?.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [isVisible, modelPath])

  return (
    <div className="model-visual" ref={wrapperRef}>
      <div className={`model-canvas ${canReveal ? 'is-revealed' : ''}`} ref={mountRef} />
      {!canReveal && (
        <div className="gift-experience">
          {!quizDone ? (
            <div className="gift-quiz">
              <span className="gift-step">
                Câu {questionIndex + 1}/{giftQuestions.length}
              </span>
              <h3>{giftQuestions[questionIndex].question}</h3>
              <div className="gift-answers">
                {giftQuestions[questionIndex].answers.map((answer, index) => (
                  <button
                    type="button"
                    key={answer}
                    onClick={() => setQuestionIndex((current) => current + 1)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`gift-box-wrap ${giftOpened ? 'is-open' : ''}`}>
              <img className="gift-box-image" src={giftImage} alt="" aria-hidden="true" />
              <h3>{giftOpened ? 'Đang mở quà...' : 'Ủa zì zậy tar ?'}</h3>
              <strong>{giftOpened ? 'Sắp xong rồi' : countdownLabel}</strong>
            </div>
          )}
        </div>
      )}
      {status === 'missing' && (
        <span className="model-badge">
          Model host blocked loading. Set <strong>VITE_ABOUT_MODEL_URL</strong>
        </span>
      )}
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <span />
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="ripple-field" aria-hidden="true">
        <span className="ripple-core" />
        <span className="ripple-ring ring-a" />
        <span className="ripple-ring ring-b" />
        <span className="ripple-ring ring-c" />
        <span className="ripple-dot dot-a" />
        <span className="ripple-dot dot-b" />
      </div>
      <SectionTitle title="What I Do" subtitle="Services & Expertise" />
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <service.icon size={30} />
            <h3>{service.title}</h3>
          </article>
        ))}
      </div>
      <SectionTitle title="Tech Stack" />
      <div className="stack-grid">
        {stacks.map((group) => (
          <article className="stack-card" key={group.title}>
            <h3>{group.title}</h3>
            {group.items.map((item) => (
              <p key={item}>
                <Radio size={16} />
                {item}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

function RepoCard({ repo }) {
  return (
    <article className="repo-card">
      <div>
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
      </div>
      <div className="repo-meta">
        <span>{repo.language}</span>
        <small>
          Stars {repo.stars} | Forks {repo.forks}
        </small>
        <a href={repo.url} target="_blank" rel="noreferrer" aria-label={`View ${repo.name}`}>
          <GitBranch size={16} /> View <ExternalLink size={14} />
        </a>
      </div>
    </article>
  )
}

function Repositories() {
  const { repos, status } = useGithubRepos(GITHUB_USERNAME)
  const hasRepos = repos.length > 0
  const displayRepos = hasRepos ? repos : []
  const top = [...displayRepos, ...displayRepos]
  const bottom = [...displayRepos.slice().reverse(), ...displayRepos.slice().reverse()]

  return (
    <section id="repositories" className="section repo-section">
      <SectionTitle
        title="Github Repositories"
        subtitle={`Live public repositories from github.com/${GITHUB_USERNAME}.`}
      />
      {status === 'loading' && <p className="repo-state">Loading GitHub repositories...</p>}
      {status === 'error' && (
        <p className="repo-state">Could not load GitHub repositories right now.</p>
      )}
      {status === 'ready' && !hasRepos && (
        <p className="repo-state">No public repositories found for this GitHub account.</p>
      )}
      {hasRepos && (
        <div className="marquee-wrap">
          <div className="marquee-row move-right">
            {top.map((repo, index) => (
              <RepoCard repo={repo} key={`${repo.id}-top-${index}`} />
            ))}
          </div>
          <div className="marquee-row move-left">
            {bottom.map((repo, index) => (
              <RepoCard repo={repo} key={`${repo.id}-bottom-${index}`} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <SectionTitle
        title="Connect with me"
        subtitle="Have a question, project idea, or opportunity? I would love to hear from you."
      />
      <div className="contact-layout">
        <div className="orbit" aria-label="Social links">
          <a className="orbit-center" href="mailto:hello@example.com">
            Contact
            <span>Me</span>
          </a>
          <div className="orbit-track">
            {socialLinks.map((social, index) => (
              <a
                className="orbit-item"
                href={social.href}
                key={social.label}
                aria-label={social.label}
                data-tone={social.tone}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                style={{ '--i': index, '--total': socialLinks.length }}
              >
                <social.icon size={30} />
              </a>
            ))}
          </div>
        </div>
        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Subject
            <input type="text" placeholder="Email subject" />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Write your message here..." />
          </label>
          <button type="button">Send Message</button>
        </form>
      </div>
    </section>
  )
}

function App() {
  const [heroHover, setHeroHover] = useState(false)

  useEffect(() => {
    const updateGlow = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', updateGlow)
    return () => window.removeEventListener('pointermove', updateGlow)
  }, [])

  useEffect(() => {
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://huggingface.co'
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)

    const warmModel = () => {
      preloadThreeModules()
      preloadModelBuffer(ABOUT_MODEL).catch(() => {})
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(warmModel, { timeout: 1800 })
      return () => {
        window.cancelIdleCallback(idleId)
        document.head.removeChild(preconnect)
      }
    }

    const timer = window.setTimeout(warmModel, 1200)
    return () => {
      window.clearTimeout(timer)
      document.head.removeChild(preconnect)
    }
  }, [])

  return (
    <>
      <main>
        <Hero onHoverChange={setHeroHover} isHovering={heroHover} />
        <About />
        <Skills />
        <Repositories />
        <Contact />
      </main>
      <FloatingDock />
    </>
  )
}

export default App
