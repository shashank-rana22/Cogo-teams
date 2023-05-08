import { Select, SingleDateRange } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization } from '@cogoport/forms/utils/getAsyncFields';
import { IcMCalendar } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import ListTables from './ListTables';
import Progress from './Progress';
import styles from './styles.module.css';

function Dashboard() {
	const [user, setUser] = useState('');
	const [date, setDate] = useState(new Date());
	const [searchValue, setSearchValue] = useState('');
	const [activeTab, setActiveTab] = useState('invited');
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsOrganization()));

	return (
		<>
			<div className={styles.header}>

				<div className={styles.title}>Referral Dashboard</div>
				<div className={styles.main_filters}>
					<Select
						value={user}
						onChange={setUser}
						placeholder="Select users here"
						options={countryOptions}
						className={styles.select_field}
					/>
					<SingleDateRange
						placeholder="From - To"
						dateFormat="MM/dd/yyyy"
						suffix={<IcMCalendar />}
						name="date"
						onChange={setDate}
						value={date}
					/>
				</div>
			</div>
			<Progress />
			<div className={styles.table_container}>
				<ListTables
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/>
			</div>
		</>
	);
}

export default Dashboard;
