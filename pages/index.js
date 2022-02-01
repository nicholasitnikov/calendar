import { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import { v4 as uuidv4 } from 'uuid';

import data from '../utils/data';
import Head from 'next/head';

export default function Home() {

  const [selected, setSelected] = useState([]);

  const cellClickHandler = (e) => {
    let prevState = [...selected];
    prevState.push({ id: e.target.getAttribute('data-id'), value: e.target.textContent })
    localStorage.setItem('selected', JSON.stringify(prevState));
    setSelected(prevState)
  }

  useEffect(() => {
    const data = localStorage.getItem('selected');
    if(data) {
      setSelected(JSON.parse(data));
    }
  }, [])

  const getCellClassName = (id, isLabel) => {
    if(selected.find((el) => el.id === id)) {
      return [styles.cell, styles.cellSelected].join(' ');
    }
    return isLabel ? styles.label : styles.cell
  }

  const renderCells = () => {
    return data.map(el => {
      return <span key={el.id} data-id={el.id} onClick={cellClickHandler} className={getCellClassName(el.id, el.isLabel)}>{el.value}</span>
    })
  }

  const calculateTotal = () => {
    return data.reduce((res, current) => {
      return res += parseInt(current.value)
    }, 0)
  }

  const calculateCurrent = () => {
    return selected.reduce((res, current) => {
      return res += parseInt(current.value)
    }, 0)
  }

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headingOne}>🤑 Money calendar 🤑</h1>
        <h2 className={styles.headingTwo}>{`Накоплено: ${calculateCurrent()} ₽ из ${calculateTotal()} ₽`}</h2>
      </header>
      <main className={styles.cells}>
        {/* { renderCells() } */}
        { JSON.stringify(selected) }
      </main>
    </>
  )
}
