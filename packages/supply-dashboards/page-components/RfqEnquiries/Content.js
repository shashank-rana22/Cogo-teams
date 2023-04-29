import Filters from './Filters.';
import useGetListRfqs from './hooks/useGetListRfqs';
import List from './List';
import MonthyStats from './MonthyStats';
import styles from './styles.module.css';

function RfqEnquiries() {
	const {
		loading,
		filters,
		list,
		hookSetters,
		refetch,
	} = useGetListRfqs();

	return (
		<>
			{' '}
			<div className={styles.rfq}>
				<div className={styles.heading}>RFQ (Rate For Quotation)</div>
				<div className={styles.line} />
				<div className={styles.stats}>
					<MonthyStats />
				</div>
				<div className={styles.body}>
					<div className={styles.filter}>
						<Filters
							filters={filters}
							hookSetters={hookSetters}
							refetch={refetch}
						/>
					</div>
					<div className={styles.cardlist}>
						<List
							list={list}
							loading={loading}
							filters={filters}
							hookSetters={hookSetters}
							refetch={refetch}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default RfqEnquiries;
