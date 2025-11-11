import { TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: grey,
  },
  shape: {
    borderRadius: 10,
  },
});

const CustomizedTextField = (props) => {
  let { ...rest } = props;
  rest = rest.InputProps ? rest : { ...rest, InputProps: {} };
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...rest}
        variant="outlined"
        slotProps={{
          input: {
            ...rest.InputProps,
          },
          htmlInput: {
            maxLength: rest.maxLength
          }
        }}
      />
    </ThemeProvider>
  );
};

export default CustomizedTextField;

