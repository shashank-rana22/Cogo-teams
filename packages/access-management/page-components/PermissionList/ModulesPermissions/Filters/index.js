import { Popover, Chips, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Filters({
	searchString = '',
	onChangeSearchNavigation = () => {},
	navStatus = {},
	setNavStatus = () => {},
}) {
	const content = (
		<section className={styles.filters_popover_content}>
			<span>Navigation Status</span>
			<Chips
				className={styles.chips_container}
				items={[
					{ children: 'Assigned', key: 'assigned' },
					{ children: 'Not Assigned', key: 'not_assigned' },
					{ children: 'All', key: 'all' },
				]}
				selectedItems={navStatus}
				onItemChange={(val) => setNavStatus(val)}
			/>
		</section>
	);
	return (
		<section className={styles.container}>
			<SearchInput
				value={searchString}
				onChange={onChangeSearchNavigation}
				size="md"
				placeholder="Search Navigation"
			/>
			<Popover placement="top" render={content} interactive className={styles.filters_popover}>
				<Button themeType="tertiary" size="lg">
					Filters
					{' '}
					<IcMFilter />
				</Button>
			</Popover>
		</section>
	);
}

export default Filters;
