import FreightPrice from './FreightPrice';
import ProceedButton from './ProceedButton';
import styles from './styles.module.css';

function Price({
	rate = {},
	detail = {},
	isSelectedCard = false,
	setRouterLoading = () => {},
	isContract = false,
}) {
	return (
		<div className={styles.container}>
			<FreightPrice
				service_type={detail?.service_type}
				rate={rate}
				isContract={isContract}
			/>

			<ProceedButton
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>
		</div>
	);
}

export default Price;
