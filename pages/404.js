import StatusErrorPage from '../src/components/Common/StatusErrorPage';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import errorAnimation from '../src/animations/erro-404.json';

export default function Custom404() {
  const router = useRouter();
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro 404 - Página não encontrada"
      description={
        <>
          Você parece ter descoberto um universo alternativo 👽<br />
          Mas não se preocupe, te levamos de volta rapidinho!
        </>
      }
      actionLabel="Voltar ao início"
      actionIcon={HomeIcon}
      onAction={() => router.push('/components')}
    />
  );
}

Custom404.getLayout = (page) => page;
