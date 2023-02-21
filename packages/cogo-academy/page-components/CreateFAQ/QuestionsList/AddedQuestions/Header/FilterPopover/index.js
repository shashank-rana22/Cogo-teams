/* eslint-disable max-len */
import { Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function FilterPopover() {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<Popover
			caret={false}
			trigger="click"
			placement="bottom"
			render={<FilterContent />}
		>
			<div
				role="presentation"
				className={styles.filters}
				onClick={() => {
					setShowFilter(!showFilter);
				}}
			>
				<div>Filter By</div>
				<IcMArrowDown
					width={16}
					height={16}
					className={` ${styles.caret_arrow} ${showFilter && styles.caret_active}`}
				/>
			</div>

		</Popover>
	);
}

export default FilterPopover;
