import { isEmpty } from '@cogoport/utils';
import React from 'react';

import AdditionalServices from '../../../../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';

function OtherServices({
	rateCardData = {},
	detail = {},
	refetch = () => {},
	loading = false,
	possible_subsidiary_services = [],
}) {
	return (
		<div className={styles.container}>
			<AdditionalServices
				rateCardData={rateCardData}
				detail={detail}
				refetchSearch={refetch}
				source="search-results"
				refetchLoading={loading}
			/>

			{!isEmpty(possible_subsidiary_services) && (
				<SubsidiaryServices
					possible_subsidiary_services={possible_subsidiary_services}
					data={detail}
					refetch={refetch}
					rate_card_id={rateCardData?.id}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default OtherServices;
