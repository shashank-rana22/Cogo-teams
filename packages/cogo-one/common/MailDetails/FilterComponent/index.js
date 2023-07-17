import { Badge, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getFiltersCount from '../../../helpers/getFiltersCount';

import PopoverComponent from './PopoverComponent';
import styles from './styles.module.css';

function FilterComponent() {
	const [showPopover, setShowPopover] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState(null);

	const appliedFiltersCount = getFiltersCount({ filters: appliedFilters });

	return (
		<Popover
			placement="right"
			visible={showPopover}
			className={styles.popover_component}
			render={(
				<PopoverComponent
					appliedFilters={appliedFilters}
					setAppliedFilters={setAppliedFilters}
					setShowPopover={setShowPopover}
				/>
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
