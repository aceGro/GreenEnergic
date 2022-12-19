import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'text.secondary'}
                }}
            />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          {/* <Typography gutterBottom color="text.secondary" variant="h6">
            {product.name}
          </Typography> */}
          <Typography gutterBottom color="text.secondary" variant="h6">
            {(product.price/ 100).toFixed(2)} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to  cart</Button>
          <Button size="small">Find out more</Button>
        </CardActions>
      </Card>
    )
}