import React from 'react';

const EventDate = ({ date }) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <div>{formattedDate}</div>;
};

export default EventDate;
