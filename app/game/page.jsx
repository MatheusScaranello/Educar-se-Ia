"use client"
import React, { useState, useEffect, useRef } from "react";
import styles from "./game.module.css";

const Game = () => {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [info, setInfo] = useState([
    { text: "A IA pode melhorar a eficiência, reduzir custos, aumentar a precisão e personalizar experiências.", correct: true },
    { text: "A IA pode levar à perda de empregos devido à automação de tarefas e tomada de decisões.", correct: false },
    { text: "A IA possui a capacidade de funcionar de maneira ininterrupta e realizar tarefas repetitivas.", correct: true },
    { text: "A automação de tarefas e da tomada de decisões pela IA tende a ocasionar desemprego estrutural.", correct: false },
    { text: "A IA pode resultar em melhorias no processo de compra e venda online.", correct: true },
    { text: "A IA tem avanços ilimitados mesmo com maior acúmulo de experiência.", correct: false },
    { text: "A IA apresenta um elevado custo de desenvolvimento e implementação, sendo um recurso restrito.", correct: true },
    { text: "A IA pode criar vieses algorítmicos devido à maneira como os dados são coletados e analisados.", correct: true },
    { text: "A IA pode levantar questões éticas devido ao seu uso e impacto na sociedade.", correct: true },
    { text: "O deep learning utiliza redes neurais para emular o cérebro humano.", correct: false },
    { text: "A IA tem sido criticada por seu potencial de substituir empregos tradicionais por automação.", correct: true },
    { text: "A IA pode ser utilizada para personalizar recomendações de produtos com base no histórico de compras de um usuário.", correct: true },
    { text: "O machine learning é um processo automatizado de reconhecimento e reprodução de padrões pela IA.", correct: true },
    { text: "A IA utiliza algoritmos pré-programados para tomar decisões e realizar tarefas de maneira autônoma.", correct: true },
    { text: "A IA pode melhorar a segurança cibernética ao identificar padrões de comportamento suspeito na rede.", correct: true },
    { text: "A IA pode ser implementada em sistemas de saúde para análise de grandes volumes de dados médicos.", correct: true },
    { text: "A inteligência artificial funciona através da coleta e combinação de um grande volume de dados para identificar padrões.", correct: true },
    { text: "O reconhecimento facial é uma aplicação de IA que se utiliza de algoritmos para identificar rostos.", correct: true },
    { text: "Redes sociais são exemplos de plataformas que utilizam inteligência artificial para análise de dados e personalização de conteúdo.", correct: true },
    { text: "A IA pode contribuir para a previsão de tendências de mercado com base em dados históricos e comportamentais.", correct: true },
    { text: "A IA pode criar vieses éticos devido à maneira como os algoritmos são programados.", correct: false }
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [hints, setHints] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");
  const [selectedStatement, setSelectedStatement] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    // Check for game over or victory conditions
    if (health <= 0) {
      setGameOver(true);
      setVictory(false);
      setBackgroundColor("#ff4c4c");
    }
    if (info.length === 0) {
      setGameOver(true);
      setVictory(true);
      setBackgroundColor("#4cff4c");
    }
  }, [health, info]);

  useEffect(() => {
    // Adjust health based on difficulty
    if (difficulty === 2) {
      setHealth(50);
    } else if (difficulty === 3) {
      setHealth(25);
    }
  }, [difficulty]);

  useEffect(() => {
    // Start or stop timer based on game state
    if (gameOver) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
  }, [gameOver, info]);

  useEffect(() => {
    // Set selected statement when info changes
    setSelectedStatement(info[0]);
  }, [info]);

  const startTimer = () => {
    setTimeLeft(10);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleTimeout();
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    setHealth((prevHealth) => prevHealth - 10);
    // Substituir por um alerta ou som no navegador
  };

  const handleAnswer = (isCorrect) => {
    if (!gameOver) {
      clearInterval(timerRef.current);
      if (isCorrect === selectedStatement.correct) {
        setScore((prevScore) => prevScore + 10);
        setBackgroundColor("#4cff4c");
      } else {
        setHealth((prevHealth) => prevHealth - 20);
        setBackgroundColor("#ff4c4c");
      }
      setInfo((prevInfo) => prevInfo.filter((item) => item !== selectedStatement));
      startTimer();
    }
  };

  const handleRestart = () => {
    setScore(0);
    setHealth(100);
    setInfo([...info]);
    setGameOver(false);
    setVictory(false);
    setBackgroundColor("#f0f0f0");
  };

  const handleDifficultyChange = () => {
    const newDifficulty = difficulty === 3 ? 1 : difficulty + 1;
    setDifficulty(newDifficulty);
  };

  const renderButtons = () => {
    return (
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => handleAnswer(true)}
          disabled={gameOver}
        >
          Verdadeiro
        </button>
        <button
          className={styles.button}
          onClick={() => handleAnswer(false)}
          disabled={gameOver}
        >
          Falso
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <h1 className={styles.score}>Pontuação: {score}</h1>
      <h1 className={styles.health}>Saúde: {health}%</h1>
      <h1 className={styles.timer}>Tempo: {timeLeft}s</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleDifficultyChange}>Dificuldade</button>
        <h2 className={styles.difficultyText}>
          {difficulty === 1 ? "Fácil" : difficulty === 2 ? "Médio" : "Difícil"}
        </h2>
      </div>
      {renderButtons()}
      {gameOver ? (
        <div className={styles.gameOverContainer}>
          <h1 className={styles.gameOverText}>
            {victory ? "Parabéns! Você ganhou!" : "Você perdeu. Tente novamente!"}
          </h1>
          <button onClick={handleRestart}>Reiniciar</button>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <h1 className={styles.infoText}>{selectedStatement.text}</h1>
        </div>
      )}
    </div>
  );
};

export default Game;