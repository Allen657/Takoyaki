import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useCartContext } from '../CartProvider';

export default function TransitionAlerts() {
  const {flash}=useCartContext()
  React.useEffect(()=>{
    if(flash.success){
      setTimeout(function() {
      flash.setSuccess(false)
    }, 3000);
    }
  },[flash.success])
  return (
    <Box sx={{ width: '100%',position:'absolute', zIndex:'999',display:'flex',justifyContent:'center'}}>
      <Collapse in={flash.success}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                flash.setSuccess(false);
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