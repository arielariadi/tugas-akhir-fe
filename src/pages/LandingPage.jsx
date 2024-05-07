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
								<Button className="cta mb-4 text-light">
									{' '}
									Cari Tahu Sekarang !{' '}
								</Button>
								<p className="mb-4">
									Selamat datang di <strong>UDD PMI Kabupaten Lebak</strong> -
									di mana setiap tetes darah menjadi sumber kehidupan. Bersama,
									kita tebarkan semangat solidaritas untuk membantu sesama.
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
			<div className="services" id="services">
				<section className="w-100 min-vh-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="services-header">
							<h4 className="">LAYANAN</h4>
						</div>

						<div className="services-header-detail">
							<h2>Memberikan Pelayanan Terbaik Dengan Fasilitas Yang Nyaman</h2>

							<p>
								Memberikan pelayanan terbaik dengan menyediakan Fasilitas dan
								Layanan yang lengkap dan profesional
							</p>
						</div>

						<div className="services-content d-flex justify-content-center gap-3">
							<Card>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-donation-icon.png"
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Pendaftaran Donor Darah Online
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Jadwalkan sesi donor darah Anda dengan cepat dan mudah
										melalui pendaftaran online, membantu kami merencanakan
										persediaan darah yang dibutuhkan.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/blood-request-icon.png"
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Request Permintaan Kantung Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Ajukan permintaan darah gawat darurat dengan cepat dan
										efisien, kami akan memproses dengan prioritas tertinggi
										untuk pasokan tepat waktu.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/search-volunteer-icon.png"
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Cari Sukarelawan Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Temukan sukarelawan donor darah yang sesuai dengan kebutuhan
										Anda, bersama kita atasi krisis kekurangan darah.
									</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Body>
									<Card.Img
										variant="top"
										src="src/assets/img/volunteer-icon.png"
										className="d-flex mx-auto"
									/>

									<Card.Title className="text-center mt-4">
										Menjadi Sukarelawan Donor Darah
									</Card.Title>

									<Card.Text className="text-center mt-3">
										Bergabunglah menjadi pahlawan dengan menjadi sukarelawan
										donor darah, berikan hadiah kehidupan yang tak ternilai.
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
