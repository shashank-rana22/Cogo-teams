import { Input, Button, Select, Popover } from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

const sortByOptions = [
	{ label: 'Transit Time', value: 'transit_time' },
];

function Filters({ filters, setFilters }) {
	const handleFilter = (value, type) => {
		setFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
	};
	const [showPopover, setShowPopover] = useState(false);
	return (
		<div className={styles.outer_box}>
			<div className={styles.filter_search}>
				<Popover
					visible={showPopover}
					onClickOutside={() => {
						setShowPopover(false);
					}}
					Placement="right"
					render={(
						<PopoverContent setFilters={setFilters} setShowPopover={setShowPopover} />
					)}
				>
					<Button
						size="xl"
						themeType="secondary"
						styles={{ height: '40px' }}
						onClick={() => { setShowPopover(true); }}
					>
						<IcMFilter />
						Filters
					</Button>
				</Popover>

				<div className={styles.search}>
					<Input
						size="md"
						prefix={<IcMSearchlight />}
						placeholder="Search"
						onChange={(val) => { setFilters((prev) => ({ ...prev, q: val })); }}
					/>
				</div>
			</div>
			<div>
				<Select
					className={styles.filter_select}
					options={sortByOptions}
					placeholder="Sort By"
					value={filters?.sort_by}
					isClearable
					onChange={(value) => handleFilter(value, 'sort_by')}
				/>
			</div>
		</div>
	);
}

export default Filters;
