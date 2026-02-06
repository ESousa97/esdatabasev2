// CategoryIconMapper.js
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';

// Ícones realistas das linguagens (via react-icons)
import { SiHtml5, SiCss3, SiJavascript, SiPython, SiJava } from 'react-icons/si';
import { Layers } from 'lucide-react';

// Mapa com categorias (normalizadas) → ícone
const iconMap = {
  html: SiHtml5,
  css: SiCss3,
  'html + css': SiHtml5,
  'html + typescript': SiHtml5,
  javascript: SiJavascript,
  python: SiPython,
  typescript: SiJavascript,
  java: SiJava,
};

const IconWrapper = styled('span')(() => ({
  display: 'inline-flex',
  flexShrink: 0,
  lineHeight: 0,
}));

// Componente para retornar o ícone da categoria, colorido com o tema primário
export function CategoryIcon({ category }) {
  const theme = useTheme();
  const normalized = category.toLowerCase();
  const Icon = iconMap[normalized] || Layers;

  return (
    <IconWrapper>
      <Icon size={18} color={theme.palette.primary.main} />
    </IconWrapper>
  );
}

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
};
