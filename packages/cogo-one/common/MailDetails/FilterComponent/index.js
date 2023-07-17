import { Badge, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import PopoverComponent from './PopoverComponent';
import styles from './styles.module.css';

function FilterComponent({
	searchQuery = '',
	appliedFiltersCount = 0,
	appliedFilters = {},
	setAppliedFilters = () => {},
}) {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<Popover
			placement="right"
			visible={showPopover}
			className={styles.popover_component}
			render={(
				showPopover && (
					<PopoverComponent
						searchQuery={searchQuery}
						appliedFilters={appliedFilters}
						setAppliedFilters={setAppliedFilters}
						setShowPopover={setShowPopover}
					/>
				)
			)}
		>
			{appliedFiltersCount
				? (
					<Badge color="orange">
						<IcMFilter
							className={styles.filter_icon}
							onClick={() => setShowPopover((prev) => !prev)}
						/>
					</Badge>
				)
				: (
					<IcMFilter
						className={styles.filter_icon}
						onClick={() => setShowPopover((prev) => !prev)}
					/>
				)}
		</Popover>
	);
}

export default FilterComponent;
