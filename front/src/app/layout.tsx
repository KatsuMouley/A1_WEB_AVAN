'use client';

import "./styles/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {/* Barra de ferramentadas */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              AVA 1
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Conteúdo - Componentes criados por nós */}
        <Box component="main"
          sx={{ minHeight: "calc(100vh - 120px)", py: 4 }}>
          <Container>
            {children}
          </Container>
        </Box>
      </body>
    </html>
  );
}
