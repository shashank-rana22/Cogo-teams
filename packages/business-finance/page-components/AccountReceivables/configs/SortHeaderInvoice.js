import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SortHeaderInvoice({
	invoiceFilter,
	setInvoiceFilter,
	setOrderBy, sortStyleDesc,
	sortStyleAsc, type,
}) {
	return (
		<div
			role="presentation"
			className={styles.icon_div}
			onClick={() => {
				setOrderBy((prev) => ({
					sortType : prev.sortType === 'asc' ? 'desc' : 'asc',
					sortBy   : type,
				}));
				setInvoiceFilter({ ...invoiceFilter, page: 1 });
			}}
		>

			<IcMArrowRotateUp style={{ color: sortStyleAsc }} />

			<IcMArrowRotateDown style={{ color: sortStyleDesc }} />
		</div>
	);
}

export default SortHeaderInvoice;
