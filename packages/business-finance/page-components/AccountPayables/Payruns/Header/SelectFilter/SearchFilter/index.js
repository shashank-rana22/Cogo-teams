import { Input, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { SHOW_TOGGLE_TAB_NAME } from '../../../constants';
import GetSearchCrossIcon from '../GetSearchCrossIcon';

import styles from './styles.module.css';

const SEARCH_PLACEHOLDER_MAPPING = {
	PAID           : 'Search by Invoice/SID/Supplier/UTR/BRN',
	UPLOAD_HISTORY : 'Search by File Name',
	isInvoiceView  : 'Search by Invoice/SID/Payrun/Supplier',
	selectedPayrun : 'Search by Invoice Number/SID',
	default        : 'Search by PayRun Name',
};

function SearchFilter({
	globalFilters = {},
	setGlobalFilters = () => {},
	activePayrunTab = '',
	isInvoiceView = false,
	selectedPayrun = null,
	setIsInvoiceView = () => {},
}) {
	const { search } = globalFilters;

	const searchType = SEARCH_PLACEHOLDER_MAPPING[activePayrunTab]
		|| (isInvoiceView && SEARCH_PLACEHOLDER_MAPPING.isInvoiceView)
		|| (selectedPayrun && SEARCH_PLACEHOLDER_MAPPING.selectedPayrun)
		|| SEARCH_PLACEHOLDER_MAPPING.default;

	return (
		<div className={styles.right_filter}>
			<div>
				<Input
					value={search || ''}
					size="sm"
					onChange={(value) => setGlobalFilters((prev) => ({ ...prev, search: value || undefined }))}
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
			{((SHOW_TOGGLE_TAB_NAME).includes(activePayrunTab))
				? (
					<div>
						{isEmpty(selectedPayrun)
							? (
								<Toggle
									name="isInvoiceView"
									value={isInvoiceView}
									onChange={() => setIsInvoiceView((prev) => (!prev))}
									showOnOff
									size="md"
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
