"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './page.module.css';
import Link from 'next/link';

// Importe suas imagens e outros recursos necessários
import logo from '../public/logo.png';

export default function EpicVinheta() {
  const [isHovered, setIsHovered] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(0);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setFadeAnim((prev) => Math.min(prev + 0.05, 1));
    }, 100);

    return () => clearInterval(fadeInterval);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.container} style={{ opacity: fadeAnim }}>
      <div className={styles.header}>
        <img src={logo.src} alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Intelligence</h1>
      </div>
      <div className={styles.additionalContent}><Link href="/introducao">
        <button 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isHovered ? styles.buttonTextHovered : styles.buttonText}
        >
          Iniciar
        </button></Link>
      </div>
    </div>
  );
}