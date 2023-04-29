import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import React, { useEffect } from 'react';

import Quotation from './quotation/index';
import styles from './styles.module.css';

interface CostViewProps {
	shipment_id?: string;
}

function CostView({ shipment_id = '' }: CostViewProps) {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_shipment_cost_sheet',
			method : 'get',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		if (shipment_id) {
			const getDataFromApi = async () => {
				try {
					const res = await trigger({ params: { shipment_id } });
					if (res?.hasError) {
						Toast.error('Something went wrong!');
					}
				} catch (err) {
					console.log(err);
				}
			};
			getDataFromApi();
		}
	}, [shipment_id, trigger]);

	return (
		<div>
			<div className={styles.header}>Cost Sheet</div>
			<div className={styles.hr} />

			<div style={{ marginLeft: '20px' }}>
				<Quotation data={data} loading={loading} />
			</div>
		</div>
	);
}

export default CostView;
