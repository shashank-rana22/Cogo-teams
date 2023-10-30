import { TabPanel, Tabs, Select, Placeholder } from '@cogoport/components';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty, upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntities from '../../AccountPayables/Dashboard/hooks/useListCogoEntities';

import Dashboard from './Dashboard';
import Defaulters from './Defaulters';
import Invoice from './Invoice';
import ManageBpr from './ManageBpr';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push, query } = useRouter();
	const { profile } = useSelector((state) => state);
	const [selectedOrgId, setSelectedOrgId] = useState({});
	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const [receivables, setReceivables] = useState(
		query.active_tab || 'dashboard',
	);
	const entity = getDefaultEntityCode(partnerId);

	const [entityCode, setEntityCode] = useState(entity);

	const handleChange = (val) => {
		setReceivables(val);
		push(
			'/business-finance/account-receivables/[active_tab]',
			`/business-finance/account-receivables/${val}`,
		);
	};
	const { loading, entityData = [] } = useListCogoEntities();

	const entityDataCount = entityData.length;
	const entityOptions = (entityData || []).map((item) => {
		const {
			business_name: companyName = '',
			entity_code: listEntityCode = '',
		} = item || {};
		return {
			label : `${upperCase(companyName)} (${listEntityCode})`,
			value : listEntityCode,
		};
	});
	if (receivables === 'outstanding') {
		entityOptions.push(
			{ label: 'COGO FREIGHT PVT LTD_COGOPORT PRIVATE LIMITED(101_301)', value: '101_301' },
		);
	} else if (entityCode === '101_301') setEntityCode(getDefaultEntityCode(partnerId));

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>Account Receivables</div>

				{loading ? (
					<Placeholder width="200px" height="30px" />
				) : (
					<div className={styles.input}>
						{isEmpty(selectedOrgId) ? (
							<Select
								name="business_name"
								onChange={(entityVal) => setEntityCode(entityVal)}
								value={entityCode}
								options={entityOptions}
								placeholder="Select Entity Code"
								size="sm"
								disabled={entityDataCount <= 1}
							/>
						) : null}
					</div>
				)}
			</div>

			<div
				className={
					isEmpty(selectedOrgId)
						? styles.tabs_container
						: styles.nodisplay
				}
			>
				<Tabs
					activeTab={receivables}
					onChange={(val) => handleChange(val)}
					fullWidth
					themeType="primary"
				>
					<TabPanel name="dashboard" title="Dashboard">
						<Dashboard entityCode={entityCode} />
					</TabPanel>
					<TabPanel name="invoices" title="Invoices">
						<Invoice entityCode={entityCode} invoiceJourney />
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding
							entityCode={entityCode}
							selectedOrgId={selectedOrgId}
							setSelectedOrgId={setSelectedOrgId}
						/>
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
