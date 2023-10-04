import { Tabs, TabPanel, Select, Placeholder } from '@cogoport/components';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import { EntityContext } from './commons/Contexts';
import useListCogoEntities from './commons/hooks/useListCogoEntities';
import Expenses from './Expenses/index';
import styles from './styles.module.css';
import Vendors from './Vendors/index';

function Overheads() {
	const { query } = useRouter();
	const { push } = useRouter();

	const profile = useSelector((state) => state);
	const { profile: { partner } } = profile || {};
	const { id: partnerId } = partner || {};

	const { entityLoading = true, entityData = [] } = useListCogoEntities();

	const defaultEntityCode = getDefaultEntityCode(partnerId);

	let defaultEntityId = '';

	Object.keys(ENTITY_MAPPING).forEach((element) => {
		if (element === defaultEntityCode) { defaultEntityId = ENTITY_MAPPING[element].id; }
	});

	const [activeTab, setActiveTab] = useState(query?.active_tab || 'vendors');
	const [entityCode, setEntityCode] = useState(defaultEntityId);

	const handleChange = (tab) => {
		setActiveTab(tab);
		push(
			'/business-finance/overheads/[active_tab]',
			`/business-finance/overheads/${tab}`,
		);
	};
	const entityOptions = (entityData || []).map((item) => {
		const {
			id = '',
			entity_code: entitycode = '',
		} = item || {};

		return {
			label : `${entitycode} - ${item.business_name}`,
			value : id,
		};
	});

	return (
		<div className={styles.font}>
			<EntityContext.Provider value={entityCode}>
				<div className={styles.main_heading}>Overheads</div>
				<div className={styles.header}>
					{ entityLoading ? <Placeholder height="30px" width="260px" /> : (
						<Select
							name="activeEntity"
							value={entityCode}
							onChange={(entityVal) => setEntityCode(entityVal)}
							placeholder="Select Entity"
							options={entityOptions}
							size="sm"
							style={{ width: '290px' }}
						/>
					) }
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
