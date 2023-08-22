import { Placeholder, Tabs, TabPanel, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';

function ShipmentReport({
	activeTab,
	setActiveTab,
	response,
	COLUMNS,
	loading,
}) {
	const { t } = useTranslation(['athenaDashboard']);

	return (
		<div className={styles.main_container_right}>
			<div className={styles.category_division}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="shipments" title={t('athenaDashboard:tab_shipments_label')} />
				</Tabs>
			</div>

			<div className={styles.shipment_report}>
				{t('athenaDashboard:shipment_report')}
			</div>

			{!isEmpty(response) && !loading
						&& (
							<div className={styles.table_container}>
								<Table
									className={styles.table}
									columns={COLUMNS}
									data={response}
									loading={loading}
								/>
							</div>
						)}

			{ (isEmpty(response) && !loading) && (
				<EmptyState
					height={200}
					width={300}
					emptyText={t('athenaDashboard:trends_tab_empty_state')}
					textSize="16px"
					flexDirection="column"
				/>
			)}
			{loading && (
				<Placeholder height="850px" width="968px" margin="50px 20px 20px 0px" />
			)}
		</div>
	);
}
export default ShipmentReport;
