import { ButtonIcon, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState, forwardRef } from 'react';

import FilterBy from './FilterBy';
import styles from './styles.module.css';

function Filters({ controls = [], filters = {}, setFilters = () => {} }, ref) {
	const [isFilterVisible, setIsFilterVisible] = useState(false);

	return (
		<div>
			<Popover
				className={styles.filter_container}
				visible={isFilterVisible}
				placement="bottom"
				onClickOutside={() => setIsFilterVisible(!isFilterVisible)}
				render={(
					<FilterBy
						controls={controls}
						setIsFilterVisible={setIsFilterVisible}
						filters={filters}
						setFilters={setFilters}
						ref={ref}
					/>
				)}
			>
				<ButtonIcon
					onClick={() => setIsFilterVisible(!isFilterVisible)}
					size="md"
					icon={<IcMFilter />}
					themeType="primary"
				/>
			</Popover>
		</div>
	);
}

export default forwardRef(Filters);
