'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

type Comentario = {
  comentarioId: number;
  texto: string;
  itemId: number;
  usuarioEmail: string;
  data: string;
};

export default function ComentariosPage() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5003/api/comentarios/listar', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setComentarios(data))
      .catch(err => console.error('Erro ao buscar comentários', err));
  }, []);

  const deletarComentario = async (comentarioId: number) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5003/api/comentarios/delete/${comentarioId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setComentarios(prev => prev.filter(c => c.comentarioId !== comentarioId));
      alert(`Comentário ${comentarioId} deletado`);
    } else {
      alert('Erro');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Comentários</Typography>
      {comentarios.map((comentario) => (
        <Card key={comentario.comentarioId} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="body1">{comentario.texto}</Typography>
            <Typography variant="caption">
              ID: {comentario.comentarioId} | Item: {comentario.itemId} | Autor: {comentario.usuarioEmail}
            </Typography>
            <br />
            <Button
              sx={{ mt: 1 }}
              color="error"
              variant="outlined"
              onClick={() => deletarComentario(comentario.comentarioId)}
            >
              Deletar
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
