import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import FuturePlanDetails from '../FuturePlanDetails';
import PlanApproval from '../PlanApproval';
import QuotaDetails from '../QuotaDetails';

import Logs from './Logs';
import Orders from './Orders';
import PromotionCancellation from './PromotionCancellation';
import styles from './styles.module.css';
import Usages from './Usages';

const TAB_MAPPING = {
	quotas       : QuotaDetails,
	future_plans : FuturePlanDetails,
	utr          : PlanApproval,
	promotion    : PromotionCancellation,
	cancellation : PromotionCancellation,
	logs         : Logs,
	usages       : Usages,
	orders       : Orders,
};

function TabSection({ info = {}, subInfo = {}, editModalChangeHandler, setEditModal }) {
	const [activeTab, setActiveTab] = useState('quotas');

	const Component = TAB_MAPPING?.[activeTab];

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary-vertical"
				onChange={setActiveTab}
			>
				{Object.keys(TAB_MAPPING).map((ele) => (
					<TabPanel key={ele} name={ele} title={startCase(ele)} />
				))}
			</Tabs>

			<div className={styles.component_sec}>
				<Component
					{...subInfo}
					info={info}
					editModalChangeHandler={editModalChangeHandler}
					setEditModal={setEditModal}
					currentTab={activeTab}
				/>
			</div>

		</div>

	);
}

export default TabSection;
