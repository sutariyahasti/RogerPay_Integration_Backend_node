const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_NXzv1Lax34llQA', // Replace with your actual API Key
    key_secret: 'ROtq6tE4yaw2RptFkmJQ3jHu', // Replace with your actual Secret Key
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;

    // Check if amount is provided and is a valid number
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount provided' });
    }

    const options = {
        amount: amount * 100, // Convert to paise
        currency: 'INR',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ order_id: order.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Order creation failed', details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
