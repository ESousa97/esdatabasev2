import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box, Button } from '@mui/material';
import { StyledCopyButton, ContentContainer, MarkdownStyles, MainContent, FixedFooter } from './ProcedureDetailsStyles';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (procedure) setLoading(false);
  }, [procedure]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [procedure]);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }, [procedure]);  

  const handleLoadVideo = (videoId) => setVideoLoaded(videoId);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado!'))
      .catch((error) => console.error('Erro ao copiar conteúdo:', error));
  };

  const renderVideo = (videoId) => (
    videoLoaded === videoId ? (
      <Box
        sx={{
          position: 'relative',
          height: isExpanded ? '85vh' : '30vh',
          transition: 'height 0.8s ease',
          boxShadow: '0 8px 8px rgba(0,0,0,0.1)',
          m: 1,
          borderRadius: '8px',
        }}
      >
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
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
            top: 8,
            right: 8,
            backgroundColor: '#f50057',
            color: '#fff',
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
            fontSize: '0.9rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Carregar Vídeo
        </Button>
      </Box>
    )
  );

  // Processa e sanitiza o conteúdo markdown
  const safeContent = procedure?.conteudo || '';
  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  const highlightedMarkdown = safeContent.replace(
    /:::(.+?):::/g,
    (_, content) => `<span class="highlight-text">${content.trim()}</span>`
  );

  const processedContent = marked.parse(highlightedMarkdown.replace(/\\n/g, '\n'));
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedContent;

  tempDiv.querySelectorAll('code').forEach((codeEl) => {
    const text = codeEl.textContent.trim();

    // Heurística simples: se contém espaços, parênteses, =, etc → é código real
    const isCode = /[=(){}[\];]/.test(text);

    if (isCode) {
      codeEl.classList.add('code-real');
    } else {
      codeEl.classList.add('code-inline-text');
    }
  });

  // Aqui modificamos todos os links automaticamente
  tempDiv.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  const children = Array.from(tempDiv.childNodes).map((node, index) => {
    const textContent = node.textContent || '';
    const videoRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const videoMatch = textContent.match(videoRegex);

    if (videoMatch) {
      return (
        <ContentContainer key={`video-${index}`}>
          {renderVideo(videoMatch[1])}
        </ContentContainer>
      );
    }

    if (textContent.includes('@@')) {
      const split = textContent.split(/@@(.*?)@@/);
      const processed = split.map((part, i) => {
        if (i % 2 === 0) {
          return part.trim() === '' ? null : (
            <span
              key={`text-${index}-${i}`}
              dangerouslySetInnerHTML={createMarkup(marked.parse(part))}
            />
          );
        }
        return (
          <StyledCopyButton key={`copy-${index}-${i}`} onClick={() => handleCopy(part)}>
            {part}
          </StyledCopyButton>
        );
      });
      return <ContentContainer key={`copy-wrap-${index}`}>{processed}</ContentContainer>;
    }

    if (node.nodeName.toLowerCase() === 'img') {
      return (
        <ContentContainer key={`img-${index}`} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
      );
    }

    return (
      <ContentContainer
        key={`html-${index}`}
        dangerouslySetInnerHTML={createMarkup(node.outerHTML)}
      />
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ToastContainer autoClose={5000} />
      {/* AQUI centralizamos tudo dentro do MainContent */}
      <MainContent>
        <h1>{procedure.titulo}</h1>
        <MarkdownStyles ref={contentRef}>{children}</MarkdownStyles>
      </MainContent>
      <FixedFooter>
        Desenvolvido por <strong style={{ marginLeft: 4 }}> José Enoque </strong> ✦ Powered by React & Next.js
      </FixedFooter>
    </>
  );
}

export default ProcedureDetails;
