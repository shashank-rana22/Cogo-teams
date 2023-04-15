import { Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const testCategoryOptions = [
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

			<div className={styles.input_container}>
				<Input
					size="sm"
					placeholder="Search Name/Topic"
					value={searchInput}
					suffix={<div className={styles.icon_container}><IcMSearchlight /></div>}
					onChange={handleSearchQuery}
				/>

				<div className={styles.select_container}>
					<Select
						size="sm"
						value={testCategory}
						placeholder="Select Test"
						options={testCategoryOptions}
						onChange={setTestCategory}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
