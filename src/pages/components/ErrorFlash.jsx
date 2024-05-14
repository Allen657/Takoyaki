import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useCartContext } from '../CartProvider';

export default function ErrorFlash() {
  const {flash}=useCartContext()
  React.useEffect(()=>{
    if(flash.error){
      setTimeout(function() {
      flash.setError(false)
    }, 3000);
    }
  },[flash.error])
  return (
    <Box sx={{ width: '100%',position:'absolute', zIndex:'999',display:'flex',justifyContent:'center'}}>
      <Collapse in={flash.error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                flash.setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {flash.message}
        </Alert>
      </Collapse>
    </Box>
  );
}