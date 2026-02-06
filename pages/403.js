import StatusErrorPage from '../src/components/Common/StatusErrorPage';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
// Substitua este caminho se for usar uma animação .json diferente para 403
import errorAnimation from '../src/animations/erro-403.json';

export default function Custom403() {
  const router = useRouter();
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro 403 - Acesso negado"
      description={
        'Você está autenticado, mas não possui permissão para acessar este recurso. Fale com o administrador do sistema para solicitar acesso.'
      }
      actionLabel="Voltar ao início"
      actionIcon={HomeIcon}
      onAction={() => router.push('/')}
    />
  );
}
