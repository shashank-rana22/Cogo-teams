import { Popover, Button, Input } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ stateProps = {} }) {
	const [showPopover, setShowPopover] = useState(false);

	const { filters, setFilters } = stateProps;

	return (
		<div className={styles.container}>

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
						<FilterContent
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
						<IcMFilter />
						{' '}
						Filters
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Filters;
