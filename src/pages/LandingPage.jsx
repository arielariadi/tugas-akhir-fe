import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import '../styles/landing-page.css';
import Lottie from 'lottie-react';
import HeroLottie from '../assets/lottie/heroLottie.json';

const LandingPage = () => {
	return (
		<div className="homepage" id="home">
			<section className="w-100 min-vh-100 d-flex align-items-center overflow-hidden hero-section">
				<Container>
					<Row className="header-box d-flex align-items-center">
						<Col lg="6" className="p-4">
							<h1 className="mb-4">
								<span className="slogan-1">Satu Tetes </span>
								<br />
								<span className="slogan-2">Sejuta Harapan</span>
							</h1>
							<Button className="cta mb-4 btn-md text-light">
								{' '}
								Cari Tahu Sekarang !{' '}
							</Button>
							<p className="mb-4">
								Pendaftaran donor darah dengan cepat dan cari sukarelawan donor
								darah terdekat
							</p>

							<div className="services">
								<h5 className="">Layanan Kami</h5>
								<span className="services-badge ">
									<Badge bg="danger" className="me-2 mb-xs-0 mb-2 ">
										Daftar Donor Darah
									</Badge>
								</span>
								<span className="services-badge ">
									<Badge bg="danger" className="me-2 mb-xs-0 mb-2 ">
										Jadwal Donor Darah
									</Badge>
								</span>
								<span className="services-badge">
									<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
										Cari Sukarelawan
									</Badge>
								</span>
							</div>
						</Col>
						<Col lg="6" className="pt-lg-0 pt-5 d-flex justify-content-end">
							<Lottie
								animationData={HeroLottie}
								loop={true}
								className="hero-lottie"></Lottie>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default LandingPage;
