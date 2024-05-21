import { useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Button,
	Badge,
	Card,
	Accordion,
} from 'react-bootstrap';
import '../styles/landing-page.css';
import Lottie from 'lottie-react';
import HeroLottie from '../assets/lottie/heroLottie.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
	useEffect(() => {
		AOS.init({
			disable: function () {
				var maxWidth = 768;
				return window.innerWidth < maxWidth;
			},
			duration: 1200,
			easing: 'ease-in-out',
			once: false,
			mirror: true,
			anchorPlacement: 'top-bottom',
		});
		AOS.refresh(); // Ensure AOS refreshes elements
	}, []);
	return (
		<>
			{' '}
			<div className="homepage" id="home">
				<section className="w-100 min-vh-100 d-flex align-items-center overflow-hidden hero-section">
					<Container>
						<Row className="header-box d-flex align-items-center">
							<Col lg="6" className="p-4" data-aos="fade-right">
								<h1 className="mb-4">
									<span className="slogan-1">Satu Tetes </span>
									<br />
									<span className="slogan-2">Sejuta Harapan</span>
								</h1>
								<a href="#profile">
									<Button className="cta mb-4 text-light">
										Cari Tahu Sekarang !
									</Button>
								</a>
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
							<Col
								lg="6"
								className="pt-lg-0 pt-5 d-flex justify-content-end"
								data-aos="fade-left">
								<Lottie
									animationData={HeroLottie}
									loop={true}
									className="hero-lottie"></Lottie>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
			<div className="profile" id="profile">
				<section className="w-100 min-vh-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="profile-header text-center" data-aos="fade-up">
							<h4 className="">PROFILE</h4>
						</div>

						<div
							className="profile-header-detail text-center"
							data-aos="fade-up">
							<h2>UDD PMI Kabupaten Lebak</h2>
						</div>

						<div className="profile-content text-center" data-aos="fade-up">
							<p>
								UDD PMI Kabupaten Lebak berdiri pada tanggal 2 Juni 1982 untuk
								melayani kebutuhan darah masyarakat yang berada di kabupaten
								Lebak. Pada hari Jumat tanggal 15 Oktober 2021, Bupati Lebak Iti
								Oktavia Jayabaya meresmikan gedung baru UDD PMI Kabupaten Lebak
								yang beralamat di Jl. Sentral No. 2 Rangkasbitung dengan
								ditandai penandatanganan prasasti dan pengguntingan pita. Turut
								dihadiri oleh Kepala UDD PMI Pusat, Ketua PMI Banten, Ketua PMI
								Lebak, Konsultan UDD dari DKI Jakarta, Kepala UDD Lebak,
								Sekretaris Daerah Kabupaten Lebak, Asda III, serta Kepala Dinas
								Kesehatan Kabupaten. Pembangunan gedung baru memiliki fasilitas
								diantaranya adalah ruang tunggu kurir ataupun keluarga pasien
								yang membutuhkan darah, ruang tunggu untuk pendonor, lahan
								parkir yang memadai untuk kendaraan roda dua maupun roda empat,
								laboratorium untuk pemeriksaan uji saring IMLTD menggunakan
								metode CLIA, ruang pengambilan darah yang nyaman, dan sudah
								dapat memproduksi komponen TC. Ini semua bertujuan untuk
								meningkatkan pelayanan darah dan kualitas darah untuk masyarakat
								kabupaten Lebak.
							</p>
						</div>

						<Row className="visi-misi-wrapper" data-aos="fade-up">
							<Col className="visi">
								<h4 className="text-center">VISI</h4>

								<p>
									Mewujudkan kemandirian UDD, guna penguatan kapasitas, akses &
									peningkatan kualitas pelayanan
								</p>
							</Col>

							<Col className="misi">
								<h4 className="text-center">MISI</h4>

								<p>
									(1). Memperkuat jalinan kemitraan sebagai upaya pengerahan &
									pelestarian donor darah sukarela
								</p>

								<p>
									(2). Menyediakan darah yang cukup, aman, bermutu, terjangkau &
									berkesinambungan
								</p>

								<p>
									(3). Mengadaptasi teknologi dalam mengembangkan kompetensi
									SDM, standarisasi proses dan pemastian mutu
								</p>
							</Col>
						</Row>
					</Container>
				</section>
			</div>
			<div className="services" id="layanan">
				<section className="w-100 min-vh-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="services-header" data-aos="fade-up">
							<h4 className="">LAYANAN</h4>
						</div>

						<div className="services-header-detail" data-aos="fade-up">
							<h2>Memberikan Pelayanan Terbaik Dengan Fasilitas Yang Nyaman</h2>

							<p>
								Memberikan pelayanan terbaik dengan menyediakan Fasilitas dan
								Layanan yang lengkap dan profesional
							</p>
						</div>

						<div className="services-content d-flex justify-content-center gap-3">
							<Card data-aos="fade-up">
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

							<Card data-aos="fade-up">
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

							<Card data-aos="fade-up">
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

							<Card data-aos="fade-up">
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
			<div className="syarat" id="syarat">
				<section className="w-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="syarat-header" data-aos="fade-up">
							<h4 className="">SYARAT</h4>
						</div>

						<div className="syarat-header-detail" data-aos="fade-up">
							<h2>Apa Saja Syarat Donor Darah Yang Harus Diketahui</h2>

							<p>
								Tidak semua orang bisa mendonorkan darahnya. Ada beberapa syarat
								yang harus dipenuhi oleh pendonor, seperti kondisi kesehatan,
								usia, berat badan, suhu tubuh, tekanan darah sampai kadar
								hemoglobin.
							</p>
						</div>

						<div className="syarat-content d-flex flex-wrap gap-3">
							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-syarat-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/age-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Title className="text-center">Usia</Card.Title>

										<Card.Text className="ms-3">
											Usia 17-60 tahun (usia 17 tahun diperbolehkan donor darah
											bila mendapat izin tertulis dari orangtua)
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-syarat-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/weight-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Title className="text-center">
											Berat Badan & Suhu
										</Card.Title>

										<Card.Text className="ms-3">
											Berat badan minimal 45 kg. Temperatur tubuh 36,6 – 37,5
											derajat Celcius
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-syarat-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/blood-pressure-icon.png"
											className="d-flex  mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Title className="text-center">
											Tekanan Darah & Nadi
										</Card.Title>

										<Card.Text className="ms-3">
											Sistole = 110-160 mmHg, diastole = 70-100 mmHg Denyut nadi
											teratur yaitu sekitar 50-100 kali/menit
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-syarat-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/hemoglobin-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Title className="text-center">Hemoglobin</Card.Title>

										<Card.Text className="ms-3">
											Hemoglobin perempuan minimal 12 gram, sedangkan untuk
											laki-laki minimal 12,5 gram
										</Card.Text>
									</div>
								</Card.Body>
							</Card>
						</div>
					</Container>
				</section>
			</div>
			<div className="alur-pendaftaran" id="alurPendaftaran">
				<section className="w-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="alur-pendaftaran-header" data-aos="fade-up">
							<h4 className="">ALUR PENDAFTARAN</h4>
						</div>

						<div className="alur-pendaftaran-header-detail" data-aos="fade-up">
							<h2>
								Ketahui Alur Pendaftaran Donor Darah Pada Unit Donor Darah PMI
								Kabupaten Lebak
							</h2>

							<p>
								Proses pendaftaran donor darah secara online di Unit Donor Darah
								PMI Kabupaten Lebak dirancang untuk memudahkan calon pendonor
								dalam memberikan kontribusi yang berharga bagi masyarakat
							</p>
						</div>

						<div className="alur-pendaftaran-content d-flex flex-wrap gap-3">
							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-1-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Memilih tanggal donor darah terlebih dahulu pada saat
											melakukan pendaftaran online
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-2-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Menunggu konfirmasi dari admin apakah pendaftaran donor
											darah tersebut diterima atau ditolak
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-3-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Unduh bukti pendaftaran donor darah pada menu dashboard
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-4-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Datang ke lokasi Unit Donor Darah PMI Kabupaten Lebak
											sesuai tanggal pendaftaran
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-5-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Tunjukkan bukti pendaftaran donor darah kepada petugas
										</Card.Text>
									</div>
								</Card.Body>
							</Card>

							<Card data-aos="fade-up">
								<Card.Body>
									<div className="card-image-alur-pendaftaran-wrapper">
										<Card.Img
											variant="top"
											src="src/assets/img/number-6-icon.png"
											className="d-flex mx-auto"
										/>
									</div>

									<div className="card-content-syarat-wrapper">
										<Card.Text className="ms-3">
											Melakukan pemeriksaan suhu tubuh, anamnesa, tekanan darah,
											hemoglobin, dan golongan darah (jika belum mengetahui)
										</Card.Text>
									</div>
								</Card.Body>
							</Card>
						</div>
					</Container>
				</section>
			</div>
			<div className="manfaat" id="manfaat">
				<section className="w-100 d-flex overflow-hidden hero-section">
					<Container>
						<div className="manfaat-header text-center" data-aos="fade-up">
							<h4 className="">MANFAAT DONOR DARAH</h4>
						</div>

						<Accordion data-aos="fade-up">
							<Accordion.Item eventKey="0">
								<Accordion.Header>
									Menjaga Kesehatan Jantung dan Menurunkan Risiko Penyakit
									Jantung
								</Accordion.Header>
								<Accordion.Body>
									Donor darah secara rutin dapat membantu mengurangi kekentalan
									darah, yang pada gilirannya dapat menurunkan risiko
									penyumbatan arteri dan serangan jantung. Menurunkan tingkat
									zat besi dalam darah melalui donor juga membantu mengurangi
									risiko penyakit kardiovaskular.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1">
								<Accordion.Header>
									Meningkatkan Produksi Sel Darah Baru
								</Accordion.Header>
								<Accordion.Body>
									Setiap kali Anda mendonorkan darah, tubuh Anda bekerja untuk
									menggantikan darah yang hilang, yang merangsang produksi sel
									darah baru. Proses ini membantu menjaga kesehatan tubuh dan
									memastikan bahwa sistem peredaran darah tetap berfungsi
									optimal.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="2">
								<Accordion.Header>
									Membantu Menurunkan Berat Badan
								</Accordion.Header>
								<Accordion.Body>
									Donor darah membakar kalori, yang dapat membantu dalam
									pengelolaan berat badan. Setiap kali Anda mendonorkan darah,
									tubuh membakar sekitar 650 kalori, sehingga bisa menjadi
									bagian dari program pengendalian berat badan Anda.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="3">
								<Accordion.Header>Mendeteksi Penyakit Serius</Accordion.Header>
								<Accordion.Body>
									Setiap kali Anda mendonorkan darah, darah Anda akan diperiksa
									untuk berbagai penyakit seperti HIV, hepatitis B dan C,
									sifilis, dan lainnya. Hal ini tidak hanya membantu memastikan
									bahwa darah yang didonorkan aman untuk penerima, tetapi juga
									membantu pendonor mengetahui status kesehatan mereka.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="4">
								<Accordion.Header>Mengurangi Risiko Kanker</Accordion.Header>
								<Accordion.Body>
									Donor darah secara teratur dapat membantu mengurangi kadar zat
									besi dalam tubuh. Kadar zat besi yang tinggi telah dikaitkan
									dengan peningkatan risiko kanker tertentu. Dengan mendonorkan
									darah, Anda bisa menjaga kadar zat besi dalam darah tetap
									seimbang.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="5">
								<Accordion.Header>
									Meningkatkan Kesehatan Mental dan Kepuasan Diri
								</Accordion.Header>
								<Accordion.Body>
									Mengetahui bahwa Anda telah membantu menyelamatkan nyawa
									seseorang dapat memberikan rasa kebahagiaan dan kepuasan
									tersendiri. Banyak pendonor darah merasa lebih baik secara
									emosional dan memiliki tingkat stres yang lebih rendah setelah
									mendonorkan darah.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="6">
								<Accordion.Header>
									Meningkatkan Kesehatan Keseluruhan
								</Accordion.Header>
								<Accordion.Body>
									Donor darah membantu menjaga keseimbangan kadar zat besi dalam
									tubuh. Kelebihan zat besi dapat merusak organ tubuh. Dengan
									mendonorkan darah, Anda dapat menjaga keseimbangan zat besi
									dan meningkatkan kesehatan secara keseluruhan.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="7">
								<Accordion.Header>
									Membantu Komunitas dan Menyelamatkan Nyawa
								</Accordion.Header>
								<Accordion.Body>
									Setiap kali Anda mendonorkan darah, Anda berkontribusi pada
									ketersediaan darah di rumah sakit dan bank darah. Satu donasi
									darah dapat menyelamatkan hingga tiga nyawa. Dengan demikian,
									donor darah adalah salah satu cara paling sederhana dan paling
									berharga untuk memberikan kontribusi yang bermanfaat bagi
									masyarakat.
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</Container>
				</section>
			</div>
		</>
	);
};

export default LandingPage;
