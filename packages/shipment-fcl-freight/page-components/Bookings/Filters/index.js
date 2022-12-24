import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import DateFilters from './DateFilters';
import FieldFilters from './FieldFilters';
import styles from './styles.module.css';

function Filters() {
	return (
		<div className={styles.filter_container}>
			<DateFilters />
			<div className={styles.search_container}>
				<Input
					suffix={(
						<IcMSearchlight
							height={15}
							width={15}
						/>
					)}
					placeholder="Customer, SID, Container No, Booking No"
				/>
			</div>
			<FieldFilters />
		</div>
	);
}
export default Filters;
