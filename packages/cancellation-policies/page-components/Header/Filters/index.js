import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import controls from './controls';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filters({ filterValues = () => {}, setFilterValues = () => {} }) {
	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				render={(
					<FilterContent
						filterValues={filterValues}
						setFilterValues={setFilterValues}
						controls={controls}
					/>
				)}
			>
				<div className={styles.filter_btn}>

					<IcMFilter
						width={14}
						height={14}
						style={{ marginRight: '10px' }}
					/>
					{' '}
					Filter By

				</div>
			</Popover>

		</div>
	);
}

export default Filters;
