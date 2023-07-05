import { Checkbox } from '@cogoport/components';
import { ChangeEvent } from 'react';

import SortIcon from './SortIcon';
import styles from './styles.module.css';

interface GlobalInterface {
	page?: number;
	pageLimit?: number;
	accMode?: string;
	search?: string;
	date?: {
		startDate?: Date;
		endDate?: Date;
	};
	paymentDocumentStatus?: string;
	docType?: string;
	sortBy?: string;
	sortType?: string;
}

interface HeaderInterface {
	setGlobalFilters?: React.Dispatch<React.SetStateAction<GlobalInterface>>;
	globalFilters?: GlobalInterface;
	onChangeTableHeaderCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	isAllChecked: boolean;
	showHeaderCheckbox: boolean;
	loading?: boolean;
}

function Header(
	{
		setGlobalFilters,
		globalFilters,
		onChangeTableHeaderCheckbox,
		isAllChecked,
		showHeaderCheckbox,
		loading,
	}: HeaderInterface,
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
			<div className={styles.entity}>Entity</div>
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
