import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box, Button } from '@mui/material';
import { StyledButton, StyledCopyButton, ImageContainer, ContentContainer } from './ProcedureDetailsStyles';

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoadVideo = (videoId) => {
    setVideoLoaded(videoId);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (procedure) {
      setLoading(false);
    }
  }, [procedure]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  const renderVideo = (videoId) => (
    videoLoaded === videoId ? (
      <div
        style={{
          position: 'relative',
          height: isExpanded ? '85vh' : '30vh',
          transition: 'height 0.8s ease',
          boxShadow: '0 10px 10px rgba(0,0,0,0.1)',
          margin: '10px',
          borderRadius: '10px',
        }}
      >
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '10px',
          }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <Button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#f50057',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            textTransform: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          variant="contained"
          onClick={toggleExpand}
        >
          {isExpanded ? 'Minimizar' : 'Expandir'}
        </Button>
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          height: '4vh',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => handleLoadVideo(videoId)}
          style={{
            padding: '5px 10px',
            fontSize: '16px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          Carregar Vídeo
        </Button>
      </div>
    )
  );

  const createMarkup = (html) => {
    let modifiedHtml = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>')
      .replace(/<table>/g, '<table class="table">')
      .replace(/<thead>/g, '<thead class="thead">')
      .replace(/<tr>/g, '<tr class="tr">')
      .replace(/<th>/g, '<th class="th">')
      .replace(/<td>/g, '<td class="td">');

    return { __html: DOMPurify.sanitize(modifiedHtml) };
  };

  const getImagePath = (imageFileName) => {
    const [folder] = imageFileName.split('__');
    return `/Assets/${folder}/${imageFileName}`;
  };

  // Aqui convertemos "\n" literais em quebras de linha reais antes do split.
  const processedContent = procedure?.conteudo
    .replace(/\\n/g, '\n') // <- Converte "\n" literal para uma quebra de linha real
    .split('\n')
    .map((part, index) => {
      // Handle video URLs
      const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const videoMatch = part.match(videoRegex);
      if (videoMatch) {
        return <ContentContainer key={index}>{renderVideo(videoMatch[1])}</ContentContainer>;
      }

      // Handle content marked for copy
      if (part.includes('@@')) {
        const splitContent = part.split(/@@(.*?)@@/);
        const processedSplitContent = splitContent.map((content, subIndex) => {
          if (subIndex % 2 === 0) {
            return content.trim() === '' ? null : (
              <span
                key={`text-${index}-${subIndex}`}
                dangerouslySetInnerHTML={createMarkup(content)}
              />
            );
          } else {
            return (
              <StyledCopyButton
                key={`copy-${index}-${subIndex}`}
                onClick={() => handleCopy(content)}
              >
                {content}
              </StyledCopyButton>
            );
          }
        });
        return <ContentContainer key={index}>{processedSplitContent}</ContentContainer>;
      }

      // Handle images
      const imageMatch = part.match(/(IMC\d+__\d+\.png)/i);
      if (imageMatch) {
        const imagePath = getImagePath(imageMatch[0]);
        return (
          <ImageContainer key={index}>
            <img
              src={imagePath}
              alt={`Imagem ${imageMatch[0]}`}
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </ImageContainer>
        );
      }

      // Handle links
      const linkMatch = part.match(/\[([^\]]+)\]\((http[^)]+)\)/);
      if (linkMatch) {
        const [, linkText, linkUrl] = linkMatch;
        return (
          <ContentContainer key={index}>
            <StyledButton href={linkUrl} target="_blank">
              {linkText}
            </StyledButton>
          </ContentContainer>
        );
      }

      // Handle general text content
      return (
        <ContentContainer key={index} dangerouslySetInnerHTML={createMarkup(part)} />
      );
    });

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <ToastContainer autoClose={5000} />
      <h1>{procedure.titulo}</h1>
      {processedContent}
    </div>
  );
}

export default ProcedureDetails;
