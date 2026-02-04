import StatusErrorPage from '../src/components/Common/StatusErrorPage';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/router';
// Pode substituir esse JSON por um específico de 401 se desejar
import errorAnimation from '../src/animations/erro-404.json';

export default function Custom401() {
  const router = useRouter();
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro 401 - Não autorizado"
      description="Você não tem permissão para acessar esta página. Faça login com uma conta válida para continuar."
      actionLabel="Fazer login"
      actionIcon={LoginIcon}
      onAction={() => router.push('/login')}
    />
  );
}
