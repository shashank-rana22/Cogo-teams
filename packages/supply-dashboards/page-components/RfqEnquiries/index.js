import Filters from './Filters.';
import List from './List';
import styles from './styles.module.css';

function RfqEnquiries() {
	return (
		<>
			<div className={styles.heading}>RFQ (Rate For Quotation)</div>
			<div className={styles.line} />
			<div className={styles.body}>
				<div><Filters /></div>
				<div><List /></div>
			</div>
		</>
	);
}
export default RfqEnquiries;
