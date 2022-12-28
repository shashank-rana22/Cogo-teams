import { useState } from 'react';

import Filters from './Filters.';
import useGetListRfqs from './hooks/useGetListRfqs';
import List from './List';
import styles from './styles.module.css';

function RfqEnquiries() {
	const [rfq, setRfq] = useState(null);
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
			{!rfq ? (
				<div>
					<div className={styles.heading}>RFQ (Rate For Quotation)</div>
					<div className={styles.line} />
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
								setRfq={setRfq}
							/>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
export default RfqEnquiries;
