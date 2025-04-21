import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { courses } from '../data/mockData';

export default function Payment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === parseInt(courseId));
    setCourse(foundCourse);
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment...');
    // Navigate to course learning page after successful payment
    navigate('/learning/' + courseId);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" className="mb-6 text-center font-bold">
        Complete Your Purchase
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Typography variant="h6" className="mb-4">
              Payment Details
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                className="mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Expiry Date"
                  placeholder="MM/YY"
                />
                <TextField
                  label="CVV"
                  placeholder="123"
                />
              </div>
              <TextField
                fullWidth
                label="Cardholder Name"
                placeholder="John Doe"
                className="mb-4"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Pay ${course.price}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Order Summary
              </Typography>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full rounded-lg mb-4"
              />
              <Typography variant="subtitle1" className="font-medium">
                {course.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-4">
                By {course.instructor}
              </Typography>
              <Divider className="my-4" />
              <div className="flex justify-between mb-2">
                <Typography>Course Price</Typography>
                <Typography>${course.price}</Typography>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ${course.price}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
