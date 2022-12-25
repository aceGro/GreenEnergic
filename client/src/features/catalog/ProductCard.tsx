import {  createTheme, ThemeProvider } from "@mui/material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

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
          {(product.price / 100).toFixed(2)} $
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
        <Button variant="contained" size="large" >
          Add to cart
        </Button>{" "}
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
