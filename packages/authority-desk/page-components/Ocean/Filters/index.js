import { Popover, Button, Input } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ allFilters = {}, setAllFilters = () => {} }) {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<div className={styles.container}>

			<div className={styles.open_filters}>
				<Input
					placeholder="Search Shipments"
					type="search"
					size="sm"
					value={allFilters.filters.q || ''}
					onChange={(val) => {
						console.log(val, 'filtersss');

						setAllFilters({
							...allFilters,
							filters: {
								...(allFilters.filters || {}),
								q    : val,
								page : 1,
							},
						});
						console.log({ allFilters });
					}}
				/>

				<Popover
					render={(
						<FilterContent
							allFilters={allFilters}
							setShowPopover={setShowPopover}
							setAllFilters={setAllFilters}
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
