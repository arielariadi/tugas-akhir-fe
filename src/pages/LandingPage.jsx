import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import '../styles/landing-page.css';
import Lottie from 'lottie-react';
import HeroLottie from '../assets/lottie/heroLottie.json';

const LandingPage = () => {
	return (
		<>
			{' '}
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
									Pendaftaran donor darah dengan cepat dan cari sukarelawan
									donor darah terdekat
								</p>

								<div className="keunggulan">
									<h5 className="">Keuggulan</h5>
									<span className="keunggulan-badge ">
										<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
											Mudah
										</Badge>
									</span>

									<span className="keunggulan-badge">
										<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
											Cepat
										</Badge>
									</span>
									<span className="keunggulan-badge ">
										<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
											Aman
										</Badge>
									</span>
									<span className="keunggulan-badge ">
										<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
											Pelayanan Baik
										</Badge>
									</span>
									<span className="keunggulan-badge ">
										<Badge bg="danger" className="me-2 mb-xs-0 mb-2">
											Tempat Nyaman
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
			<div className="services" id="profile">
				<section className="w-100 min-vh-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="services-header">
							<h4 className="">LAYANAN</h4>
						</div>

						<div className="services-header-detail">
							<h2 style={{ width: '35rem' }}>
								Memberikan Pelayanan Terbaik Dengan Fasilitas Yang Nyaman
							</h2>

							<p style={{ width: '30rem' }}>
								Memberikan pelayanan terbaik dengan menyediakan Fasilitas dan
								Layanan yang lengkap dan profesional
							</p>
						</div>

						<div className="services-content d-flex justify-content-center gap-3">
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-donation-icon.png"
										style={{ width: '5rem' }}
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Daftar Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Some quick example text to build on the card title and make
										up the bulk of the content.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-donation-icon.png"
										style={{ width: '5rem' }}
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Daftar Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Some quick example text to build on the card title and make
										up the bulk of the content.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-donation-icon.png"
										style={{ width: '5rem' }}
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Daftar Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Some quick example text to build on the card title and make
										up the bulk of the content.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-donation-icon.png"
										style={{ width: '5rem' }}
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Daftar Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Some quick example text to build on the card title and make
										up the bulk of the content.
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</Container>
				</section>
			</div>
		</>
	);
};

export default LandingPage;
