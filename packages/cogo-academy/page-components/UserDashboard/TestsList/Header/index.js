import { Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const testCategoryOptions = [
	{
		label : 'All Tests',
		value : 'all',
	},
	{
		label : 'Active',
		value : 'active_test',
	},
	{
		label : 'Ongoing',
		value : 'ongoing',
	},
	{
		label : 'Upcoming',
		value : 'upcoming',
	},
	{
		label : 'Completed',
		value : 'completed',
	},
	{
		label : 'Expired',
		value : 'expired',
	},
	{
		label : 'Results Published',
		value : 'published',
	},
];

function Header({ debounceQuery, testCategory, setTestCategory }) {
	const [searchInput, setSearchInput] = useState('');

	const handleSearchQuery = (obj) => {
		setSearchInput(obj);

		debounceQuery(obj);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Tests</div>

			<div className={styles.filters}>
				<div className={styles.input_container}>
					<div className={styles.label}>Quick Search</div>

					<Input
						size="sm"
						placeholder="Search Name/Topic"
						value={searchInput}
						suffix={<div className={styles.icon_container}><IcMSearchlight /></div>}
						onChange={handleSearchQuery}
					/>
				</div>

				<div className={styles.select_container}>
					<div className={styles.label}>Select Status</div>

					<Select
						size="sm"
						value={testCategory}
						options={testCategoryOptions}
						onChange={setTestCategory}
						placeholder="Select Test"
					/>
				</div>
			</div>

			<div className={styles.sub_heading}>
				<i>
					{`If you're having trouble locating a specific test, select
					"Ongoing" or "Completed" status from the test status list.`}
				</i>
			</div>
		</div>
	);
}

export default Header;
