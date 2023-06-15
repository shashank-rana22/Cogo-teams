import REVERTED_PRICE_MAPPING from './RevertedPriceMapping';
import styles from './styles.module.css';

function PriceDetails({ item, activeTab }) {
	const ActiveComp = REVERTED_PRICE_MAPPING[activeTab] || null;
	if (!ActiveComp) {
		return null;
	}

	return (
		<div className={styles.container}>
			<ActiveComp item={item} setRevertModalData={() => {}} />
		</div>
	);
}
export default PriceDetails;
