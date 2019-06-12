import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src:'https://i.imgur.com/dwPiLb5.png',
  },
  {
    src: 'https://i.imgur.com/FrFYmhl.jpg',
  },
  {
    src: 'https://i.imgur.com/BVFBg6N.jpg',
  },
  {
    src: 'https://i.imgur.com/m7rWWZm.jpg',
  },
  {
    src: 'https://i.imgur.com/i7kP4Is.jpg',
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;