import {useState, useEffect, useCallback} from 'react';
import type {ReactNode} from 'react';

export default function Lightbox(): ReactNode {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const close = useCallback(() => {
    setSrc('');
    setAlt('');
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('.changelog-hero a');
      if (!link) return;
      e.preventDefault();
      const img = link.querySelector('img');
      setSrc(link.getAttribute('href') || '');
      setAlt(img?.alt || '');
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [close]);

  if (!src) return null;

  return (
    <div className="changelog-lightbox active" onClick={close}>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
