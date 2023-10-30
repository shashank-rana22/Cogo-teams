import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

function BookingParamsMapping({ bookingParams = [] }) {
	return (
		<div className={styles.wrap}>
			Packages &nbsp;
			{
	(bookingParams || []).map((item) => {
		const { length = 0, width = 0, height = 0 } = item || {};
		const dimension = length
			? `${length}cm X ${width}cm X ${height}cm,`
			: '';

		return (
			<div key={item.id}>
				{item
					? (
						<div style={{ width: 'fit-content' }}>
							{`${item.packages_count} Pkg`}
							{dimension ? `(${dimension}) ` : ''}
							{startCase(item.packing_type || '')}
						</div>
					)
					: null}
			</div>
		);
	})
	}
		</div>
	);
}
export default BookingParamsMapping;
