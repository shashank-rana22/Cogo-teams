import { Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import GetDashBoardTabs from '../hooks/getDashBoardTabs';

import BookingAnalysis from './BookingAnalysis';
import Header from './Header';
import Profitability from './Profitability';
import RevenueAnalysis from './RevenueAnalysis';
import RevenueVisualization from './RevenueVizualisation';
import SalesFunnel from './SalesFunnel';
import SalesOverall from './SalesOverall';
import styles from './styles.module.css';

const geo = getGeoConstants();

function UnifiedDashboard() {
	const { profile } = useSelector((state) => state || {});

	const { id } = profile.user;

	const [headerFilters, setHeaderFilters] = useState({
		currency: false,
		...(geo.uuid.vietnam_business_heads.includes(id) && {
			entity_code: ['501'],
		}),
	});

	const [activeTab, setActiveTab] = useState('unified_dashboard');
	const { data } = GetDashBoardTabs();
	const { content = {} } = data || {};
	const { value: file_data = [] } = content;

	const { entity_code } = headerFilters;

	const isVietnamBusinessHead = geo.uuid.vietnam_business_heads.includes(id)
		&& (entity_code || [])?.[0] === '501';

	const isBusinessHeads = geo.uuid.business_heads.includes(id);

	const showWidget = isVietnamBusinessHead || isBusinessHeads;

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				themeType="primary"
			>
				<TabPanel
					name="unified_dashboard"
					title="Unified Dashboard"
				>
					<Header
						headerFilters={headerFilters}
						setHeaderFilters={setHeaderFilters}
					/>

					{showWidget && (
						<>
							<BookingAnalysis headerFilters={headerFilters} />
							<RevenueAnalysis headerFilters={headerFilters} />
							<RevenueVisualization headerFilters={headerFilters} />
						</>
					)}

					{isBusinessHeads && <SalesOverall headerFilters={headerFilters} /> }

					<SalesFunnel headerFilters={headerFilters} />

					{showWidget && <Profitability headerFilters={headerFilters} /> }

				</TabPanel>

				{(file_data || []).map((item = {}) => {
					if ((item.user_id || []).includes(profile.id)) {
						return (
							<TabPanel
								key={uuidv4()}
								name={item.urlKey}
								title={item.title}
							>
								<iframe title={item.title} src={item.metabaseUrl} width="100%" height="700px" />
							</TabPanel>
						);
					}
					if (
						(item.user_role_ids || []).includes(
							profile.partner.user_role_ids[0],
						)
					) {
						return (
							<TabPanel
								key={uuidv4()}
								name={item.urlKey}
								title={item.title}
							>
								<iframe title={item.title} src={item.metabaseUrl} width="100%" height="700px" />
							</TabPanel>
						);
					}
					return null;
				})}
			</Tabs>
		</div>

	);
}

export default UnifiedDashboard;
