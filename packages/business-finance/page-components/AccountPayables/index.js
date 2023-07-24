import { Select, TabPanel, Tabs, Placeholder } from '@cogoport/components';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import AdvancePayment from './AdvancePayment/index.tsx';
import useListCogoEntities from './Dashboard/hooks/useListCogoEntities.ts';
import Dashboard from './Dashboard/index.tsx';
import Invoices from './Invoices';
import styles from './styles.module.css';

const ENTITY_CODE_LENGTH = 1;
const FILTER_TABS = ['invoices', 'dashboard', 'advance-payment'];

function AccountPayables() {
	const { query, push } = useRouter();
	const [activePayables, setActivePayables] = useState(
		query?.active_tab || 'dashboard',
	);
	const profile = useSelector((state) => state);
	const {
		profile: { partner },
	} = profile || {};
	const { id: partnerId } = partner || {};
	const { loading, entityData = [] } = useListCogoEntities();
	const entityDataCount = entityData.length;

	const entity = getDefaultEntityCode(partnerId);

	const handleTabChange = (v) => {
		if (
			['invoices', 'payruns', 'outstanding', 'treasury-chest'].includes(v)
		) {
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

	const entityOptions = (entityData || []).map((item) => {
		const {
			business_name: companyName = '',
			entity_code: entityCode = '',
		} = item || {};

		return {
			label : `${upperCase(companyName)} (${entityCode})`,
			value : entityCode,
		};
	});

	return (
		<div>
			<div className={styles.div_container}>
				<div className={styles.heading}>Account Payables</div>
				{loading ? (
					<Placeholder className={styles.loader} />
				) : (
					<div>
						{FILTER_TABS.includes(activePayables) ? (
							<Select
								name="activeEntity"
								value={activeEntity}
								onChange={(entityVal) => setActiveEntity(entityVal)}
								placeholder="Select Entity"
								options={entityOptions}
								size="sm"
								style={{ width: '284px' }}
								disabled={entityDataCount <= ENTITY_CODE_LENGTH}
							/>
						) : null}
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
						<Invoices activeEntity={activeEntity} />
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
