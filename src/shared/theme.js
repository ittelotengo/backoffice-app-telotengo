import { createTheme } from '@mui/material/styles';

// Tema claro
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#5528E3", // Color primario en modo claro
    },
    background: {
      default: '#ffffff', // Fondo en modo claro
    },
    // Agregar más colores según sea necesario
  },
  // Otras personalizaciones de estilos para el modo claro
});

// Tema oscuro
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#5528E3", // Color primario en modo oscuro
    },
    background: {
      default: '#121212', // Fondo en modo oscuro
    },
    // Agregar más colores según sea necesario
  },
  // Otras personalizaciones de estilos para el modo oscuro
});