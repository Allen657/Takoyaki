import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useCartContext } from '../CartProvider';
export default function OrderCardComplete({ order }) {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const total = order.orders.reduce((total, ordr) => total + (ordr.product.price * ordr.quantity), 0)
        console.log(total)
        setTotalPrice(total)
    }, [order])
    
    return (
        <Card variant="outlined" sx={{
            width: '45%', '@media (width<= 800px)': {
                width: '80%', // Adjust width for smaller screens
            }
        }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        <b>Order Ref No:</b> <p style={{ fontSize: '1rem', display: 'inline' }}>{order._id}</p>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        ₱{totalPrice}
                    </Typography>
                </Stack>
                <Typography color="text.primary" variant="body1">
                    Orders:
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ display: 'flex' }}>
                    {order.orders.map((ordr) => { return `${ordr.quantity} ${ordr.product.name}, ` })}
                </Typography>


            </Box>
            <Divider />
            {/* <Box sx={{ p: 2 }}>
                        <Typography gutterBottom variant="body2">
                            Select type
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip color="primary" label="Soft" size="small" />
                            <Chip label="Medium" size="small" />
                            <Chip label="Hard" size="small" />
                        </Stack>
                    </Box> */}
        </Card>
    )
}