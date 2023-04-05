import { Select, TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import AdvancePayment from './AdvancePayment';
import Dashboard from './Dashboard';
import useListCogoEntities from './Dashboard/hooks/useListCogoEntities';
import styles from './styles.module.css';

function AccountPayables() {
	const { query, push } = useRouter();
	const [activePayables, setActivePayables] = useState<string>(query?.active_tab || 'dashboard');
	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};
	const handleTabChange = (v:string) => {
		if (['invoices', 'payruns', 'outstanding', 'treasury-chest'].includes(v)) {
			window.location.href = `/${partnerId}/business-finance/account-payables/${v}`;
			return;
		}
		setActivePayables(v);
		push(
			'/business-finance/account-payables/[active_tab]',
			`/business-finance/account-payables/${v}`,
		);
	};
	const { data, api } = useListCogoEntities();
	const { list } = data || {};

	useEffect(() => { api(); }, [api]);

	const [activeEntity, setActiveEntity] = useState(list?.[2]?.entity_code || '301');
	const options = [
		{ label: 'Cogoport Vietnam (501)', value: list?.[0]?.entity_code || '501' },
		{ label: 'Cogo Universe Pte. Ltd (401)', value: list?.[1]?.entity_code || '401' },
		{ label: 'COGOPORT PRIVATE LIMITED (301)', value: list?.[2]?.entity_code || '301' },
		{ label: 'Cogoport Netherlands (201)', value: list?.[3]?.entity_code || '201' },
		{ label: 'COGO FREIGHT PVT LTD (101)', value: list?.[4]?.entity_code || '101' },
	];

	return (
		<div>
			<div className={styles.div_container}>
				<div className={styles.heading}>
					Account Payables
				</div>

				<div>
					<Select
						name="activeEntity"
						value={activeEntity}
						onChange={setActiveEntity}
						placeholder="Select Entity"
						options={options}
						size="sm"
						style={{ width: '284px' }}
					/>
				</div>
			</div>
			<div className={styles.container}>
				<Tabs
					activeTab={activePayables}
					fullWidth
					themeType="primary"
					onChange={handleTabChange}
				>
					<TabPanel name="dashboard" title="DASHBOARD">
						<Dashboard activeEntity={activeEntity} />
					</TabPanel>
					<TabPanel name="invoices" title="INVOICES">
						<h1>Invoices</h1>
					</TabPanel>
					<TabPanel name="advance-payment" title="Advance Payment">
						<AdvancePayment />
					</TabPanel>
					<TabPanel name="payruns" title="PAYRUN">
						<h1>Payruns</h1>
					</TabPanel>
					<TabPanel name="outstanding" title="OUTSTANDING">
						<h1>Outstandings</h1>
					</TabPanel>
					<TabPanel name="treasury-chest" title="TREASURY">
						<h1>Treasury</h1>
					</TabPanel>

				</Tabs>
			</div>
		</div>
	);
}

export default AccountPayables;
