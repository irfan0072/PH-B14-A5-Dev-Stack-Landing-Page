import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import heroImage from './assets/banner-stack.png'
import './App.css'

const navItems = ['Home', 'Technologies', 'Projects', 'About', 'Contact']

const faqItems = [
  {
    question: 'Where can we deploy the site?',
    answer:
      'You can deploy the site anywhere you like, such as Netlify, Vercel, Cloudflare Pages, or any other hosting platform.',
  },
  {
    question: 'Do we have to use TypeScript?',
    answer:
      'No. You can use either TypeScript or JavaScript. This project is built using TypeScript.',
  },
  {
    question: 'Can we change the title, logo, and colors?',
    answer:
      'Yes. You can change the project title, logo, and color scheme as long as they remain relevant to the project.',
  },
  {
    question: 'Where do we get the technology logos and icons?',
    answer:
      'You can use technology icon URLs from different sources. TechIcons is one useful source for clean technology logos.',
  },
]

function App() {
  const [technologies, setTechnologies] = useState([])
  const [stack, setStack] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/technologies.json')
        const data = await response.json()
        setTechnologies(data)
      } catch (error) {
        toast.error('Unable to load technology list.', { toastId: 'load-error' })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  function addToStack(technology) {
    setStack((currentStack) => {
      const alreadyAdded = currentStack.some((item) => item.id === technology.id)

      if (alreadyAdded) {
        toast.warn(`${technology.name} is already in your stack.`, {
          toastId: `duplicate-${technology.id}`,
        })
        return currentStack
      }

      toast.success(`${technology.name} added to your stack.`, {
        toastId: `add-${technology.id}`,
      })
      return [...currentStack, technology]
    })
  }

  function removeFromStack(id, name) {
    setStack((currentStack) => currentStack.filter((item) => item.id !== id))
    toast.info(`${name} removed from your stack.`, { toastId: `remove-${id}` })
  }

  function removeAll() {
    setStack([])
    toast.info('All technologies removed from your stack.', { toastId: 'remove-all' })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container navbar">
          <div className="brand-box">
            <div className="brand-mark">DS</div>
            <span className="brand-text">Dev Stack</span>
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item} href="#" className={item === 'Home' ? 'active' : ''}>
                {item}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button type="button" className="plain-btn">
              Sign In
            </button>
            <button type="button" className="filled-btn">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="container page-content">
        <section className="hero-section">
          <div className="hero-copy">
            <h1>
              Build Your Ideal
              <br />
              <span className="highlight">Development Stack</span>
            </h1>
            <p className="hero-text">
              Explore frontend, backend, database, and tooling options to compare them and
              build a strong stack for your project.
            </p>

            <div className="hero-buttons">
              <button type="button" className="primary-btn">
                Explore Technologies
              </button>
              <button type="button" className="secondary-btn">
                Learn More
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <img src={heroImage} alt="Technology stack" className="hero-image" />
          </div>
        </section>

        <section className="catalog-section">
          <div className="technology-box">
            <div className="section-title">
              <h2>
                Explore the <span className="highlight">Technologies</span>
              </h2>
              <p className="section-small-text">Pick technologies to build your ideal development stack.</p>
            </div>

            {loading ? (
              <div className="loading-box">
                <div className="spinner" aria-label="Loading"></div>
                <p>Loading technologies...</p>
              </div>
            ) : (
              <div className="tech-grid">
                {technologies.map((technology) => {
                  const isSelected = stack.some((item) => item.id === technology.id)

                  return (
                    <article className="tech-card" key={technology.id}>
                      <div className="card-head">
                        <img src={technology.icon} alt={technology.name} className="tech-icon" />
                        <span className="badge">{technology.badge}</span>
                      </div>

                      <div className="tech-info">
                        <h3>{technology.name}</h3>
                        <p>{technology.description}</p>
                      </div>

                      <div className="labels">
                        <span className="chip">{technology.category}</span>
                        <span className="difficulty">{technology.difficulty}</span>
                      </div>

                      <div className="rating">
                        <span className="star">★</span>
                        <span>{technology.rating.toFixed(1)}</span>
                      </div>

                      <button
                        type="button"
                        className="stack-btn"
                        disabled={isSelected}
                        onClick={() => addToStack(technology)}
                      >
                        {isSelected ? '✓ Added to Stack' : 'Add to Stack'}
                      </button>
                    </article>
                  )
                })}
              </div>
            )}
          </div>

          <aside className="stack-panel">
            <div className="panel-head">
              <h2>Your Stack</h2>
              <span>{stack.length} Technology Selected</span>
            </div>

            {stack.length === 0 ? (
              <div className="empty-box">
                <div className="empty-icon">+</div>
                <p>No technologies selected yet.</p>
                <small>Choose the stack items you like from the list.</small>
              </div>
            ) : (
              <div className="stack-list">
                {stack.map((item) => (
                  <div className="stack-item" key={item.id}>
                    <div className="stack-item-main">
                      <img src={item.icon} alt={item.name} className="stack-icon" />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.category}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromStack(item.id, item.name)}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button type="button" className="remove-all" onClick={removeAll}>
                  Remove All
                </button>
              </div>
            )}
          </aside>
        </section>

        <section className="faq-section">
          <div className="faq-head">
            <p className="faq-tag">Common FAQ</p>
            <p className="faq-subtitle">Frequently asked questions about Dev Stack.</p>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} className="faq-item" open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <div className="brand-mark small">DS</div>
              <span className="brand-text">Dev Stack</span>
            </div>
            <p>Curated tools and technologies for developers building modern software.</p>
            <div className="social-links">
              <a href="#">GitHub</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <a href="#">Home</a>
            <a href="#">Technologies</a>
            <a href="#">Projects</a>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>© 2026 Dev Stack. All rights reserved.</span>
            <div>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  )
}

export default App
