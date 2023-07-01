import { Popover, Button, Input } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ filters = {}, setFilters = () => {} }) {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.open_filters}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					value={filters.q || ''}
					onChange={(val) => setFilters({
						...filters,
						q    : val,
						page : 1,
					})}
				/>

				<Popover
					render={(
						<FilterContent
							filters={filters}
							setShowPopover={setShowPopover}
							setFilters={setFilters}
							key={showPopover}
						/>
					)}
					placement="bottom"
					visible={showPopover}
					onClickOutside={() => setShowPopover(false)}
				>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => setShowPopover(!showPopover)}
						className={styles.filter_text}
					>
						<div className={styles.icon_wrapper}>
							<IcMFilter />
							&nbsp;
						</div>
						Filters
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Filters;
