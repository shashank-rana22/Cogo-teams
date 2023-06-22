import { TabPanel, Tabs, Select, Placeholder } from '@cogoport/components';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntities from '../../AccountPayables/Dashboard/hooks/useListCogoEntities';
// import useListCogoEntity from '../hooks/useListCogoEntity';

import Dashboard from './Dashboard';
import Defaulters from './Defaulters';
import Invoice from './Invoice';
import ManageBpr from './ManageBpr';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

interface ItemProps {
	business_name:string,
	entity_code:string,
}

function AccountReceivables() {
	const { push, query } = useRouter();
	const profile = useSelector((state) => state);

	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};

	const [receivables, setReceivables] = useState(query.active_tab || 'dashboard');

	const entity = getEntityCode(partnerId);

	const [activeEntity, setActiveEntity] = useState(entity);

	const handleChange = (val:string) => {
		setReceivables(val);
		push(
			'/business-finance/account-receivables/[active_tab]',
			`/business-finance/account-receivables/${val}`,
		);
	};
	const { loading, entityData = [] } = useListCogoEntities();

	const EntityOptions = (entityData || []).map((item:ItemProps) => {
		const { business_name:companyName = '', entity_code:entityCode = '' } = item || {};

		return {
			label : `${upperCase(companyName)} (${entityCode})`,
			value : entityCode,
		};
	});

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
								onChange={(entityVal: string) => setActiveEntity(entityVal)}
								value={activeEntity}
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
						<Dashboard entityCode={activeEntity} />
					</TabPanel>
					<TabPanel name="invoices" title="Invoices">
						<Invoice entityCode={activeEntity} />
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding entityCode={activeEntity} />
					</TabPanel>

					<TabPanel name="defaulters" title="Defaulters">
						<Defaulters entityCode={activeEntity} />
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
