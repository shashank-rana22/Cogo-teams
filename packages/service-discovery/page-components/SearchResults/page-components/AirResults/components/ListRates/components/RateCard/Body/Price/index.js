import Buttons from './Buttons';
import FreightPrice from './FreightPrice';
import styles from './styles.module.css';

function Price({
	rate = {},
	detail = {},
	isSelectedCard = false,
	isCogoAssured = false,
}) {
	const { service_rates = {} } = rate;
	const { service_details = {}, primary_service_id:serviceId = '' } = detail;

	const primary_service = {
		...(service_rates[serviceId] || {}),
		...(service_details[serviceId] || {}),
	};

	return (
		<div className={styles.container}>
			<FreightPrice rate={rate} primary_service={primary_service} />

			<Buttons
				detail={detail}
				rate={rate}
				isCogoAssured={isCogoAssured}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default Price;
