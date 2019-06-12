import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src:'https://i.imgur.com/Q73uaXI.png',
  },
  {
    src: 'https://i.imgur.com/eY9hVz9.png',
  },
  {
    src: 'https://i.imgur.com/OH0H2lv.png',
  },
  {
    src: 'https://i.imgur.com/2B6Rt8c.png',
  },
  {
    src: 'https://i.imgur.com/kBklVWf.png',
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;