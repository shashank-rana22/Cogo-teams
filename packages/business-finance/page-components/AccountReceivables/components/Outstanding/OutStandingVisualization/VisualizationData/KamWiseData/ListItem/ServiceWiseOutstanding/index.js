import { Loader } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';
import { v4 as uuid } from 'uuid';

import useGetServiceWiseOutstandings from '../../../../../../../hooks/useGetServiceWiseOutstandings';
import StatsCard from '../StatsCard';

import styles from './styles.module.css';

function ServiceWiseOutstanding({
	registrationNumber = '',
	ageingArr,
	cogo_entity_number = [],
}) {
	const { serviceWiseLoading, serviceWiseStats } = useGetServiceWiseOutstandings({
		registration_number: registrationNumber,
		ageingArr,
		cogo_entity_number,
	});

	const getAmountObj = (bucket) => {
		const invoiceAmounts = Object.entries(bucket).map(([key, value]) => ({
			key: `amount_${key.replaceAll('-', '_')}`,
			value,
		}));
		return invoiceAmounts.reduce((a, v) => ({ ...a, [v.key]: v.value }), {});
	};

	if (serviceWiseLoading) {
		return <Loader />;
	}

	if (isEmpty(serviceWiseStats)) {
		return (
			<div>
				{/* <EmptyState containerHeight="260px" /> */}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{serviceWiseStats.map((item) => {
				const getFinalObj = {
					...getAmountObj(item.buckets),
					open_invoice_amount: item.total_open_invoice_amount,
				};

				return (
					<div className={styles.card} key={uuid()}>
						<div className={styles.custom_tag}>{startCase(item.shipment_type) || '-'}</div>
						<StatsCard item={getFinalObj} />
					</div>
				);
			})}
		</div>
	);
}

export default ServiceWiseOutstanding;
