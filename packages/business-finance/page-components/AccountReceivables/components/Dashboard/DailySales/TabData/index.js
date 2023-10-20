import { useTranslation } from 'next-i18next';
import React from 'react';

import CardComponent from './CardComponent';
import SalesComponent from './SalesComponent';
import styles from './styles.module.css';

const tabs = (t) => [
	{
		key   : 'SALES_INVOICE',
		label : t('revenue'),
	},
	{
		key   : 'CREDIT_NOTE',
		label : t('credit_note'),
	},
	{
		key   : 'SHIPMENT_CREATED',
		label : t('shipments_created'),
	},
];

const tabsKeyComponentMapping = {
	SALES_INVOICE    : SalesComponent,
	CREDIT_NOTE      : CardComponent,
	SHIPMENT_CREATED : CardComponent,
};

function TabData({
	toggleData, loading, dailyStatsData, subActiveTab, setSubActiveTab,
	filters, filterValue, entityCode,
}) {
	const tabComponentProps = {
		SALES_INVOICE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
		},
		CREDIT_NOTE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
		},
		SHIPMENT_CREATED: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
		},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const { t = () => '' } = useTranslation(['accountRecievables']);

	return (
		<div className={styles.main_container}>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs(t).map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								setSubActiveTab(tab.key);
							}}
							role="presentation"
						>
							<div className={tab.key === subActiveTab
								? styles.sub_container_click : styles.sub_container}
							>
								{tab.label}

							</div>

						</div>
					))}
				</div>

			</div>

			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} {...tabComponentProps[subActiveTab]} />}
		</div>
	);
}
export default TabData;
