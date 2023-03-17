import { useEffect } from 'react';

import useListShipmentAudits from '../../../../hooks/useListShipmentAudits';

import HistoryPagination from './HistoryPagination';
import HistoryTable from './HistoryTable';
import styles from './styles.module.css';

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
		<>
			<div className={styles.heading}>History (Booking Party)</div>

			<HistoryPagination data={data} filters={filters} setFilters={setFilters} />

			<HistoryTable data={data} loading={loading} />

			<HistoryPagination data={data} filters={filters} setFilters={setFilters} />
		</>
	);
}

export default History;
