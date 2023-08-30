import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import PAYMENT_TYPE from '../../config/PAYMENT_TYPE';
import TABS from '../../config/TABS_CONFIG';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsTabCritical from '../../helpers/getIsTabCritical';

import styles from './styles.module.css';

function DeskTabs() {
	const {
		shipmentType = '', stepperTab = '', activeTab = '',
		filters = {}, setFilters = () => {}, setActiveTab = () => {},
		paymentType = 'payment_request', setPaymentType = () => {},
	} = useContext(CostBookingDeskContext);

	const stepperTabs = TABS?.[shipmentType]?.[stepperTab];

	const handleTabChange = (val) => {
		if (val === activeTab) return;

		const isTabCritical = getIsTabCritical({ shipmentType, stepperTab, activeTab: val });
		setFilters({ ...filters, criticalOn: filters.criticalOn && isTabCritical, page: 1 });
		setActiveTab(val);
	};

	return (
		<>
			<Tabs
				activeTab={activeTab}
				onChange={handleTabChange}
			>
				{stepperTabs?.map((tab) => (
					<TabPanel
						title={tab?.title}
						key={tab?.name}
						name={tab?.name}
					/>
				))}
			</Tabs>
			{activeTab === 'security_deposit'
				? (
					<div className={styles.header_footer_part}>
						<Tabs
							themeType="tertiary"
							activeTab={paymentType}
							onChange={setPaymentType}
						>
							{PAYMENT_TYPE?.map((tab) => (
								<TabPanel
									title={tab?.title}
									key={tab?.name}
									name={tab?.name}
								/>
							))}
						</Tabs>
					</div>
				)
				: null}
		</>
	);
}

export default DeskTabs;
