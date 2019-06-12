import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Kawhi from '../assets/Kawhi.jpeg'

const items = [
  {
    src: 'https://cdn-s3.si.com/s3fs-public/styles/marquee_large_2x/public/2019/05/13/kawhi-leonard-game-winner-multiple-languages.jpg?itok=sc2PImI_',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: '../assets/PG.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: '../assets/dametime.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;