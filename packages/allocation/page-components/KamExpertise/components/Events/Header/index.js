import { Button, Select } from '@cogoport/components';
import { useState } from 'react';

import SearchInput from '../../../../../common/SearchInput';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'NNM',
		value : 'nnm',
	},
];

function Header(props) {
	// Todo take it from params like in case of search
	const { params } = props;

	const [expertise, setExpertise] = useState('');

	return (
		<div>
			<div className={styles.all_events}>All Events</div>

			<div className={styles.header_container}>
				<div className={styles.filter_container}>
					<Select
						size="md"
						isClearable
						placeholder="Expertise"
						value={expertise}
						options={OPTIONS}
						onChange={(value) => setExpertise(value)}
						style={{ marginRight: 16 }}
					/>

					<SearchInput
						size="md"
						placeholder="Search"
                        // setGlobalSearch={setSearchValue}
						// debounceQuery={debounceQuery}
						// value={searchValue}
						// disabled={disabled}
						className={styles.search_bar}
					/>
				</div>

				<Button themeType="primary" size="md">
					Add New Event
				</Button>
			</div>
		</div>
	);
}

export default Header;
