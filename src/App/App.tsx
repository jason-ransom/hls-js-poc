import './App.css';
import MainContent from './MainContent.tsx';
import HlsContext from '../contexts/HlsContext';

function App() {
  return (
    <HlsContext>
      <MainContent />
    </HlsContext>
  );
}

export default App;
