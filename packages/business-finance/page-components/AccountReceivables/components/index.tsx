import { TabPanel, Tabs, Select, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntity from '../hooks/useListCogoEntity';

import Dashboard from './Dashboard';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push, query } = useRouter();
	const [receivables, setReceivables] = useState<string>(query.active_tab || 'dashboard');
	const { loading, EntityData = [] } = useListCogoEntity();

	const [entityCode, setEntityCode] = useState('301');

	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};

	const handleChange = (val:string) => {
		if (['invoices', 'defaulters', 'manageBpr'].includes(val)) {
			window.location.href = `/${partnerId}/business-finance/account-receivables/${val}`;
			return;
		}
		setReceivables(val);
		push(
			'/business-finance/account-receivables/[active_tab]',
			`/business-finance/account-receivables/${val}`,
		);
	};

	const EntityOptions = EntityData.map((entityData) => ({
		label : `${upperCase(entityData.business_name)} (${entityData.entity_code})`,
		value : entityData.entity_code,
	}));

	return (
		<div>

			<div className={styles.header}>
				<div className={styles.header_style}>
					Account Receivables
				</div>

				{loading ? (
					<Placeholder width="200px" height="30px" />
				)

					: (
						<div className={styles.input}>
							<Select
								name="business_name"
								onChange={(entityVal: string) => setEntityCode(entityVal)}
								value={entityCode}
								options={EntityOptions}
								placeholder="Select Entity Code"
								size="sm"
							/>
						</div>
					)}
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={receivables}
					onChange={(val:string) => handleChange(val)}
					fullWidth
					themeType="primary"
				>
					<TabPanel name="dashboard" title="Dashboard">
						<Dashboard entityCode={entityCode} />
					</TabPanel>
					<TabPanel name="invoices" title="Invoices">
						--
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding entityCode={entityCode} />
					</TabPanel>

					<TabPanel name="defaulters" title="Defaulters">
						--
					</TabPanel>
					<TabPanel name="manageBpr" title="Manage BPR">
						--
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountReceivables;
