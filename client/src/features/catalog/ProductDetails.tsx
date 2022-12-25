import { Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingCompontnent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
  const {id} = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)
  //const [error, setError] = useState(false);

  useEffect(() => {
    const _id = id || '';
    agent.Catalog.details(parseInt(_id))
        .then(response => setProducts(response))
        // .catch(() => setError(true))     == ==  cG
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
  },[id]);

  if (loading) return <LoadingCompontnent message="Loading product..." />

  //if (error) return <h3>An error occurred while loading the product</h3>

  if (!product) return <NotFound />

  return ( 
    <Grid container spacing={6} >
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
        </Grid>
        <Grid item xs={6} >
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb: 2}} />
            <Typography variant="h4" color='#707270'>{(product.price / 100).toFixed(2)} eur</Typography>
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
        </Grid>
    </Grid>
    )
}
