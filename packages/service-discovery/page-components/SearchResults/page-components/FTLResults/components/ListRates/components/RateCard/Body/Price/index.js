import FreightPrice from './FreightPrice';
import ProceedButton from './ProceedButton';
import styles from './styles.module.css';

function Price({
	rate = {},
	detail = {},
	isSelectedCard = false,
	setRouterLoading = () => {},
}) {
	return (
		<div className={styles.container}>
			<FreightPrice rate={rate} detail={detail} />

			<ProceedButton
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>
		</div>
	);
}

export default Price;
