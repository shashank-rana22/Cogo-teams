import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	setFilters: React.Dispatch<React.SetStateAction<{}>>;
	filters: { sortType? :string };
}

function Header({ setFilters, filters }:Props) {
	return (
		<div className={styles.header}>
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
			<div className={styles.last_edit_date}>
				LAST EDITED ON
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
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
