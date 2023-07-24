import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import FilterContainer from '../FilterContainer';
import styles from '../styles.module.css';

function FilterButton(props) {
	return (
		<div className={styles.filters_container}>
			<Popover
				render={<FilterContainer {...props} />}
				placement="bottom-end"
				interactive
			>
				<Button
					id="dash-main-globalFilters"
					themeType="secondary"
				>
					<IcMFilter className={styles.filter_icon} />
					{props?.showText && <span className={styles.btn_label}>Filter</span>}
				</Button>
			</Popover>
		</div>
	);
}

export default FilterButton;
