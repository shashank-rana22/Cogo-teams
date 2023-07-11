import { Button, Input, TabPanel, Tabs, Toggle } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Filter from '../../../../commons/Filters/index.tsx';

import { INVOICE_VIEW_FILTERS } from './invoiceViewFilterControl';
import { PAYRUNS_BANK_DATE_FILTERS } from './payrunPaidFilterControls';
import styles from './styles.module.css';
import { UPLOAD_HISTORY_FILTERS } from './uploadHistoryFilterControl';

function GetIcon({ globalFilters = {}, setGlobalFilters = () => {} }) {
	if (isEmpty(globalFilters.search)) {
		return (
			<div className={styles.icon_wrapper}>
				<IcMSearchlight />
			</div>
		);
	}
	return (
		<div className={styles.icon_wrapper}>
			<IcMCross
				onClick={() => setGlobalFilters((prev) => ({ ...prev, search: '' }))}
				style={{ cursor: 'pointer', color: '#000000' }}
			/>
		</div>
	);
}

function SelectFilters({
	globalFilters,
	setGlobalFilters,
	isInvoiceView,
	activePayrunTab,
	setIsInvoiceView,
	overseasData,
	setOverseasData,
}) {
	const { search } = globalFilters || {};

	let searchType;

	if (activePayrunTab === 'PAID') {
		searchType = 'Search by Invoice/SID/Supplier/UTR/BRN';
	} else if (activePayrunTab === 'UPLOAD_HISTORY') {
		searchType = 'Search by File Name';
	} else if (isInvoiceView) {
		searchType = 'Search by Invoice/SID/Payrun/Supplier ';
	} else {
		searchType = 'Search by PayRun Name';
	}
	// const flatBankDetails = [];
	const getchooseFilters = () => {
		if (activePayrunTab === 'PAID') {
			return PAYRUNS_BANK_DATE_FILTERS(overseasData);
		}
		if (activePayrunTab === 'UPLOAD_HISTORY') {
			return UPLOAD_HISTORY_FILTERS;
		}
		if (activePayrunTab !== 'PAID' && isInvoiceView) {
			return INVOICE_VIEW_FILTERS;
		}
		return [];
	};
	const chooseFilters = getchooseFilters();

	return (

		<div className={styles.filter_container}>
			<div className={activePayrunTab === 'PAID' ? styles.sub_container : styles.right_filter}>
				<Filter
					filters={globalFilters}
					setFilters={setGlobalFilters}
					controls={chooseFilters}
				/>
				{(['AUDITED', 'PAYMENT_INITIATED',
					'COMPLETED', 'PAID'].includes(activePayrunTab) && !isInvoiceView)
					? (
						<Tabs themeType="tertiary" activeTab={overseasData} onChange={setOverseasData}>
							<TabPanel title="Domestic" name="NORMAL" />
							{activePayrunTab !== 'PAID'
								? <TabPanel title="Overseas" name="OVERSEAS" /> : null}
							<TabPanel title="Adv.Payment" name="ADVANCE_PAYMENT" />
						</Tabs>
					)
					: null}

			</div>
			<div className={styles.right_filter}>
				<div>
					<Input
						value={search || ''}
						onChange={(value) => setGlobalFilters({
							...globalFilters,
							search: value || undefined,
						})}
						style={{ width: '360px', marginRight: '8px' }}
						placeholder={searchType}
						suffix={<GetIcon globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} />}
					/>
				</div>
				{(['AUDITED', 'PAYMENT_INITIATED', 'COMPLETED', 'INITIATED'].includes(activePayrunTab))
					? (
						<div>
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
						</div>
					)
					: null}
				{activePayrunTab === 'INITIATED' && !isInvoiceView
				&& (
					<Button>
						Go To Audit
					</Button>
				)}
				{activePayrunTab === 'AUDITED' && !isInvoiceView
				&& (
					<Button>
						ALLOT BANK
					</Button>
				)}
				{activePayrunTab === 'UPLOAD_HISTORY'
				&& (
					<Button disabled>
						UPLOAD BULK UTR
					</Button>
				)}
				{activePayrunTab === 'PAID' && overseasData !== 'ADVANCE_PAYMRNT'
				&& (
					<Button themeType="secondary">
						SEND REPORT
					</Button>
				)}
			</div>
		</div>

	);
}

export default SelectFilters;
