// CategoryIconMapper.js
import React from 'react';
import { useTheme } from '@mui/material/styles';

// Ícones realistas das linguagens (via react-icons/simple-icons)
import { SiHtml5, SiCss3, SiJavascript, SiPython } from 'react-icons/si';
import { Layers } from 'lucide-react';

// Mapa com categorias (normalizadas) → ícone
const iconMap = {
  'html': SiHtml5,
  'css': SiCss3,
  'html + css': SiHtml5, SiCss3,
  'html + typescript': SiHtml5, SiJavascript,
  'javascript': SiJavascript,
  'python': SiPython,
  'typescript': SiJavascript,
  'java': SiJavascript,
};

// Função para retornar o ícone da categoria, colorido com o tema primário
export function getCategoryIcon(category) {
  const theme = useTheme();
  const normalized = category.toLowerCase();
  const Icon = iconMap[normalized] || Layers;

  return (
    <Icon
      size={18}
      color={theme.palette.primary.main}
      style={{ flexShrink: 0 }}
    />
  );
}
