import {  createTheme, ThemeProvider } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#88CC00',
      dark: '#77BB00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#424242',
      dark: '#ba000d',
      contrastText: '#FFFFFF',
    },
  },
});

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{
    p: 2,
    bg: "white",
    boxShadow: "none",
    ":hover": {
      boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.2)",
    },
  }}>
      {/* <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "text.secondary" },
        }}
      /> */}
      <CardMedia
        sx={{ height: 300, backgroundSize: "contain" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        {/* <Typography gutterBottom color="text.secondary" variant="h6">
            {product.name}
          </Typography> */}
        <Typography gutterBottom color="text.secondary" variant="h6" sx={{textAlign:'center'}}>
          {currencyFormat(product.price)} 
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10%",
        }}
      >
        <LoadingButton
            loading={loading} 
            onClick={() => handleAddItem(product.id)} 
            variant="contained" 
            size="large" >Add to cart</LoadingButton>
        <br />
        <Button
          variant="outlined"
          component={Link}
          to={`/catalog/${product.id}`}
          size="medium"
          color="secondary"
        >
          Find out more
        </Button>
      </CardActions>
    </Card>
    </ThemeProvider>
  );
}
