import './App.css';
import Navigation from './components/Navigation';
import Container from './components/Container';
import MainRoutes from './components/MainRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Container>
        <Navigation />
        <MainRoutes />
      </Container>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
}
export default App;
