import { Checkbox } from '@cogoport/components';
import React from 'react';

import Sort from './Sort';
import styles from './styles.module.css';

interface Props {
	setFilters: React.Dispatch<React.SetStateAction<{}>>;
	filters: { sortType? :string };
	loading: boolean;
	showHeaderCheckbox: boolean;
	isAllChecked: boolean;
	onChangeTableHeaderCheckbox: (event: object) => void;
}

function Header({
	setFilters, filters,
	isAllChecked, onChangeTableHeaderCheckbox, showHeaderCheckbox, loading,
}:Props) {
	return (
		<div className={styles.header}>
			<div className={styles.checkbox}>
				{showHeaderCheckbox ? (
					<Checkbox
						onChange={onChangeTableHeaderCheckbox}
						checked={isAllChecked}
						disabled={loading}
					/>
				) : null}
			</div>
			<div className={styles.refnumb}>
				REF. NUMBER
			</div>
			<div className={styles.amount}>AMOUNT</div>
			<div className={styles.utilized}>UTILIZED</div>

			<div className={styles.balance}>BALANCE</div>

			<div className={styles.trandate}>
				TRANSACTION DATE
				<Sort sortBy="transactionDate" filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.last_edit_date}>
				LAST EDITED ON
				<Sort sortBy="lastEditedDate" filters={filters} setFilters={setFilters} />

			</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
