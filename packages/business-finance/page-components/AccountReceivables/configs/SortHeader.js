import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import { GenericObject } from '../commons/Interfaces';

import styles from './styles.module.css';

interface SortHeaderProps {
	paymentFilters?: GenericObject,
	setPaymentFilters?: (p: object) => void,
	setOrderBy?: (p: object) => void,
	sortStyleDesc?: string,
	sortStyleAsc?: string
	type?: string
}

function SortHeader({
	paymentFilters, setPaymentFilters, setOrderBy, sortStyleDesc,
	sortStyleAsc, type,
}: SortHeaderProps) {
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
