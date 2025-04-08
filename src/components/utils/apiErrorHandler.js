// utils/apiErrorHandler.js
export default function apiErrorHandler(res, error) {
    console.error("Erro na API:", error);
  
    res.status(500).json({
      message: "Ocorreu um erro inesperado no servidor.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
  