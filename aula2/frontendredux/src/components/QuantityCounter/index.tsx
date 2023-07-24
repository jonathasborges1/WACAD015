import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

interface QuantityCounterProps {
   quantidadeInicial: number;
   quantidadeMaxima: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ quantidadeInicial, quantidadeMaxima }) => {
  const [quantidade, setQuantidade] = useState(quantidadeInicial);

  const handleAumentar = () => {
    setQuantidade((prevQuantidade) => prevQuantidade + 1);
  };

  const handleDiminuir = () => {
    if (quantidade > 0) {
      setQuantidade((prevQuantidade) => prevQuantidade - 1);
    }
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleDiminuir}>
          -
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body1">{quantidade}</Typography>
      </Grid>
      <Grid item>
         { quantidade < quantidadeMaxima ? 
            (
               <Button variant="contained" color="primary" onClick={handleAumentar}>
               +
             </Button>
            )
         :
            (<></>)
         }

      </Grid>
    </Grid>
  );
};

export default QuantityCounter;