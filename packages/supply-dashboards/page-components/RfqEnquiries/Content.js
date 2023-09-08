import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import Filters from './Filters';
import useGetListRfqs from './hooks/useGetListRfqs';
import List from './List';
import MonthyStats from './MonthyStats';
import styles from './styles.module.css';

function RfqEnquiries() {
	const [revelantToUser, setRevelantToUser] = useState(true);
	const {
		loading,
		filters,
		list,
		hookSetters,
		refetch,
	} = useGetListRfqs({ revelantToUser });
	const onChange = () => {
		setRevelantToUser((prev) => !prev);
	};
	return (
		<>
			{' '}
			<div className={styles.rfq}>
				<div className={styles.head}>
					<div className={styles.heading}>RFQ (Rate For Quotation)</div>
					<div className={styles.toggle_text}>
						<Toggle
							name="revelant_to_user"
							size="md"
							value={!revelantToUser}
							offLabel="Revelant To Me"
							onLabel="All"
							onChange={onChange}
						/>
					</div>

				</div>
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
