import Index from './pages/Index'
import { QueryClientProvider, QueryClient } from'react-query';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Index/>
    </QueryClientProvider>
  );
}

export default App;
