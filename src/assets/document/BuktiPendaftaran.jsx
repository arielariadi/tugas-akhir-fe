import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	header: {
		fontSize: 25,
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 10,
	},
	headerChild: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 80,
		borderBottom: '1px solid black',
		paddingBottom: 10,
	},
});

// Create Document Component
const BuktiPendaftaran = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<Text style={styles.header} fixed>
				Bukti Pendaftaran
			</Text>

			<Text style={styles.headerChild}>
				Tolong tunjukkan bukti pendaftaran ini ke petugas
			</Text>
		</Page>
	</Document>
);

export default BuktiPendaftaran;
