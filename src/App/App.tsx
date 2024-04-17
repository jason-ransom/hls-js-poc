import './App.css';
import MainContent from './MainContent.tsx';
import HlsContainer from '../components/HlsContainer/HlsContainer.tsx';

function App() {
  return (
    <HlsContainer>
      <MainContent />
    </HlsContainer>
  );
}

export default App;
