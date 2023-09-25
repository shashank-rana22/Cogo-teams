import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AdditionalServices from '../../../../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';
import TotalLandedCost from './TotalLandedCost';

function OtherServices({
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

			<AdditionalServices
				rateCardData={rateCardData}
				detail={detail}
				// setHeaderProps={setHeaderProps}
				refetchSearch={refetch}
				source="search-results"
				refetchLoading={loading}
			/>
			<TotalLandedCost
				rateCardData={rateCardData}
				createCheckoutLoading={createCheckoutLoading}
				handleBook={handleBook}
			/>

			{!isEmpty(possible_subsidiary_services) && (
				<div className={styles.subsidiary_services}>
					<SubsidiaryServices
						possible_subsidiary_services={possible_subsidiary_services}
						data={detail}
						refetch={refetch}
						rate_card_id={rateCardData?.id}
						loading={loading}
					/>
				</div>
			)}
		</div>
	);
}

export default OtherServices;
