import styles from '../styles/index.module.css';

export default function Home() {

  const renderCells = () => {
    return Array.from(Array(52).keys()).slice(1).map(i => {
      return(
        <>
          <span className={styles.label}>{i}</span>
          <span className={styles.cell}>{i * 5}</span>
          <span className={styles.cell}>{i * 10}</span>
          <span className={styles.cell}>{i * 15}</span>
          <span className={styles.cell}>{i * 20}</span>
          <span className={styles.cell}>{i * 25}</span>
          <span className={[styles.cell, styles.cellSelected]}>{i * 30}</span>
        </>
      )
    })
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headingOne}>Jane&rsquo;s calendar 🤑</h1>
        <h2 className={styles.headingTwo}>Накоплено всего: 5000 ₽</h2>
      </header>
      <main className={styles.cells}>
        { renderCells() }
      </main>
    </>
  )
}
