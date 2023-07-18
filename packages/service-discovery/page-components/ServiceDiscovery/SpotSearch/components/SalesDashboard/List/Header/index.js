import { isEmpty } from '@cogoport/utils';
import React from 'react';

import SearchInput from '../../../../../../../common/SearchInput';

import ExtraFilters from './ExtraFilters';
import FilterButton from './FilterFormButton';
import styles from './styles.module.css';

function Header({
	filters = {},
	filterProps = {},
	setFilters = () => {},
	type = '',
	serviceType = '',
	setServiceType = () => {},
}) {
	const {
		controls = [],
		searchKey = null,
		searchPlaceholder = null,
	} = filterProps;

	const otherFilters = filters || {};

	// const searchParam = searchKey ? { [searchKey]: filters?.[searchKey] } : {};

	let searchBar = null;

	if (searchKey) {
		searchBar = (
			<SearchInput
				type="search"
				style={{ marginRight: 8 }}
				onChange={(val) => {
					setFilters({
						...otherFilters,
						[searchKey] : val,
						page        : 1,
					});
				}}
				size="sm"
				value={filters?.[searchKey]}
				placeholder={searchPlaceholder || 'Org Name email phone'}
			/>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.search_bar}>
				{searchBar}
			</div>

			<div className={styles.extra_filters}>
				<ExtraFilters
					type={type}
					filters={filters}
					serviceType={serviceType}
					setFilters={setFilters}
					setServiceType={setServiceType}
				/>
			</div>

			{!isEmpty(controls) ? (
				<FilterButton
					controls={controls}
					filters={filters}
					setFilters={setFilters}
				/>
			) : null}
		</div>
	);
}

export default Header;
