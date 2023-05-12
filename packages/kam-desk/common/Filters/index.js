import { Toggle, Input, Popover, Button } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState, useContext, useEffect } from 'react';

import { CRITICAL_TABS } from '../../config/SHIPMENTS_PAYLOAD';
import KamDeskContext from '../../context/KamDeskContext';

import FilterBy from './FilterBy';
import styles from './styles.module.css';

function Filters() {
	const { stepperTab, activeTab, filters = {}, setFilters = () => {}, shipmentType } = useContext(KamDeskContext);

	const [popoverFilter, setPopoverFilter] = useState({ ...(filters || {}) });

	const [showPopover, setShowPopover] = useState(false);

	const isCriticalVisible = !!CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[activeTab];

	useEffect(() => {
		setPopoverFilter({ ...(filters || {}) });
	}, [filters]);

	return (
		<div className={styles.container}>
			{isCriticalVisible ? (
				<div className={styles.toggle_container}>
					<Toggle
						size="md"
						offLabel="Critical SIDs"
						checked={filters.criticalOn}
						onChange={() => setFilters({ ...filters, criticalOn: !filters.criticalOn, page: 1 })}
					/>
				</div>
			) : null}

			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					value={filters.q}
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
		</div>
	);
}
export default Filters;
