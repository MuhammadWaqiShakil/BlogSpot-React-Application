import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const BlogCard = ({
  image = 'https://via.placeholder.com/400x250',
  title = 'The Power of Consistency: How Small Daily Habits Lead to Big Results',
  subtitle = 'Muhammad Waqi',
  membersOnly = true,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: '#f9f9f9',
        maxWidth: 500,
        mx: 'auto',
        textAlign: 'center',
        borderRadius: 0,
        cursor:'pointer',
        boxShadow: 'none',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover .hoverImage': {
          transform: 'scale(1.05)',
          filter: 'grayscale(80%) brightness(0.9)',
        },
        '&:hover .hoverTitle': {
          color: '#999',
        },
      }}
    >
      {/* Image */}
      <Box
        className="hoverImage"
        sx={{
          width: '100%',
          height: 250,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          transition: 'all 0.4s ease-in-out',
        }}
      >
        {membersOnly && (
          <Chip
            label="PRIVATE"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'darkred',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '999px',
              px: 2,
            }}
          />
        )}
      </Box>

      <CardContent>
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, letterSpacing: 1, mb: 1 }}
        >
          BY {subtitle.toUpperCase()}
        </Typography>

        <Typography
          variant="h6"
          className="hoverTitle"
          sx={{
            fontWeight: 'bold',
            mt: 1,
            mb: 1,
            fontSize: '1.7rem',
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>

        
      </CardContent>
    </Card>
  );
};

export default BlogCard;
