import { Toggle, Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select';
import { useState, useContext } from 'react';

import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsDateFilterVisible from '../../helpers/getIsDateFilterVisible';

import FilterBy from './FilterBy';
import styles from './styles.module.css';

function Filters() {
	const {
		filters = {}, scopeFilters,
		handleVersionChange = () => {}, shipmentType, stepperTab,
	} = useContext(CostBookingDeskContext);

	const [popoverFilter, setPopoverFilter] = useState({ ...(filters || {}) });
	const [showPopover, setShowPopover] = useState(false);

	const isDateFilterVisible = getIsDateFilterVisible({ shipmentType, stepperTab });

	return (
		<div className={styles.container}>

			{isDateFilterVisible ? (
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
								// setPopoverFilter(filters);
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
			) : null}

			<div className={styles.version}>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
			</div>

			<ScopeSelect size="md" defaultValues={scopeFilters} />
		</div>
	);
}
export default Filters;
