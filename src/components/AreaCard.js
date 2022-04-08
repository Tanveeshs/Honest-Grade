import Card from '@mui/material/Card';
import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function AreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/assets/userimg.jpeg"
        />
        <CardContent>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Typography gutterBottom variant="h5" component="div">
                {props.testStuff.subname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.testStuff.duedate}
                </Typography>
            </div>
            <Typography variant="body2" color="text.secondary">
                {props.testStuff.noQ}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.testStuff.desc}
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="secondary">
          Start Test
        </Button>
      </CardActions>
    </Card>
  );
}