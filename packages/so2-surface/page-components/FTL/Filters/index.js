import { Input, Popover, Button } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState, useContext } from 'react';

import DashboardContext from '../../../context/DashboardContext';

import FilterBy from './FilterBy';
import SortBy from './SortBy';
import styles from './styles.module.css';

function Filters() {
	const { filters = {}, setFilters = () => {} } = useContext(DashboardContext);
	const { q = '' } = filters || {};
	const [popoverFilter, setPopoverFilter] = useState({ ...(filters || {}) });
	const [showFilterPopover, setShowFilterPopover] = useState(false);
	const [showSortPopover, setShowSortPopover] = useState(false);

	return (
		<div className={styles.container}>

			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					value={q}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>
			</div>

			<div className={styles.popover_container}>
				<Popover
					placement="bottom"
					render={(
						<FilterBy
							popoverFilter={popoverFilter}
							setPopoverFilter={setPopoverFilter}
							setShowFilterPopover={setShowFilterPopover}
						/>
					)}
					visible={showFilterPopover}
					onClickOutside={() => setShowFilterPopover(false)}
				>
					<Button
						themeType="secondary"
						onClick={() => {
							setPopoverFilter(filters);
							setShowFilterPopover(!showFilterPopover);
						}}
					>
						<div className={styles.popover_button_text}>
							<IcMFilter height={16} width={16} />
							<span className={styles.button_text}> Filter By</span>
						</div>
					</Button>
				</Popover>
			</div>
			<div className={styles.popover_container}>
				<Popover
					placement="bottom"
					render={(
						<SortBy
							popoverFilter={popoverFilter}
							setPopoverFilter={setPopoverFilter}
							setShowSortPopover={setShowSortPopover}
						/>
					)}
					visible={showSortPopover}
					onClickOutside={() => setShowSortPopover(false)}
				>
					<Button
						themeType="secondary"
						onClick={() => {
							setPopoverFilter(filters);
							setShowSortPopover(!showSortPopover);
						}}
					>
						<div className={styles.popover_button_text}>
							<IcMFilter height={16} width={16} />
							<span className={styles.button_text}> Sort By</span>
						</div>
					</Button>
				</Popover>
			</div>
		</div>
	);
}
export default Filters;
