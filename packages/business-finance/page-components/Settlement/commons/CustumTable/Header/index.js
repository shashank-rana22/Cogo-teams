import { Checkbox } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ setFilters = () => {}, filters = {}, selectedJV = [], setSelectedJV = () => {}, list = [] }) {
	const allChecked = (list || []).map((item) => {
		if (item?.status !== 'POSTED') return item;
		return [];
	}).flat().length === selectedJV.length;

	const checkAllJV = () => {
		if (allChecked) {
			setSelectedJV([]);
		} else {
			list?.forEach((item) => {
				if (!selectedJV.includes(item?.jvNum) && item?.status !== 'POSTED') {
					setSelectedJV((pv) => [
						...pv,
						item.jvNum,
					]);
				}
			});
		}
	};

	return (
		<div className={styles.header}>
			<div className={styles.checkbox}>
				<Checkbox
					checked={allChecked && !isEmpty(list)}
					onChange={checkAllJV}
				/>
			</div>
			<div className={styles.jvnumb}>JV Number</div>
			<div className={styles.jvtype}>JV Type</div>
			<div className={styles.accdate}>
				Accounting Date
				<div className={styles.sorticons}>
					<IcMArrowRotateUp
						height={10}
						width={10}
						style={{ cursor: 'pointer' }}
						color={filters?.sortType === 'Asc' ? '#F68B21' : '#B9B9B9'}
						onClick={() => {
							setFilters((prev) => ({
								...prev,
								sortBy   : 'transactionDate',
								sortType : 'Asc',
								page     : 1,
							}));
						}}
					/>
					<IcMArrowRotateDown
						height={10}
						width={10}
						color={filters?.sortType === 'Desc' ? '#F68B21' : '#B9B9B9'}
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setFilters((prev) => ({
								...prev,
								sortBy   : 'transactionDate',
								sortType : 'Desc',
								page     : 1,
							}));
						}}
					/>
				</div>
			</div>
			<div className={styles.curr}>Currency</div>
			<div className={styles.entity}>Entity</div>
			<div className={styles.journal}>Journal</div>
			<div className={styles.exrate}>Exc. Rate</div>
			<div className={styles.legcurr}>Ledger Currency</div>
			<div className={styles.status}>Status</div>
			<div className={styles.dots} />
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
