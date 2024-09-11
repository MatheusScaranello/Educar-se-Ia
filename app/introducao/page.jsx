import React from "react";
import styles from "./introducao.module.css";
import Link from "next/link";

const IntroAI = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bem-vindo ao Mundo da Inteligência Artificial</h1>
        <p className={styles.subtitle}>
          Descubra como a IA está transformando nosso cotidiano e alterando a forma como interagimos com o mundo.
        </p>
      </header>
      <section className={styles.content}>
        <article className={styles.article}>
          <h2 className={styles.articleTitle}>O que é Inteligência Artificial?</h2>
          <p className={styles.articleText}>
            A Inteligência Artificial (IA) refere-se a sistemas ou máquinas que imitam a inteligência humana para realizar tarefas e podem se aprimorar iterativamente com base nas informações que coletam.
          </p>
        </article>
        <article className={styles.article}>
          <h2 className={styles.articleTitle}>Aplicações da IA</h2>
          <ul className={styles.articleList}>
            <li>Automação de Processos</li>
            <li>Análise de Dados</li>
            <li>Assistentes Virtuais</li>
            <li>Reconhecimento de Imagens e Voz</li>
            <li>Previsão de Tendências</li>
          </ul>
        </article>
        <article className={styles.article}>
          <h2 className={styles.articleTitle}>Desafios e Considerações Éticas</h2>
          <p className={styles.articleText}>
            Enquanto a IA oferece oportunidades incríveis, também levanta questões éticas sobre privacidade, viés, e a substituição de empregos humanos.
          </p>
        </article>
      </section>
      <Link href="/game">
        <button className={styles.button}>Teste Seus Conhecimentos</button>
      </Link>
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2023 Mundo da IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default IntroAI;