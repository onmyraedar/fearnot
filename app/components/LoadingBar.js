import { motion, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import styles from '../styles/LoadingBar.module.css';

export default function LoadingBar() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const containerWidth = document.querySelector('#loading-bar-container').offsetWidth;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: '100%' }],
          [scope.current, { x: containerWidth, width: '0%' }, { delay: 0.6 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        }
      );
    };
    animateLoader();
  }, []);

  return (
    <div id="loading-bar-container" className={styles.container}>
      <motion.div ref={scope} className={styles.loader} />
      <h1 className={styles.text}>
        <i>loading...</i>
      </h1>
    </div>
  );
}
