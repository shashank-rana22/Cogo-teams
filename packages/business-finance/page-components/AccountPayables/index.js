import { Select, TabPanel, Tabs, Placeholder } from '@cogoport/components';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty, upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import AdvancePayment from './AdvancePayment/index';
import useListCogoEntities from './Dashboard/hooks/useListCogoEntities';
import Dashboard from './Dashboard/index';
import Invoices from './Invoices';
import Outstanding from './Outstanding';
import Payruns from './Payruns';
import styles from './styles.module.css';
import Treasury from './Treasury';

const ENTITY_CODE_LENGTH = 1;
const FILTER_TABS = ['dashboard', 'payruns', 'advance-payment', 'outstanding', 'treasury-chest', 'invoices'];

function AccountPayables() {
	const { query, push } = useRouter();

	const profile = useSelector((state) => state);
	const {
		profile: { partner },
	} = profile || {};
	const { id: partnerId } = partner || {};

	const [activePayables, setActivePayables] = useState(
		query?.active_tab || 'dashboard',
	);

	const [selectedOrg, setSelectedOrg] = useState({});

	const { loading, entityData = [] } = useListCogoEntities();
	const entityDataCount = entityData.length;

	const entity = getDefaultEntityCode(partnerId);

	const handleTabChange = (v) => {
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
						{isEmpty(selectedOrg) && FILTER_TABS.includes(activePayables) ? (
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
			<div className={isEmpty(selectedOrg) ? styles.container : styles.nodisplay}>
				<Tabs
					activeTab={activePayables}
					fullWidth
					themeType="primary"
					onChange={handleTabChange}
				>
					<TabPanel name="dashboard" title="Dashboard">
						<Dashboard activeEntity={activeEntity} />
					</TabPanel>
					<TabPanel name="invoices" title="Audited Invoices">
						<Invoices activeEntity={activeEntity} />
					</TabPanel>
					<TabPanel name="advance-payment" title="Advance Payment">
						<AdvancePayment activeEntity={activeEntity} />
					</TabPanel>
					<TabPanel name="payruns" title="Payrun">
						<Payruns activeEntity={activeEntity} />
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding
							entityCode={activeEntity}
							setSelectedOrg={setSelectedOrg}
							selectedOrg={selectedOrg}
						/>
					</TabPanel>
					<TabPanel name="treasury-chest" title="Treasury">
						<Treasury currentEntity={activeEntity} setActiveEntity={setActiveEntity} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountPayables;
