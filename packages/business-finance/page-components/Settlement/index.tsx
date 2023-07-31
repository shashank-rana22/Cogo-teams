import { Tabs, TabPanel, Select, Placeholder } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { getDefaultEntityCode } from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { upperCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useListCogoEntities from '../AccountPayables/Dashboard/hooks/useListCogoEntities';

import tabPanelMapping from './configurations/tab-mappings';
import styles from './styles.module.css';

interface ItemProps {
	business_name: string;
	entity_code: string;
}
interface Profile {
	profile?: { partner: { id: string } };
}

function Settlement() {
	const geo = getGeoConstants();

	const { query, push } = useRouter();

	const { profile }:Profile = useSelector((state) => state);

	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const entity = getDefaultEntityCode(partnerId);

	const { loading, entityData = [] } = useListCogoEntities();

	const [entityCode, setEntityCode] = useState(entity);

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

	const tabMapping = tabPanelMapping(entityCode, entity);

	const [activeTab, setActiveTab] = useState(query?.active_tab);

	const handleChange = (tab: string) => {
		if (['JournalVoucher', 'tds-settlement', 'onAccountCollection', 'history'].includes(tab)) {
			setActiveTab(tab);
			push(
				'/business-finance/settlement/[active_tab]',
				`/business-finance/settlement/${tab}`,
			);
		} else {
			window.location.href = `/${query.partner_id}/business-finance/settlement/${tab}`;
		}
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>Settlement</div>

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
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={(tab) => handleChange(tab)}
			>
				{(tabMapping || []).map((tab) => {
					const { name, title, component } = tab || {};
					if (!geo.navigations.settlement_onAccountCollection.tabs.includes(name)) {
						return null;
					}
					return (
						<TabPanel key={name} name={name} title={title}>
							{component}
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default Settlement;
