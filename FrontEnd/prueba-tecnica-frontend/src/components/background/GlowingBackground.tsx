// components/GlowingBackground.js

import React from 'react';
import styles from './GlowingBackground.module.css';

const GlowingBackground = () => {
  return (
    <div className={styles.glowingContainer}>
      <div className={styles.glowing}>
        <span style={{ '--i': 1 } as React.CSSProperties}></span>
        <span style={{ '--i': 2 } as React.CSSProperties}></span>
        <span style={{ '--i': 3 } as React.CSSProperties}></span>
      </div>
      <div className={styles.glowing}>
        <span style={{ '--i': 1 } as React.CSSProperties}></span>
        <span style={{ '--i': 2 } as React.CSSProperties}></span>
        <span style={{ '--i': 3 } as React.CSSProperties}></span>
      </div>
      <div className={styles.glowing}>
        <span style={{ '--i': 1 } as React.CSSProperties}></span>
        <span style={{ '--i': 2 } as React.CSSProperties}></span>
        <span style={{ '--i': 3 } as React.CSSProperties}></span>
      </div>
      <div className={styles.glowing}>
        <span style={{ '--i': 1 } as React.CSSProperties}></span>
        <span style={{ '--i': 2 } as React.CSSProperties}></span>
        <span style={{ '--i': 3 } as React.CSSProperties}></span>
      </div>
    </div>
  );
};

export default GlowingBackground;
