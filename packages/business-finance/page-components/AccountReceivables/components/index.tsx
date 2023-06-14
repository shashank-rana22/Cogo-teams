import { TabPanel, Tabs, Select, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntity from '../hooks/useListCogoEntity';

import Dashboard from './Dashboard';
import Defaulters from './Defaulters';
import Invoice from './Invoice';
import ManageBpr from './ManageBpr';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push, query } = useRouter();
	const [receivables, setReceivables] = useState(query.active_tab || 'dashboard');
	const { loading, EntityData = [] } = useListCogoEntity();

	const [entityCode, setEntityCode] = useState('301');

	const handleChange = (val:string) => {
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
						<Invoice entityCode={entityCode} />
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding entityCode={entityCode} />
					</TabPanel>

					<TabPanel name="defaulters" title="Defaulters">
						<Defaulters />
					</TabPanel>
					<TabPanel name="manageBpr" title="Manage BPR">
						<ManageBpr />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountReceivables;
