import { Popover, Button, cl } from '@cogoport/components';
import React from 'react';

import DatesFilterContent from './DatesFilterContent';
import styles from './styles.module.css';

function DateFilter({
	children = null,
	controls = [],
	applyFilters = () => {},
	open = false,
	setOpen = () => {},
	isScrollable = true,
	name = 'APPLY',
	type = '',
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
	setSelectDuration = () => {},
}) {
	const className = type === 'date-range' ? 'date' : '';

	let width = '760px';
	if (controls?.length < 7) {
		width = 'fit-content';
	}

	return (

		<div
			className={cl`${styles.filter_box} ${styles[className]} ${isScrollable ? styles.scroll : ''}`}
			width={width}
		>
			<Popover
				theme="light"
				interactive
				animation="perspective"
				caret={false}
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
						setSelectDuration={setSelectDuration}
					/>
				)}
				visible={open}
				id="filter_popover"
			>
				{children || (
					<Button id="filter_btn" onClick={() => setOpen(!open)}>
						{name}
					</Button>
				)}
			</Popover>
		</div>

	);
}
export default DateFilter;
