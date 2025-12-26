'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const profileSection = useIntersectionObserver()
  const philosophySection = useIntersectionObserver()
  const skillsSection = useIntersectionObserver()
  const careerSection = useIntersectionObserver()
  const contactSection = useIntersectionObserver()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.wrapper}>
      {/* ナビゲーション */}
      <nav className={`${styles.nav} ${loaded ? styles.navVisible : ''}`}>
        <div className={styles.navInner}>
          <span className={styles.logo}>K.</span>
          <ul className={styles.navLinks}>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#philosophy">Philosophy</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={`${styles.heroContent} ${loaded ? styles.heroVisible : ''}`}>
            <p className={styles.heroLabel}>Portfolio 2024</p>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>栗田まんこ星</span>
            </h1>
            <p className={styles.heroDesc}>
              創造性と論理性を融合させ、<br />
              新しい価値を生み出す
            </p>
          </div>
          <div className={`${styles.heroVisual} ${loaded ? styles.heroVisible : ''}`}>
            <div className={styles.heroCircle}></div>
            <div className={styles.heroCircleSmall}></div>
          </div>
        </div>
        <div className={styles.scrollLine}>
          <span>Scroll</span>
          <div className={styles.scrollLineBar}></div>
        </div>
      </section>

      {/* プロフィールセクション */}
      <section 
        id="profile" 
        className={styles.section}
        ref={profileSection.ref}
      >
        <div className={`${styles.sectionInner} ${profileSection.isVisible ? styles.sectionVisible : ''}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>01</span>
            <h2 className={styles.sectionTitle}>Profile</h2>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.profileText}>
              <h3 className={styles.profileName}>栗田まんこ星</h3>
              <p className={styles.profileKana}>Kurita Mankoboshi</p>
              <p className={styles.profileRole}>Creative Professional</p>
              <p className={styles.profileBio}>
                様々な分野で培った経験を活かし、プロジェクトに新しい視点と価値を提供します。
                常に学び続け、チームと共に成長することを大切にしています。
              </p>
            </div>
            <div className={styles.profileDetails}>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Tokyo, Japan</span>
              </div>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Expertise</span>
                <span className={styles.detailValue}>Strategy & Creative</span>
              </div>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Experience</span>
                <span className={styles.detailValue}>10+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フィロソフィーセクション */}
      <section 
        id="philosophy" 
        className={`${styles.section} ${styles.sectionDark}`}
        ref={philosophySection.ref}
      >
        <div className={`${styles.sectionInner} ${philosophySection.isVisible ? styles.sectionVisible : ''}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>02</span>
            <h2 className={styles.sectionTitle}>Philosophy</h2>
          </div>
          <div className={styles.philosophyContent}>
            <blockquote className={styles.philosophyQuote}>
              「本質を見極め、<br />
              シンプルに、<br />
              力強く。」
            </blockquote>
            <p className={styles.philosophyText}>
              複雑な問題をシンプルな解決策へと導くこと。
              それが私の仕事に対する基本姿勢です。
              表面的な華やかさではなく、本質的な価値を追求し、
              長く愛されるものを創り出すことを目指しています。
            </p>
          </div>
        </div>
      </section>

      {/* スキルセクション */}
      <section 
        id="skills" 
        className={styles.section}
        ref={skillsSection.ref}
      >
        <div className={`${styles.sectionInner} ${skillsSection.isVisible ? styles.sectionVisible : ''}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>03</span>
            <h2 className={styles.sectionTitle}>Skills</h2>
          </div>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>Strategic Thinking</h4>
              <p className={styles.skillDesc}>
                課題の本質を見極め、最適な解決策を導き出す戦略的思考力
              </p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>Project Management</h4>
              <p className={styles.skillDesc}>
                複雑なプロジェクトを円滑に推進し、成果へと導くマネジメント力
              </p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>Team Leadership</h4>
              <p className={styles.skillDesc}>
                多様なメンバーの力を引き出し、チームの成果を最大化するリーダーシップ
              </p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>Creative Direction</h4>
              <p className={styles.skillDesc}>
                ビジョンを形にし、一貫性のあるクリエイティブを生み出す力
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* キャリアセクション */}
      <section 
        id="career" 
        className={`${styles.section} ${styles.sectionAlt}`}
        ref={careerSection.ref}
      >
        <div className={`${styles.sectionInner} ${careerSection.isVisible ? styles.sectionVisible : ''}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>04</span>
            <h2 className={styles.sectionTitle}>Career</h2>
          </div>
          <div className={styles.careerTimeline}>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>2024 —</div>
              <div className={styles.careerContent}>
                <h4>現在のポジション</h4>
                <p>新たな挑戦と成長を続けながら、より大きな価値創造を目指しています。</p>
              </div>
            </div>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>2020 — 2023</div>
              <div className={styles.careerContent}>
                <h4>リーダーシップの発揮</h4>
                <p>チームを率いて複数の重要プロジェクトを成功に導きました。</p>
              </div>
            </div>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>2015 — 2019</div>
              <div className={styles.careerContent}>
                <h4>専門性の確立</h4>
                <p>様々な経験を通じて、独自の強みとスタイルを確立しました。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コンタクトセクション */}
      <section 
        id="contact" 
        className={styles.contactSection}
        ref={contactSection.ref}
      >
        <div className={`${styles.sectionInner} ${contactSection.isVisible ? styles.sectionVisible : ''}`}>
          <div className={styles.contactContent}>
            <p className={styles.contactLabel}>Get in Touch</p>
            <h2 className={styles.contactTitle}>
              お気軽に<br />ご連絡ください
            </h2>
            <a href="mailto:hello@mankoboshi.com" className={styles.contactEmail}>
              hello@mankoboshi.com
            </a>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>K.</span>
          <p className={styles.footerCopy}>© 2024 Kurita. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
