
import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000,
  className = ""
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText.length === word.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`${className} border-r-2 border-brand-blue pr-1 animate-pulse-fast`}>
      {currentText}
    </span>
  );
};

export default TypingAnimation;
