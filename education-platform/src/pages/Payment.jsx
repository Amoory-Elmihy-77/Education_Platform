import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { courses } from '../data/mockData';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
// In a real app, this would be an environment variable
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Checkout form component that uses Stripe Elements
function CheckoutForm({ course, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser, enrollInCourse } = useAuth();
  const navigate = useNavigate();
  
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: currentUser?.email || '',
    name: currentUser?.name || '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!cardComplete) {
      setError('Please complete your card details');
      return;
    }

    if (!currentUser) {
      navigate('/login?redirect=/payment/' + course.id);
      return;
    }

    setProcessing(true);

    // In a real implementation, you would create a payment intent on your server
    // and confirm the payment here with the client secret
    
    // For this mock implementation, we'll simulate a successful payment
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enroll the user in the course
      const result = enrollInCourse(course.id);
      
      if (result.success) {
        // Call the success callback
        onPaymentSuccess();
      } else {
        setError(result.error || 'Failed to enroll in course');
        setProcessing(false);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          Billing Information
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={billingDetails.name}
              onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              sx={{ mb: { xs: 0.5, sm: 1 } }}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={billingDetails.email}
              onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              sx={{ mb: { xs: 0.5, sm: 1 } }}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={billingDetails.address.line1}
              onChange={(e) => setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, line1: e.target.value }
              })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              sx={{ mb: { xs: 0.5, sm: 1 } }}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              value={billingDetails.address.city}
              onChange={(e) => setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, city: e.target.value }
              })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              value={billingDetails.address.state}
              onChange={(e) => setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, state: e.target.value }
              })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ZIP Code"
              value={billingDetails.address.postal_code}
              onChange={(e) => setBillingDetails({
                ...billingDetails,
                address: { ...billingDetails.address, postal_code: e.target.value }
              })}
              fullWidth
              required
              size={window.innerWidth < 600 ? "small" : "medium"}
              InputLabelProps={{ 
                sx: { fontSize: { xs: '0.9rem', sm: '1rem' } } 
              }}
              InputProps={{ 
                sx: { borderRadius: { xs: 1, sm: 1.5 } } 
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: { xs: 2.5, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 600
          }}
        >
          Payment Information
        </Typography>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: { xs: 1, sm: 1.5 },
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
            '& .StripeElement': {
              width: '100%',
              padding: { xs: '8px 12px', sm: '10px 14px' },
            },
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.1)',
            },
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: window.innerWidth < 600 ? '14px' : '16px',
                  color: '#424770',
                  fontFamily: 'Arial, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                  iconColor: '#6772e5',
                },
                invalid: {
                  color: '#e53935',
                  iconColor: '#e53935'
                },
              },
            }}
            onChange={(e) => setCardComplete(e.complete)}
          />
        </Box>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            '& .MuiAlert-icon': {
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }
          }}
        >
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size={window.innerWidth < 600 ? "medium" : "large"}
        fullWidth
        disabled={processing || !stripe}
        sx={{ 
          py: { xs: 1.25, sm: 1.5 },
          mt: { xs: 1, sm: 2 },
          borderRadius: { xs: 1, sm: 1.5 },
          fontWeight: 600,
          fontSize: { xs: '0.95rem', sm: '1rem' },
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }
        }}
      >
        {processing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={window.innerWidth < 600 ? 20 : 24} sx={{ mr: 1 }} />
            <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              Processing...
            </Typography>
          </Box>
        ) : (
          `Pay $${course.price}`
        )}
      </Button>
    </form>
  );
}

export default function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    setCourse(foundCourse);
  }, [courseId]);

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setShowSuccessMessage(true);
    
    // Redirect to course after a short delay
    setTimeout(() => {
      navigate(`/learning/${courseId}`);
    }, 3000);
  };

  if (!course) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: { xs: 3, sm: 4 }, 
          textAlign: 'center', 
          fontWeight: 'bold',
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } 
        }}
      >
        Complete Your Purchase
      </Typography>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Payment successful! You are now enrolled in {course.title}. Redirecting to course...
        </Alert>
      </Snackbar>

      <Grid container spacing={{ xs: 3, sm: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: { xs: 2.5, sm: 3, md: 4 },
              borderRadius: { xs: 1, sm: 2 },
              boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.1)', md: '0 4px 12px rgba(0,0,0,0.08)' } 
            }}
          >
            {paymentComplete ? (
              <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: { xs: 1.5, sm: 2 }, 
                    color: 'success.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' } 
                  }}
                >
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: { xs: 2, sm: 3 } }}>
                  Thank you for your purchase. You are now enrolled in {course.title}.
                </Typography>
                <CircularProgress size={window.innerWidth < 600 ? 20 : 24} sx={{ mb: 2 }} />
                <Typography variant="body2" color="textSecondary">
                  Redirecting to your course...
                </Typography>
              </Box>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm course={course} onPaymentSuccess={handlePaymentSuccess} />
              </Elements>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: { xs: 1, sm: 2 },
            overflow: 'hidden',
            height: 'fit-content',
            position: { md: 'sticky' },
            top: { md: '24px' },
            boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.08)', md: '0 4px 12px rgba(0,0,0,0.08)' }
          }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
              >
                Order Summary
              </Typography>
              <Box 
                component="img"
                src={course.thumbnail}
                alt={course.title}
                sx={{ 
                  width: '100%', 
                  borderRadius: { xs: 0.75, sm: 1 },
                  mb: { xs: 1.5, sm: 2 },
                  height: { xs: 140, sm: 160 },
                  objectFit: 'cover',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.3
                }}
              >
                {course.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                }}
              >
                By {course.instructor}
              </Typography>
              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Course Price</Typography>
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>${course.price}</Typography>
              </Box>
              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  Total
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  ${course.price}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
