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
			<div className={styles.jvnumb}>JV Number</div>
			<div className={styles.jvtype}>JV Type</div>
			<div className={styles.accdate}>
				Accounting Date
				<div className={styles.sorticons}>
					<IcMArrowRotateUp
						height={10}
						width={10}
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
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
