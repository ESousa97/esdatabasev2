// src/components/Procedures/ProcedureDetails.js
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

  useEffect(() => {
    if (procedure) setLoading(false);
  }, [procedure]);

  const handleLoadVideo = (videoId) => setVideoLoaded(videoId);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  const renderVideo = (videoId) => (
    videoLoaded === videoId ? (
      <Box
        sx={{
          position: 'relative',
          height: isExpanded ? '85vh' : '30vh',
          transition: 'height 0.8s ease',
          boxShadow: '0 10px 10px rgba(0,0,0,0.1)',
          m: 1,
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
          variant="contained"
          onClick={toggleExpand}
          sx={{
            position: 'absolute',
            top: 1,
            right: 1,
            backgroundColor: '#f50057',
            color: 'white',
            px: 1.5,
            borderRadius: '4px',
            textTransform: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            '&:hover': { backgroundColor: '#c51162' },
          }}
        >
          {isExpanded ? 'Minimizar' : 'Expandir'}
        </Button>
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '4vh' }}>
        <Button
          variant="outlined"
          onClick={() => handleLoadVideo(videoId)}
          sx={{
            px: 1,
            fontSize: '16px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          Carregar Vídeo
        </Button>
      </Box>
    )
  );

  // Use um valor padrão vazio caso procedure.conteudo não exista
  const safeContent = procedure?.conteudo || '';

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'p', 'strong', 'span', 'em', 'u', 'del',
          'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'ul', 'ol', 'li', 'br', 'a'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'style'],
      }),
    };
  };


  const getImagePath = (imageFileName) => `/assets/${imageFileName}`;

  const processedContent = safeContent
    .replace(/\\n/g, '\n')
    .split('\n')
    .map((part, index) => {
      if (!part.trim()) return null;

      // Vídeo do YouTube
      const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const videoMatch = part.match(videoRegex);
      if (videoMatch) {
        return <ContentContainer key={index}>{renderVideo(videoMatch[1])}</ContentContainer>;
      }

      // Conteúdo para copiar
      if (part.includes('@@')) {
        const splitContent = part.split(/@@(.*?)@@/);
        const processedSplit = splitContent.map((content, subIndex) => {
          if (subIndex % 2 === 0) {
            return content.trim() === '' ? null : (
              <span key={`text-${index}-${subIndex}`} dangerouslySetInnerHTML={createMarkup(content)} />
            );
          }
          return (
            <StyledCopyButton key={`copy-${index}-${subIndex}`} onClick={() => handleCopy(content)}>
              {content}
            </StyledCopyButton>
          );
        });
        return <ContentContainer key={index}>{processedSplit}</ContentContainer>;
      }

      // Imagem
      const imageMatch = part.match(/(projects\d+\/projects\d+__\d+\.png)/i);
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

      // Link
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

      // Renderiza qualquer outro HTML
      return <ContentContainer key={index} dangerouslySetInnerHTML={createMarkup(part)} />;
    });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
