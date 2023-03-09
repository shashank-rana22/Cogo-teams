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

function Header(props) {
	const {
		badgeList,
		toggleScreen,
		setToggleScreen = () => {},
		searchValue,
		setSearchValue = () => {},
		debounceQuery,
		setMasteryListData = () => {},
		setBadgeListData,
	} = props;

	const [expertise, setExpertise] = useState('');

	return (
		<div className={styles.header_container}>
			<div className={styles.filter_container}>
				<Select
					size="sm"
					isClearable
					placeholder="Expertise"
					value={expertise}
					options={OPTIONS}
					onChange={(value) => setExpertise(value)}
					className={styles.dropdown}
					disabled={toggleScreen === 2 || toggleScreen === 3}
				/>

				<SearchInput
					size="sm"
					placeholder="Search"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
					// disabled={disabled}
					className={styles.search_bar}
					disabled={toggleScreen === 2 || toggleScreen === 3}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					className={styles.button_mastery}
					onClick={() => {
						setMasteryListData({});
						setToggleScreen(2);
					}}
					disabled={toggleScreen === 2}
				>
					Add Mastery
				</Button>

				<Button
					themeType="primary"
					size="md"
					className={styles.button_badge}
					onClick={() => {
						setBadgeListData({});
						setToggleScreen(3);
					}}
					disabled={toggleScreen === 3}
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
