import BuyServiceQuotation from './BuyServiceQuotation';
import SellServiceQuotation from './SellServiceQuotation';
import styles from './styles.module.css';

function QuotationDetails({ itemData, setPriceData, priceData }) {
	return (
		<div className={styles.container}>
			<div>
				<SellServiceQuotation shipmentData={itemData} setPriceData={setPriceData} priceData={priceData} />
			</div>
			<div>
				<BuyServiceQuotation shipmentData={itemData} />
			</div>

		</div>
	);
}

export default QuotationDetails;
