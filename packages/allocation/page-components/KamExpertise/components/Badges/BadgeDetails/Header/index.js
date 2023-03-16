import { Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import React from 'react';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const {
		badgeLength = 1,
		setToggleScreen = () => {},
		searchValue,
		setSearchValue = () => {},
		expertise,
		setExpertise = () => {},
		debounceQuery,
		setMasteryListData = () => {},
		setBadgeListData,
		loading,
	} = props;

	return (
		<div className={styles.header_container}>
			<div className={styles.filter_container}>

				<AsyncSelect
					placeholder="Expertise"
					size="sm"
					value={expertise}
					onChange={(value) => setExpertise(value)}
					asyncKey="expertise_configuration"
					multiple
					isClearable
					disabled={loading}
					className={styles.dropdown}
				/>

				<SearchInput
					size="sm"
					placeholder="Search"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
					className={styles.search_bar}
					disabled={loading}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					className={styles.button_mastery}
					disabled={loading}
					onClick={() => {
						setMasteryListData({});
						setToggleScreen('mastery');
					}}
				>
					Add Mastery
				</Button>

				<Button
					themeType="primary"
					size="md"
					className={styles.button_badge}
					onClick={() => {
						setBadgeListData({});
						setToggleScreen('create_badge');
					}}
				>
					{
						badgeLength
							? 'Add New Badge'
							: 'Create New Badge'
					}
				</Button>
			</div>
		</div>
	);
}

export default Header;
