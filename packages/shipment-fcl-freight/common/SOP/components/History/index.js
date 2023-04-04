import HistoryPagination from './HistoryPagination';
import HistoryTable from './HistoryTable';
import styles from './styles.module.css';

function History({
	data = {},
	setFilters = () => {},
	filters = {},
	loading = false,
}) {
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
