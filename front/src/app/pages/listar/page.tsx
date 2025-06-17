'use client';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/navigation';
import { Box, Typography, Card, CardContent } from '@mui/material';

type Item = {
  itemId: number;
  nome: string;
  categoria: { nome: string };
};

export default function HomePage() {
  const [itens, setItens] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get('/item/listar')
      .then(res => setItens(res.data))
      .catch(() => router.push('/login'));
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Itens</Typography>
      {itens.map(item => (
        <Card key={item.itemId} sx={{ mt: 2 }} onClick={() => router.push(`/pages/items/${item.itemId}`)}>
          <CardContent>
          <Typography variant="h6">{item.nome}</Typography>
          <Typography variant="h6">id: {item.itemId}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
