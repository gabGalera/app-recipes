import React from 'react';
import styles from '../styles/Loading.module.css';

function Loading() {
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(65, 25, 127, 1)',
      } }
    >
      <div className={ styles.lds__heart }><div /></div>
    </div>
  );
}

export default Loading;
