import OtherServices from './OtherServices';
import styles from './styles.module.css';

function Services({
	rateCardData = {},
	detail = {},
	refetch = () => {},
	loading = false,
	possible_subsidiary_services = [],
}) {
	return (
		<div className={styles.container}>
			<OtherServices
				rateCardData={rateCardData}
				detail={detail}
				refetch={refetch}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
			/>
		</div>
	);
}

export default Services;
