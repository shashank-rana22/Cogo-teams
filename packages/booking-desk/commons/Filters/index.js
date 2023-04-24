import { Button, Input, Popover } from '@cogoport/components';
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

	return appliedFilters.map(([key, val]) => {
		const isClearable = key !== 'shipment_type';
		return (
			<>
				<span
					key={key}
					className={`${styles.applied_filter} ${isClearable ? styles.clearable : ''}`}
				>
					{key === 'isCriticalOn' ? 'Critical SIDs' : startCase(val)}
				</span>

				{isClearable ? (
					<button onClick={() => handleClearOneFilter(key)} className={styles.clear_filter_icon}>
						<IcMCross />
					</button>
				) : null}
			</>
		);
	});
}

export default function Filters({ stateProps }) {
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
						<div className={styles.button_content}>
							<IcMFilter />
							{' '}
						&ensp;Filters
						</div>
					</Button>
				</Popover>
			</div>
		</div>
	);
}
