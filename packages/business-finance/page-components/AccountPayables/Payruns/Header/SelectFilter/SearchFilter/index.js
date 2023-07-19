import { Input, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import GetSearchCrossIcon from '../GetSearchCrossIcon';

import styles from './styles.module.css';

function SearchFilter({
	globalFilters = {}, setGlobalFilters = () => {},
	activePayrunTab = '', isInvoiceView = false, selectedPayrun = null, setIsInvoiceView = () => {},
}) {
	const { search } = globalFilters;
	let searchType = '';
	if (activePayrunTab === 'PAID') {
		searchType = 'Search by Invoice/SID/Supplier/UTR/BRN';
	} else if (activePayrunTab === 'UPLOAD_HISTORY') {
		searchType = 'Search by File Name';
	} else if (isInvoiceView) {
		searchType = 'Search by Invoice/SID/Payrun/Supplier ';
	} else if (selectedPayrun) {
		searchType = 'Search by Invoice Number/SID';
	} else {
		searchType = 'Search by PayRun Name';
	}
	return (
		<div className={styles.right_filter}>
			<div>
				<Input
					value={search || ''}
					size="sm"
					onChange={(value) => setGlobalFilters({
						...globalFilters,
						search: value || undefined,
					})}
					className={styles.search_filter}
					placeholder={searchType}
					suffix={(
						<GetSearchCrossIcon
							globalFilters={globalFilters}
							setGlobalFilters={setGlobalFilters}
						/>
					)}
				/>
			</div>
			{(['AUDITED', 'PAYMENT_INITIATED', 'COMPLETED', 'INITIATED'].includes(activePayrunTab))
				? (
					<div>
						{isEmpty(selectedPayrun)
							? (
								<Toggle
									name="isInvoiceView"
									value={isInvoiceView}
									onChange={() => setIsInvoiceView(!isInvoiceView)}
									showOnOff
									size="md"
									disabled={false}
									onLabel="Invoices"
									offLabel="Payrun"
								/>
							)
							: null}
					</div>
				)
				: null}
		</div>
	);
}

export default SearchFilter;
