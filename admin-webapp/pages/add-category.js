import Input from "../components/input";
import { Box, Button, Paper } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImgDialog from "../components/imgDialog";


const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem",
};
const button = <Button variant="contained" style={{width: '10%', marginLeft: '5%', borderRadius: '6px'}} endIcon={<AddBoxIcon />}>Create</Button>

export default function AddCategory() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <form style={{ height: "100%", padding: '2%' }}>
        <Box
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Input label="Name" placeHolder="Input text" button={button} />
          <ImgDialog />
        </Box>
      </form>
    </Paper>
  );
}
