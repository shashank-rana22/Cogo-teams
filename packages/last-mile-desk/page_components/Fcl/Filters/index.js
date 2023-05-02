import { Toggle, Input, Popover, Button } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import { useState, useContext } from 'react';

import { CRITICAL_TABS } from '../../../configs/FCL_TABS';
import LastMileDeskContext from '../../../context/LastMileDeskContext';

import FilterBy from './FilterBy';
import styles from './styles.module.css';

function Filters() {
	const {
		activeTab, filters = {}, setFilters = () => {},
		scopeFilters, handleVersionChange = () => {},
	} = useContext(LastMileDeskContext);

	const { criticalOn, q = '' } = filters || {};

	const [popoverFilter, setPopoverFilter] = useState({ ...(filters || {}) });
	const [showPopover, setShowPopover] = useState(false);

	return (
		<div className={styles.container}>
			{Object.keys(CRITICAL_TABS).includes(activeTab) ? (
				<div className={styles.toggle_container}>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={criticalOn}
						onChange={() => setFilters({ ...filters, criticalOn: !criticalOn, page: 1 })}
					/>
				</div>
			) : null}

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
							setShowPopover={setShowPopover}
						/>
					)}
					visible={showPopover}
					onClickOutside={() => setShowPopover(false)}
				>
					<Button
						themeType="secondary"
						onClick={() => {
							setPopoverFilter(filters);
							setShowPopover(!showPopover);
						}}
					>
						<div className={styles.popover_button_text}>
							<IcMFilter height={16} width={16} />
							<span className={styles.button_text}> Filter By</span>
						</div>
					</Button>
				</Popover>
			</div>

			<div className={styles.version}>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
			</div>

			<div>
				<ScopeSelect size="md" defaultValues={scopeFilters} />
			</div>
		</div>
	);
}
export default Filters;
