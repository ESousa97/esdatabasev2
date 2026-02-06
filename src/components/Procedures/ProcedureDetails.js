import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import {
  StyledCopyButton,
  ContentContainer,
  MarkdownStyles,
  MainContent,
  FixedFooter,
  FooterAuthor,
  VideoContainer,
  VideoFrame,
  VideoActionButton,
  VideoLoadContainer,
  VideoLoadButton,
} from './ProcedureDetailsStyles';
import { FullPageLoadingContainer } from '../Common/LoadingState';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function ProcedureDetails({ procedure }) {
  const loading = !procedure;
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

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
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Conteúdo copiado!'))
      .catch((error) => console.error('Erro ao copiar conteúdo:', error));
  };

  const renderVideo = (videoId) =>
    videoLoaded === videoId ? (
      <VideoContainer isExpanded={isExpanded}>
        <VideoFrame
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <VideoActionButton variant="contained" onClick={toggleExpand}>
          {isExpanded ? 'Minimizar' : 'Expandir'}
        </VideoActionButton>
      </VideoContainer>
    ) : (
      <VideoLoadContainer>
        <VideoLoadButton variant="outlined" onClick={() => handleLoadVideo(videoId)}>
          Carregar Vídeo
        </VideoLoadButton>
      </VideoLoadContainer>
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
        <ContentContainer key={`video-${index}`}>{renderVideo(videoMatch[1])}</ContentContainer>
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
        <ContentContainer
          key={`img-${index}`}
          dangerouslySetInnerHTML={{ __html: node.outerHTML }}
        />
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
      <FullPageLoadingContainer>
        <CircularProgress />
      </FullPageLoadingContainer>
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
        Desenvolvido por <FooterAuthor>José Enoque</FooterAuthor> ✦ Powered by React & Next.js
      </FixedFooter>
    </>
  );
}

ProcedureDetails.propTypes = {
  procedure: PropTypes.shape({
    titulo: PropTypes.string,
    conteudo: PropTypes.string,
  }),
};

export default ProcedureDetails;
