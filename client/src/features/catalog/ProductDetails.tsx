import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingCompontnent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    const _id = id || "";
    agent.Catalog.details(parseInt(_id))
      .then((response) => setProducts(response))
      // .catch(() => setError(true))     == ==  cG
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
        setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
        const updateQuantity = item ? quantity - item.quantity : quantity;
        agent.Basket.addItem(product?.id!, updateQuantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setSubmitting(false))
    } else {
        const updatedQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product?.id!, updatedQuantity)
            .then(() => removeItem(product?.id!, updatedQuantity))
            .catch(error => console.log(error))
            .finally(() => setSubmitting(false))
    }
  }

  if (loading) return <LoadingCompontnent message="Loading product..." />;

  //if (error) return <h3>An error occurred while loading the product</h3>

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="#707270">
          {(product.price / 100).toFixed(2)} eur
        </Typography>
        <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{product.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity in stock</TableCell>
              <TableCell>{product.quantityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    onChange={handleInputChange}
                    variant="outlined"
                    type='number'
                    label='Quantity in Cart'
                    fullWidth
                    value={quantity}
                />
            </Grid>
            <Grid item xs={6}>
                <LoadingButton
                    disabled={item?.quantity === quantity || !item && quantity === 0}
                    loading={submitting}
                    onClick={handleUpdateCart}
                    sx={{height: '55px', backgroundColor: '#77BB00'}}
                    //color='primary'
                    size='large'
                    variant='contained'
                    fullWidth
                >
                    {item ? 'Update Quantity' : 'Add to Cart'}
                </LoadingButton>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
