import { Checkbox } from '@cogoport/components';

import SortIcon from './SortIcon';
import styles from './styles.module.css';

function Header(
	{
		setGlobalFilters,
		globalFilters,
		onChangeTableHeaderCheckbox,
		isAllChecked,
		showHeaderCheckbox,
		loading,
	},
) {
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
			<div className={styles.customer_name}>Customer Name</div>
			<div className={styles.customer_id}>Customer ID</div>
			<div className={styles.cogo_bank}>Cogo Bank</div>
			<div className={styles.doc_value}>Doc. Value</div>
			<div className={styles.amount}>
				Amount
				<SortIcon
					setFilters={setGlobalFilters}
					filters={globalFilters}
					sortingKey="amount"
				/>
			</div>
			<div className={styles.upload}>
				Uploaded by and on
				<SortIcon
					setFilters={setGlobalFilters}
					filters={globalFilters}
					sortingKey="transactionDate"
				/>
			</div>
			<div className={styles.utr}>UTR</div>
			<div className={styles.status}>Status</div>
			<div className={styles.accord} />
		</div>
	);
}

export default Header;
