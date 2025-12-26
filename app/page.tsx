'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './page.module.css'

function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((node: HTMLElement | null) => {
    // 前のobserverをクリーンアップ
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold }
      )
      observerRef.current.observe(node)
      elementRef.current = node
    }
  }, [threshold])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { ref: setRef, isVisible }
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
        <div className={styles.heroBackground}>
          <div className={styles.heroLine}></div>
          <div className={styles.heroLine}></div>
          <div className={styles.heroLine}></div>
          <div className={styles.heroLine}></div>
          <div className={styles.heroLine}></div>
        </div>
        <div className={styles.heroInner}>
          <div className={`${styles.heroTop} ${loaded ? styles.heroVisible : ''}`}>
            <span className={styles.heroYear}>2024</span>
            <span className={styles.heroDivider}></span>
            <span className={styles.heroLocation}>Tokyo, Japan</span>
          </div>
          
          <div className={`${styles.heroCenter} ${loaded ? styles.heroVisible : ''}`}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMain}>栗田まんこ星</span>
              <span className={styles.heroTitleSub}>Kurita Mankoboshi</span>
            </h1>
          </div>

          <div className={`${styles.heroBottom} ${loaded ? styles.heroVisible : ''}`}>
            <p className={styles.heroTagline}>
              <span className={styles.taglineWord}>Crispy</span>
              <span className={styles.taglineDot}></span>
              <span className={styles.taglineWord}>Juicy</span>
              <span className={styles.taglineDot}></span>
              <span className={styles.taglineWord}>Finger Lickin&apos; Good</span>
            </p>
          </div>

          <div className={styles.heroAccent}>
            <div className={styles.accentCircle}></div>
            <div className={styles.accentRing}></div>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
          <span className={styles.scrollText}>Scroll to explore</span>
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
            <div className={styles.profileImageWrapper}>
              <div className={styles.profileImage}>
                <img src="/kurita.png" alt="栗田まんこ星" />
              </div>
              <div className={styles.profileImageBadge}>🍗</div>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileText}>
                <h3 className={styles.profileName}>栗田まんこ星</h3>
                <p className={styles.profileKana}>Kurita Mankoboshi</p>
                <p className={styles.profileRole}>KFC Specialist</p>
                <p className={styles.profileBio}>
                  ケンタッキーフライドチキンにて、フライヤー技術とカスタマーサービスの最前線で経験を積む。
                  オリジナルチキンの調理から接客まで、店舗オペレーションの全領域を網羅するスペシャリスト。
                </p>
                <p className={styles.profileNote}>
                  ※ 最近フラれました。現在、心の傷を癒し中です。
                </p>
              </div>
              <div className={styles.profileDetails}>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Tokyo, Japan</span>
              </div>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Expertise</span>
                <span className={styles.detailValue}>Fried Chicken Master</span>
              </div>
              <div className={styles.profileDetailItem}>
                <span className={styles.detailLabel}>Experience</span>
                <span className={styles.detailValue}>10+ Years</span>
              </div>
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
              「一羽のチキンに、
              <br />
              魂を込める。
              <br />
              それが俺の生き様。」
            </blockquote>
            <p className={styles.philosophyText}>
              カーネル・サンダースは65歳で全てを失い、車で眠りながらレシピを売り歩いた。
              1009回断られても、諦めなかった。その精神を、俺は受け継ぐ。
              圧力フライヤーの前に立つとき、俺は単なるバイトじゃない。
              11種のハーブ&スパイスを纏った黄金の翼を、世界に届ける使者だ。
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
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>🍗 Original Recipe Master</h4>
              <p className={styles.skillDesc}>
                門外不出の11種ハーブ&スパイス。185℃の圧力フライヤーで15分。
                この黄金律を体に刻み込んだ者だけが、真のオリジナルチキンを揚げられる。
              </p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>🔥 Rush Hour Warrior</h4>
              <p className={styles.skillDesc}>
                クリスマス、地獄のランチタイム。オーダーが鳴り止まない戦場で、
                俺は冷静にチキンを揚げ続ける。パニックは敵。冷静さが武器。
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
              <h4 className={styles.skillTitle}>😊 Smile ¥0 Spirit</h4>
              <p className={styles.skillDesc}>
                「いらっしゃいませ、ケンタッキーへようこそ！」
                この一言に、俺の全てを込める。笑顔は無料、だが価値は無限大。
              </p>
            </div>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <h4 className={styles.skillTitle}>🛒 Inventory Commander</h4>
              <p className={styles.skillDesc}>
                チキンの在庫が切れる？ありえない。
                需要予測、発注管理、廃棄ロス最小化。見えない戦いを制する者が、店を制する。
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
              <div className={styles.careerYear}>Current</div>
              <div className={styles.careerContent}>
                <h4>🍗 ケンタッキーフライドチキン</h4>
                <p>フライヤーの前に立ち、カーネルの魂を継承する日々。オリジナルチキンを極め、店舗オペレーションの全てを担う。</p>
              </div>
            </div>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>University</div>
              <div className={styles.careerContent}>
                <h4>九州工業大学</h4>
                <p>電気電子工学を専攻。しかし、真の学びはケンタッキーの厨房にあった。</p>
              </div>
            </div>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>High School</div>
              <div className={styles.careerContent}>
                <h4>松山東高校</h4>
                <p>文武両道の精神のもと、学業と課外活動に励み、多角的な視点を養いました。</p>
              </div>
            </div>
            <div className={styles.careerItem}>
              <div className={styles.careerYear}>Junior High</div>
              <div className={styles.careerContent}>
                <h4>内宮中学校</h4>
                <p>好奇心と探究心を育み、将来への土台となる基礎を築いた原点です。</p>
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

