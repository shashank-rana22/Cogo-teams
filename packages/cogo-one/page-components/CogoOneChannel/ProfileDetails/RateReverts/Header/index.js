import { Popover, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { FilterModal } from '../../../../../common/SmtRateReverts';
import { getAppliedFilters } from '../../../../../helpers/getRateRevertsHeaderFunctions';

import styles from './styles.module.css';

function Header({
	params = {},
	setParams = () => {},
}) {
	const [showFilters, setShowFilters] = useState(false);

	const {
		isFiltersApplied = false,
		filterValues = {},
		defaultValues = {},
	} = getAppliedFilters({ params, triggeredFrom: 'sideBar' });

	return (
		<div className={styles.header}>
			<div>Rate Reverts</div>

			<Popover
				placement="left"
				interactive
				visible={showFilters}
				render={(showFilters ? (
					<FilterModal
						filterValues={filterValues}
						defaultValues={defaultValues}
						setParams={setParams}
						setShowFilters={setShowFilters}
						triggeredFrom="sideBar"
					/>
				) : null
				)}
				onClickOutside={() => setShowFilters(false)}
			>
				{isFiltersApplied ? (
					<Badge color="orange">
						<IcMFilter
							className={styles.filter_icon}
							onClick={() => setShowFilters((prev) => !prev)}
						/>
					</Badge>
				) : (
					<IcMFilter
						className={styles.filter_icon}
						onClick={() => setShowFilters((prev) => !prev)}
					/>
				)}
			</Popover>
		</div>
	);
}

export default Header;
