import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box, Button } from '@mui/material';
import { StyledButton, StyledCopyButton, ImageContainer, ContentContainer, MarkdownStyles, StyledImage } from './ProcedureDetailsStyles';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const contentRef = useRef(null);

  // Define loading como false assim que a procedure estiver disponível
  useEffect(() => {
    if (procedure) setLoading(false);
  }, [procedure]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
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

  const safeContent = procedure?.conteudo || '';

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'p', 'strong', 'span', 'em', 'u', 'del',
          'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'ul', 'ol', 'li', 'br', 'a', 'img',
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'style'],
      }),
    };
  };

  const getImagePath = (imageFileName) => `/assets/${imageFileName}`;

  const processedContent = marked.parse(safeContent.replace(/\\n/g, '\n'));
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedContent;

  const children = Array.from(tempDiv.childNodes).map((node, index) => {
    const textContent = node.textContent || '';

    const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const videoMatch = textContent.match(videoRegex);
    if (videoMatch) {
      return <ContentContainer key={`video-${index}`}>{renderVideo(videoMatch[1])}</ContentContainer>;
    }

    if (textContent.includes('@@')) {
      const split = textContent.split(/@@(.*?)@@/);
      const processed = split.map((part, i) => {
        if (i % 2 === 0) {
          return part.trim() === '' ? null : <span key={`text-${index}-${i}`} dangerouslySetInnerHTML={createMarkup(marked.parse(part))} />;
        }
        return (
          <StyledCopyButton key={`copy-${index}-${i}`} onClick={() => handleCopy(part)}>
            {part}
          </StyledCopyButton>
        );
      });
      return <ContentContainer key={`copy-wrap-${index}`}>{processed}</ContentContainer>;
    }

    const imageMatch = textContent.match(/(projects\d+\/projects\d+__\d+\.png)/i);
    if (imageMatch) {
      const imagePath = getImagePath(imageMatch[0]);
      return (
        <ImageContainer key={`img-${index}`}>
          <StyledImage
            src={imagePath}
            alt={`Imagem ${imageMatch[0]}`}
          />
        </ImageContainer>
      );
    }

    return <ContentContainer key={`html-${index}`} dangerouslySetInnerHTML={createMarkup(node.outerHTML)} />;
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
      <MarkdownStyles ref={contentRef}>{children}</MarkdownStyles>
    </div>
  );
}

export default ProcedureDetails;
