import BuyServiceQuotation from './BuyServiceQuotation';
import SellServiceQuotation from './SellServiceQuotation';
import styles from './styles.module.css';

function QuotationDetails({ itemData, setPriceData }) {
	return (
		<div className={styles.container}>
			<div>
				<SellServiceQuotation shipmentData={itemData} setPriceData={setPriceData} />
			</div>
			<div>
				<BuyServiceQuotation shipmentData={itemData} />
			</div>

		</div>
	);
}

export default QuotationDetails;
