import { TabPanel, Tabs, Select, Placeholder } from '@cogoport/components';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntities from '../../AccountPayables/Dashboard/hooks/useListCogoEntities';

import Dashboard from './Dashboard';
import Defaulters from './Defaulters';
import Invoice from './Invoice';
import ManageBpr from './ManageBpr';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

interface ItemProps {
	business_name: string;
	entity_code: string;
}
interface Profile {
	profile?: { partner: { id: string } };
}

function AccountReceivables() {
	const { push, query } = useRouter();
	const { profile }:Profile = useSelector((state) => state);

	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const [receivables, setReceivables] = useState(
		query.active_tab || 'dashboard',
	);

	const entity = getDefaultEntityCode(partnerId);

	const [entityCode, setEntityCode] = useState(entity);

	const handleChange = (val: string) => {
		setReceivables(val);
		push(
			'/business-finance/account-receivables/[active_tab]',
			`/business-finance/account-receivables/${val}`,
		);
	};
	const { loading, entityData = [] } = useListCogoEntities();

	const entityDataCount = entityData.length;

	const entityOptions = (entityData || []).map((item: ItemProps) => {
		const {
			business_name: companyName = '',
			entity_code: listEntityCode = '',
		} = item || {};
		return {
			label : `${upperCase(companyName)} (${listEntityCode})`,
			value : listEntityCode,
		};
	});

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>Account Receivables</div>

				{loading ? (
					<Placeholder width="200px" height="30px" />
				) : (
					<div className={styles.input}>

						<Select
							name="business_name"
							onChange={(entityVal: string) => setEntityCode(entityVal)}
							value={entityCode}
							options={entityOptions}
							placeholder="Select Entity Code"
							size="sm"
							disabled={entityDataCount <= 1}
						/>

					</div>
				)}
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={receivables}
					onChange={(val: string) => handleChange(val)}
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
						<Defaulters entityCode={entityCode} />
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
