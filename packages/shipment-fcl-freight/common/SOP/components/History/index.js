import useListShipmentAudits from '../../../../hooks/useListShipmentAudits';

import HistoryPagination from './HistoryPagination';
import HistoryTable from './HistoryTable';
import styles from './styles.module.css';

function History({ shipment_id }) {
	const { data, setFilters, filters, loading } = useListShipmentAudits({
		defaultFilters: {
			action_name: 'update_operating_instruction', shipment_id,
		},
	});

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
