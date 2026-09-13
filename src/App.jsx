import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from './assets/logo-text.png'
import heroImage from './assets/banner-stack.png'
import './App.css'

const navItems = ['Home', 'Technologies', 'Projects', 'About', 'Contact']

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
        toast.error('Unable to load technology list.')
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
        toast.warn(`${technology.name} is already in your stack.`)
        return currentStack
      }

      toast.success(`${technology.name} added to your stack.`)
      return [...currentStack, technology]
    })
  }

  function removeFromStack(id, name) {
    setStack((currentStack) => currentStack.filter((item) => item.id !== id))
    toast.info(`${name} removed from your stack.`)
  }

  function removeAll() {
    setStack([])
    toast.info('All technologies removed from your stack.')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container navbar">
          <div className="brand-box">
            <img src={logo} alt="Dev Stack" className="brand-logo" />
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
              Build Your Ideal <span className="highlight">Development Stack</span>
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
      </main>

      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  )
}

export default App
