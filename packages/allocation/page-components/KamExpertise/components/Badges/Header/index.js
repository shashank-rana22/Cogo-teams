import { Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import SearchInput from '../../../../../common/SearchInput';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'NNM',
		value : 'nnm',
	},
];

function Header({ badgeList, setCreateBadge }) {
	const [searchValue, setSearchValue] = useState('Search');
	const [disabled, setDisabled] = useState(true);
	const [expertise, setExpertise] = useState('');
	return (
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
					value={searchValue}
					disabled={disabled}
					className={styles.search_bar}
				/>
			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" size="md" className={styles.button}>
					Mastery
				</Button>

				<Button
					themeType="primary"
					size="md"
					onClick={() => {
						setCreateBadge((pv) => !pv);
					}}
				>
					{
						badgeList
							? 'Add New Badge'
							: 'Create New Badge'
					}
				</Button>
			</div>
		</div>
	);
}

export default Header;
