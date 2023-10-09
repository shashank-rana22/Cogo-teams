import { Loader, Pill } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetServiceWiseOutstandings from '../../../../../../../hooks/useGetServiceWiseOutstandings';
import EmptyStateOutStanding from '../../../../../EmptyStateOutStanding';
import StatsCard from '../StatsCard';

import styles from './styles.module.css';

function ServiceWiseOutstanding({
	registrationNumber = '',
	ageingArr = undefined,
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
			<EmptyStateOutStanding />
		);
	}

	return (
		<div className={styles.container}>
			{serviceWiseStats.map((item) => {
				const getFinalObj = {
					...getAmountObj(item.buckets),
					open_invoice_amount: item.total_open_invoice_amount,
				};
				const key = JSON.stringify(item?.buckets);
				return (
					<div className={styles.card} key={key}>
						<div className={styles.custom_tag}>
							<Pill size="lg" color="#d9eafd">{startCase(item.shipment_type) || '-'}</Pill>
						</div>
						<StatsCard item={getFinalObj} />
					</div>
				);
			})}
		</div>
	);
}

export default ServiceWiseOutstanding;
