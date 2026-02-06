import StatusErrorPage from '../src/components/Common/StatusErrorPage';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import errorAnimation from '../src/animations/erro-503.json'; // Substitua se tiver uma animação específica

export default function Custom503() {
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro 503 - Serviço indisponível"
      description={
        <>
          Parece que os servidores tiraram uma pausa pro café ☕️.
          <br />
          Estamos acordando eles com carinho e logo tudo volta ao normal!
        </>
      }
      actionLabel="Tentar novamente"
      actionIcon={RestartAltIcon}
      onAction={() => window.location.reload()}
    />
  );
}

// Impede uso do layout padrão da aplicação
Custom503.getLayout = (page) => page;
