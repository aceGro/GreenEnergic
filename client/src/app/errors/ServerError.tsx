import { Button, Divider, Paper, Typography, Container } from "@mui/material";
import {  Link, useLocation} from "react-router-dom";

export default function ServerError() {
  //const history = useHistory();
  const { state } = useLocation();
  //const { state } = useParams();
//   console.log(state)
  return (
    <Container component={Paper}>
       {state && state.error ? (
        <>
          <Typography variant="h3" color='error' gutterBottom>{state.error.title}</Typography>
          <Divider />
          <Typography>{state.console.error.detail || "Internal server error"}</Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>Server error</Typography>
      )}
      <Button fullWidth component={Link} to='/catalog'>Go back to shop</Button>
    </Container>
  );
}
