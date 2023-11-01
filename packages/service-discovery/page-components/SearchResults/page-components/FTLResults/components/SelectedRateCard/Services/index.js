import React from 'react';

import OtherServices from './OtherServices';
import styles from './styles.module.css';

function Services({
	rateCardData = {},
	detail = {},
	refetch = () => {},
	loading = false,
	possible_subsidiary_services = [],
	createCheckoutLoading = false,
	handleBook = () => {},
}) {
	return (
		<div className={styles.container}>
			<OtherServices
				rateCardData={rateCardData}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				handleBook={handleBook}
			/>
		</div>
	);
}

export default Services;
