import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SortHeader({
	paymentFilters, setPaymentFilters, setOrderBy, sortStyleDesc,
	sortStyleAsc, type,
}) {
	return (
		<div
			role="presentation"
			className={styles.icon_div}
			onClick={() => {
				setOrderBy((prev) => ({
					sortType : prev.sortType === 'Asc' ? 'Desc' : 'Asc',
					sortBy   : type,
				}));
				setPaymentFilters({ ...paymentFilters, page: 1 });
			}}
		>
			<IcMArrowRotateUp style={{ color: sortStyleAsc }} />

			<IcMArrowRotateDown style={{ color: sortStyleDesc }} />
		</div>
	);
}

export default SortHeader;
