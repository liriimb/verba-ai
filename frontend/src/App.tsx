import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [phase, setPhase] = useState<'show' | 'hide' | 'done'>('show');

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('hide'), 900);
    const t2 = window.setTimeout(() => setPhase('done'), 1250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      {phase !== 'done' ? <SplashScreen leaving={phase === 'hide'} /> : <ChatWindow />}
    </>
  );
}
