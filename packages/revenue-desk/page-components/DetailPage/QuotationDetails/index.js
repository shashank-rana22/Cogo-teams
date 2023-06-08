import BuyServiceQuotation from './BuyServiceQuotation';
import SellServiceQuotation from './SellServiceQuotation';
import styles from './styles.module.css';

function QuotationDetails({ itemData }) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.text}>
					Full Sell Quotation
				</div>
				<SellServiceQuotation shipmentData={itemData} />
			</div>
			<div>
				<div className={styles.text}>
					Buy Quotation
				</div>
				<BuyServiceQuotation shipmentData={itemData} />
			</div>

		</div>
	);
}

export default QuotationDetails;
