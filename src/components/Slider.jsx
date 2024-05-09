/* eslint-disable react/prop-types */
import { Carousel } from 'react-bootstrap';
import '../styles/component-styles/carousel.css';

const Slider = ({ slides }) => {
	return (
		<Carousel>
			{slides.map(slide => (
				<Carousel.Item key={slide.image}>
					<img src={slide.image} alt="" />
					{/* <Carousel.Caption>
						<h3>{slide.title}</h3>
						<p>{slide.subTitle}</p>
					</Carousel.Caption> */}
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default Slider;
