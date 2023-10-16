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
			<FreightPrice rate={rate} detail={detail} isContract={isContract} />

			<ProceedButton
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>
		</div>
	);
}

export default Price;
