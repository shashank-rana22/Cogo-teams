import { useEffect } from 'react';

import useListShipmentAudits from '../../../../hooks/useListShipmentAudits';

import HistoryPagination from './HistoryPagination';
import HistoryTable from './HistoryTable';

function History() {
	const { apiTrigger, data, setFilters, filters, loading } = useListShipmentAudits({
		defaultFilters: {
			action_name: 'update_operating_instruction', shipment_id: '7da5d7dc-7526-49e7-8ebb-11607e3654ae',
		},
	});

	useEffect(() => {
		apiTrigger();
	}, []);

	return (
		<div>
			<div>History (Booking Party)</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<HistoryPagination data={data} filters={filters} setFilters={setFilters} />
			</div>
			<div>
				<HistoryTable data={data} loading={loading} />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<HistoryPagination data={data} filters={filters} setFilters={setFilters} />
			</div>
		</div>
	);
}

export default History;
