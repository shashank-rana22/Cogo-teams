import { Button, Input, Pill, Popover } from '@cogoport/components';
import { IcMCross, IcMFilter } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

function renderAppliedFilters({ appliedFilters, setFilters }) {
	const handleClearOneFilter = (filterKey) => {
		setFilters((prevFilters) => {
			const { [filterKey]: filterToRemove, ...restFilters } = prevFilters;
			return { ...restFilters, page: 1 };
		});
	};

	return appliedFilters.map(([key, val]) => (
		<Pill
			color="blue"
			className={styles.applied_filter}
			suffix={key !== 'shipment_type' && <IcMCross onClick={() => handleClearOneFilter(key)} />}
		>
			{key === 'isCriticalOn' ? 'Critical SIDs' : startCase(val)}
		</Pill>
	));
}

export default function Filters({ stateProps, tabs }) {
	const [showPopover, setShowPopover] = useState(false);
	const { filters, setFilters } = stateProps;

	const appliedFilters = Object.entries(filters)
		.filter(([key, val]) => !isEmpty(val) && !['page', 'q'].includes(key) && val !== false);

	return (
		<div className={styles.container}>
			<div className={styles.applied_filters}>
				{renderAppliedFilters({ appliedFilters, setFilters })}
			</div>

			<div className={styles.open_filters}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					value={filters.q || ''}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>

				<Popover
					render={(
						<PopoverContent
							stateProps={stateProps}
							tabs={tabs}
							setShowPopover={setShowPopover}
							key={showPopover}
						/>
					)}
					placement="bottom"
					visible={showPopover}
					onClickOutside={() => setShowPopover(false)}
				>
					<Button
						themeType="secondary"
						size="sm"
						onClick={() => setShowPopover(!showPopover)}
						className={styles.filter_text}
					>
						<IcMFilter />
						{' '}
						Filters
					</Button>
				</Popover>
			</div>
		</div>
	);
}
