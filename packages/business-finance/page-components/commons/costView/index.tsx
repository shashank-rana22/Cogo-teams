import { useRequest } from '@cogoport/request';
import React, { useEffect } from 'react';

import Quotation from './quotation/index';

interface CostViewProps {
	shipment_id?: string;
}

function CostView({ shipment_id = '' }: CostViewProps) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_shipment_cost_sheet',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		if (shipment_id) {
			const getDataFromApi = async () => {
				try {
					await trigger({ params: { shipment_id } });
				} catch (err) {
					console.log(err);
				}
			};
			getDataFromApi();
		}
	}, [shipment_id, trigger]);

	return (
		<div>
			<Quotation data={data} loading={loading} />
		</div>
	);
}

export default CostView;
