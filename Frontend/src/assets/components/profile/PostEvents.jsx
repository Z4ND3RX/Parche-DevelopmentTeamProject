import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { API_URL } from "../../../services/Apirest";
//import EventDate from "./EventDate";
import AuthContext from "../../../context/AuthContext";
import React, { useContext } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";


const PostEvents = ({ event }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "purple", "orange", "pink"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div>
      {event.nicknameUser === user.nickname && (
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
                {event.nicknameUser.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={event.nicknameUser}
            //subheader={<EventDate date={event.date} />}
          />
          <Carousel >
            {event.eventImages.map((image) => (
              <img
                key={image.id}
                src={API_URL + `/uploads/${image.name}`}
                alt={event.title}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ))}
          </Carousel>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default PostEvents;
