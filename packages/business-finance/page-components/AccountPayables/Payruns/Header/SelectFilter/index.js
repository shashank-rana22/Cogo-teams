import { Input, TabPanel, Tabs, Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import PayrunButtons from '../PayrunButtons/index';

import getChooseFilterControls from './GetChooseFilterControls';
import GetSearchCrossIcon from './GetSearchCrossIcon';
import styles from './styles.module.css';

function SelectFilters({
	globalFilters = {},
	setGlobalFilters = () => {},
	isInvoiceView = false,
	activePayrunTab = '',
	setIsInvoiceView = () => {},
	overseasData = '',
	setOverseasData = () => {},
	selectedPayrun = null,
	setSelectedPayrun = () => {},
	checkedRow = null,
	setCheckedRow = () => {},
	itemData = {},
	activeEntity = '',
	refetch = () => {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	const { search } = globalFilters || {};
	let searchType;

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

		<div className={styles.filter_container}>
			{isEmpty(selectedPayrun)
				? (
					<div className={activePayrunTab === 'PAID' ? styles.sub_container : styles.right_filter}>
						<Filter
							filters={globalFilters}
							setFilters={setGlobalFilters}
							controls={getChooseFilterControls({ activePayrunTab, overseasData, isInvoiceView })}
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
				)
				: null}
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
				<div>
					<PayrunButtons
						activePayrunTab={activePayrunTab}
						isInvoiceView={isInvoiceView}
						overseasData={overseasData}
						selectedPayrun={selectedPayrun}
						setSelectedPayrun={setSelectedPayrun}
						checkedRow={checkedRow}
						setCheckedRow={setCheckedRow}
						itemData={itemData}
						activeEntity={activeEntity}
						refetch={refetch}
						globalFilters={globalFilters}
						selectedIds={selectedIds}
						setSelectedIds={setSelectedIds}
					/>
				</div>
			</div>
		</div>

	);
}

export default SelectFilters;
