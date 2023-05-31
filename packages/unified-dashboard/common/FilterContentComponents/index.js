import { Popover, Button } from '@cogoport/components';
import React from 'react';

import DatesFilterContent from './DatesFilterContent';
import styles from './styles.module.css';

function Filters({
	children = null,
	controls = [],
	applyFilters = () => {},
	open = false,
	setOpen = () => {},
	name = 'APPLY',
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	let width = '760px;';
	if (controls?.length < 7) {
		width = 'fit-content';
	}

	return (
		<div
			className={styles.filter_box}
			width={width}
		>
			<Popover
				interactive
				placement="bottom"
				onClickOutside={() => setOpen(false)}
				content={(
					<DatesFilterContent
						applyFilters={applyFilters}
						setOpen={setOpen}
						date={date}
						setDate={setDate}
						range={range}
						setRange={setRange}
					/>
				)}
				visible={open}
			>
				{children || (
					<Button onClick={() => setOpen(!open)}>
						{name}
					</Button>
				)}
			</Popover>
		</div>
	);
}
export default Filters;
