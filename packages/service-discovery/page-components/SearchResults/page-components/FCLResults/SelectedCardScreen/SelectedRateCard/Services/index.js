import Bundles from '../../../../../common/Bundles';

import OtherServices from './OtherServices';
import styles from './styles.module.css';

function Services({
	rateCardData = {},
	detail = {},
	refetch = () => {},
	setHeaderProps = () => {},
	loading = false,
	possible_subsidiary_services = [],
	createCheckoutLoading = false,
	cargoModal = '',
	setCargoModal = () => {},
	handleBook = () => {},
}) {
	return (
		<div className={styles.container}>
			<Bundles />

			<OtherServices
				rateCardData={rateCardData}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				loading={loading}
				setHeaderProps={setHeaderProps}
				possible_subsidiary_services={possible_subsidiary_services}
				cargoModal={cargoModal}
				setCargoModal={setCargoModal}
				handleBook={handleBook}
			/>
		</div>
	);
}

export default Services;
