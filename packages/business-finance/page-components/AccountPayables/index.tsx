import { Select, TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import Dashboard from './Dashboard';
import useListCogoEntities from './Dashboard/hooks/useListCogoEntities';
import styles from './styles.module.css';

function AccountPayables() {
	const { query, push } = useRouter();
	const { activeTab } = query;
	const [activePayables, setActivePayables] = useState(activeTab || 'dashboard');
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
			'/business-finance/account-payables/[activeTab]',
			`/business-finance/account-payables/${v}`,
		);
	};
	const { data, api } = useListCogoEntities();
	const { list } = data || {};

	useEffect(() => { api(); }, [api]);

	const [activeEntity, setActiveEntity] = useState(list?.[2]?.entity_code || '301');
	const options = [
		{ label: 'Cogoport Vietnam', value: list?.[0]?.entity_code },
		{ label: 'Cogo Universe Pte. Ltd', value: list?.[1]?.entity_code },
		{ label: 'COGOPORT PRIVATE LIMITED', value: list?.[2]?.entity_code },
		{ label: 'Cogoport Netherlands', value: list?.[3]?.entity_code },
		{ label: 'COGO FREIGHT PVT LTD', value: list?.[4]?.entity_code },
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
						size="md"
						isClearable
						style={{ width: '200px' }}
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
