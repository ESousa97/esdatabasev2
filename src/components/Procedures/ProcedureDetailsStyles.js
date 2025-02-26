import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const commonButtonStyles = {
  borderRadius: '10px',
  padding: '5px 5px',
  margin: '3px',
  transition: 'background-color 0.3s, color 0.3s',
  textTransform: 'none',
};

const createButtonStyles = (backgroundColor, hoverBackgroundColor) => ({
  backgroundColor,
  color: '#fff',
  '&:hover': {
    backgroundColor: hoverBackgroundColor,
  },
});

export const StyledButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles('#007bff', '#0056b3'),
}));

export const StyledCopyButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles('#28a745', '#218838'),
}));

export const ImageContainer = styled('div')({
  margin: '16px 0',
});

export const ContentContainer = styled('div')({
  margin: '8px 0',
});
