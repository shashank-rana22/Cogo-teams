import PortDetails from './PortDetails';
import styles from './styles.module.css';

function QuotationDetails() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Quotation Details :-
			</div>
			<PortDetails />
		</div>
	);
}

export default QuotationDetails;
