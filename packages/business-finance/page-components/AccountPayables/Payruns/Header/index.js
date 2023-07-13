import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import SelectFilters from './SelectFilter';
import styles from './styles.module.css';

function Header({
	activePayrunTab = '',
	setActivePayrunTab = () => {},
	payrunStats = {},
	isInvoiceView = false,
	setIsInvoiceView = () => {},
	overseasData = '',
	setOverseasData = () => {},
	globalFilters = {},
	setGlobalFilters = () => {},
	selectedPayrun = null,
	setSelectedPayrun = () => {},
	checkedRow = null,
	setCheckedRow = () => {},
}) {
	const {
		INITIATED = 0, AUDITED = 0, PAYMENT_INITIATED = 0, PAID = 0,
		UPLOAD_HISTORY = 0, COMPLETED = 0,
	} = payrunStats;

	return (
		<div className={styles.container}>
			<div>
				<Tabs
					activeTab={activePayrunTab}
					themeType="secondary"
					onChange={setActivePayrunTab}
					// fullWidth
				>
					<TabPanel
						id="INITIATED"
						name="INITIATED"
						title="To be Audited"
						badge={INITIATED}
					/>
					<TabPanel
						id="AUDITED"
						name="AUDITED"
						title="Payment Ready"
						badge={AUDITED}
					/>
					<TabPanel
						id="PAYMENT_INITIATED"
						name="PAYMENT_INITIATED"
						title="Payment Initiated"
						badge={PAYMENT_INITIATED}
					/>

					<TabPanel
						id="PAID"
						name="PAID"
						title="Paid"
						badge={PAID}
					/>

					<TabPanel
						id="UPLOAD_HISTORY"
						name="UPLOAD_HISTORY"
						title="Upload History"
						badge={UPLOAD_HISTORY}
					/>
					<TabPanel
						id="COMPLETED"
						name="COMPLETED"
						title="Payrun History"
						badge={COMPLETED}
					/>
				</Tabs>
			</div>
			<div>
				<SelectFilters
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
					isInvoiceView={isInvoiceView}
					activePayrunTab={activePayrunTab}
					setActivePayrunTab={setActivePayrunTab}
					setIsInvoiceView={setIsInvoiceView}
					overseasData={overseasData}
					setOverseasData={setOverseasData}
					selectedPayrun={selectedPayrun}
					setSelectedPayrun={setSelectedPayrun}
					checkedRow={checkedRow}
					setCheckedRow={setCheckedRow}
				/>
			</div>

		</div>
	);
}

export default Header;
