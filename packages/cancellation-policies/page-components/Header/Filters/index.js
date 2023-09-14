import { Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import controls from './controls';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ filterValues = () => {}, setFilterValues = () => {} }) {
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				render={(
					<FilterContent
						filterValues={filterValues}
						setFilterValues={setFilterValues}
						controls={controls}
						visible={isFilterVisible}
						setVisible={setIsFilterVisible}
					/>
				)}
				onClickOutside={() => { setIsFilterVisible(!isFilterVisible); }}
				visible={isFilterVisible}
			>
				<Button
					themeType="secondary"
					onClick={() => { setIsFilterVisible(!isFilterVisible); }}

				>

					<IcMFilter
						width={14}
						height={14}
						style={{ marginRight: '10px' }}
					/>
					{' '}
					Filter By

				</Button>
			</Popover>

		</div>
	);
}

export default Filters;
