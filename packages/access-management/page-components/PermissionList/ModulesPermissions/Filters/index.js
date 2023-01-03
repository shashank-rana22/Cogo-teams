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
	const content = () => (
		<div style={{ padding: '12px 8px' }}>
			<span>Navigation Status</span>
			<Chips
				items={[
					{ children: 'Assigned', key: 'assigned' },
					{ children: 'Not Assigned', key: 'not_assigned' },
					{ children: 'All', key: 'all' },
				]}
				enableMultiSelect
				selectedItems={navStatus}
				onItemChange={(val) => setNavStatus(val)}
			/>
		</div>
	);
	return (
		<section className={styles.container}>
			<SearchInput
				value={searchString}
				onChange={onChangeSearchNavigation}
				size="md"
				placeholder="Search Navigation"
			/>
			<Popover placement="left" render={content} interactive>
				<Button size="md">
					FILTER
					{' '}
					<IcMFilter />
				</Button>
			</Popover>
		</section>
	);
}

export default Filters;
