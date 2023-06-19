import { Checkbox } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

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
				<div className={styles.sorticons}>
					<IcMArrowRotateUp
						height={10}
						width={10}
						style={{ cursor: 'pointer' }}
						color={filters?.sortType === 'Asc'
							? '--color-accent-orange-2' : '--color-secondary-greyscale-4'}
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
						color={filters?.sortType === 'Desc'
							? '--color-accent-orange-2' : '--color-secondary-greyscale-4'}
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
			<div className={styles.last_edit_date}>
				LAST EDITED ON
				<div className={styles.sorticons}>
					<IcMArrowRotateUp
						height={10}
						width={10}
						style={{ cursor: 'pointer' }}
						color={filters?.sortType === 'Asc'
							? '--color-accent-orange-2' : '--color-secondary-greyscale-4'}
						onClick={() => {
							setFilters((prev) => ({
								...prev,
								sortBy   : 'lastEditedDate',
								sortType : 'Asc',
								page     : 1,
							}));
						}}
					/>
					<IcMArrowRotateDown
						height={10}
						width={10}
						color={filters?.sortType === 'Desc'
							? '--color-accent-orange-2' : '--color-secondary-greyscale-4'}
						style={{ cursor: 'pointer' }}
						onClick={() => {
							setFilters((prev) => ({
								...prev,
								sortBy   : 'lastEditedDate',
								sortType : 'Desc',
								page     : 1,
							}));
						}}
					/>
				</div>
			</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
