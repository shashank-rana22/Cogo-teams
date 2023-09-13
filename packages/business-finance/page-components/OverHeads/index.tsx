/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tabs, TabPanel } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import { EntityContext } from './commons/Contexts';
import Expenses from './Expenses/index';
import styles from './styles.module.css';
import Vendors from './Vendors/index';

interface ProfileProps {
	profile?: { partner?: { id?: string } };
}
function Overheads() {
	const { query } = useRouter();
	const { push } = useRouter();

	const profile = useSelector((state) => state);
	const { profile: { partner } }:ProfileProps = profile || {};
	const { id: partnerId } = partner || {};

	const [activeTab, setActiveTab] = useState(query?.active_tab || 'vendors');
	const [entityCode, setEntityCode] = useState(partnerId);

	const handleChange = (tab:any) => {
		setActiveTab(tab);
		push(
			'/business-finance/overheads/[active_tab]',
			`/business-finance/overheads/${tab}`,
		);
	};

	return (
		<div>
			<EntityContext.Provider value={entityCode}>
				<div className={styles.main_heading}>Overheads</div>
				<div className={styles.header}>
					<AsyncSelect
						placeholder="Select Entity Code"
						value={entityCode}
						onChange={(val) => setEntityCode(val)}
						isClearable
						initialCall
						labelKey="entity_code"
						valueKey="id"
						getModifiedOptions={({ options }) => (options?.map((option) => ({
							...option,
							entity_code: `${option?.entity_code} - ${option?.business_name}`,
						})))}
						asyncKey="list_cogo_entity"
						style={{ width: '260px' }}
					/>
				</div>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={(tab) => handleChange(tab)}
				>
					<TabPanel name="vendors" title="Vendors">
						<Vendors />
					</TabPanel>

					<TabPanel name="expenses" title="Expenses">
						<Expenses />
					</TabPanel>
				</Tabs>
			</EntityContext.Provider>
		</div>
	);
}

export default Overheads;
