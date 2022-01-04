import { useEffect, useState } from 'react';
import styles from '../styles/index.module.css';
import { v4 as uuidv4 } from 'uuid';

import data from '../utils/data';

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
    return selected.reduce((res, current) => {
      return res += parseInt(current.value)
    }, 0)
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headingOne}>Jane&rsquo;s calendar 🤑</h1>
        <h2 className={styles.headingTwo}>{`Накоплено всего: ${calculateTotal()} ₽`}</h2>
      </header>
      <main className={styles.cells}>
        { renderCells() }
      </main>
    </>
  )
}
