import { TabPanel, Tabs, Button, Input, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({
	activePayrunTab,
	setActivePayrunTab,
	payrunStats,
	isInvoiceView,
	setIsInvoiceView,
	overseasData,
	setOverseasData,
	globalFilters,
	setGlobalFilters,
}) {
	const {
		INITIATED = 0, AUDITED = 0, PAYMENT_INITIATED = 0, PAID = 0,
		UPLOAD_HISTORY = 0, COMPLETED = 0,
	} = payrunStats || {};
	const { search } = globalFilters || {};
	return (
		<div>
			<div>
				<Tabs
					activeTab={activePayrunTab}
					themeType="secondary"
					onChange={setActivePayrunTab}
					fullWidth
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
			<div className={styles.filter_container}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{(['AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab))
						? (
							<Tabs themeType="tertiary" activeTab={overseasData} onChange={setOverseasData}>
								<TabPanel title="Domestic" name="NORMAL" />
								<TabPanel title="Overseas" name="OVERSEAS" />
								<TabPanel title="Adv.Payment" name="ADVANCE_PAYMENT" />
							</Tabs>
						)
						: null}
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
				<div style={{ display: 'flex' }}>
					<div>
						<Input
							value={search || ''}
							onChange={(value) => setGlobalFilters({
								...globalFilters,
								search: value || undefined,
							})}
							style={{ width: '300px', marginRight: '8px' }}
							placeholder="Search by PayRun Name"
							size="sm"
							suffix={(
								<IcMSearchlight
									height={20}
									width={20}
									color="#CACACA"
									className={styles.search_icon}
								/>
							)}
						/>
					</div>
					<Button>
						Go To Audit
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Header;
