import Filters from './Filters.';
import styles from './styles.module.css';

function RfqEnquiries() {
	return (
		<>
			<div className={styles.heading}>RFQ (Rate For Quotation)</div>
			<div className={styles.line} />
			<div className={styles.body}>
				<div><Filters /></div>
			</div>
		</>
	);
}
export default RfqEnquiries;
