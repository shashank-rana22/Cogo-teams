import { Input, Popover, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import { useState, useContext, useEffect } from 'react';

import DashboardContext from '../../../context/DashboardContext';

import FilterBy from './FilterBy';
import SortBy from './SortBy';
import styles from './styles.module.css';

function Filters() {
	const { filters = {}, setFilters = () => {} } = useContext(DashboardContext);
	const [popoverFilter, setPopoverFilter] = useState({ ...(filters || {}) });
	const [showFilterPopover, setShowFilterPopover] = useState(false);
	const [showSortPopover, setShowSortPopover] = useState(false);

	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		setFilters((prev) => ({ ...prev, q: query, page: 1 }));
	}, [query, setFilters]);

	return (
		<div className={styles.container}>

			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					onChange={(val) => debounceQuery(val)}
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
			<ScopeSelect size="md" />
		</div>
	);
}
export default Filters;
