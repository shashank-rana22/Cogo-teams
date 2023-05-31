import { Select, TabPanel, Tabs, Placeholder } from '@cogoport/components';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import AdvancePayment from './AdvancePayment';
import Dashboard from './Dashboard';
import useListCogoEntities from './Dashboard/hooks/useListCogoEntities';
import styles from './styles.module.css';

interface ItemProps {
	business_name:string,
	entity_code:string,
}

function AccountPayables() {
	const { query, push } = useRouter();
	const [activePayables, setActivePayables] = useState<string>(query?.active_tab || 'dashboard');
	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};
	const { loading, entityData = [] } = useListCogoEntities();

	const entity = getEntityCode(partnerId);

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

	const [activeEntity, setActiveEntity] = useState(entity);

	const EntityOptions = (entityData || []).map((item:ItemProps) => {
		const { business_name:companyName = '', entity_code:entityCode = '' } = item || {};

		return {
			label : `${upperCase(companyName)} (${entityCode})`,
			value : entityCode,
		};
	});

	return (
		<div>
			<div className={styles.div_container}>
				<div className={styles.heading}>
					Account Payables
				</div>
				{loading ? <Placeholder className={styles.loader} />
					: (
						<div>
							<Select
								name="activeEntity"
								value={activeEntity}
								onChange={(entityVal: string) => setActiveEntity(entityVal)}
								placeholder="Select Entity"
								options={EntityOptions}
								size="sm"
								style={{ width: '284px' }}
							/>
						</div>
					)}
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
					<TabPanel name="advance-payment" title="ADVANCE PAYMENT">
						<AdvancePayment activeEntity={activeEntity} />
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
