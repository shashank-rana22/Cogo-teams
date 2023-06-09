import { isEmpty } from '@cogoport/utils';

import useGetKamCustomerShipmentInsights from '../../../hooks/useGetKamCustomerShipmentInsights';

import InsightComponent from './InsightComponent';
import styles from './styles.module.css';

function TransactionInsights({ itemData }) {
	const { data:insightsData, loading } = useGetKamCustomerShipmentInsights({ shipmentId: itemData?.id });
	if (isEmpty(insightsData)) {
		return null;
	}
	return (
		<div className={styles.maincontainer}>
			{['kam_insights', 'customer_insights'].map((type) => (
				<div className={styles.insightContainer} key={type}>
					<InsightComponent
						type={type}
						insightData={insightsData?.[type]}
						data={itemData}
					/>
				</div>
			))}
		</div>
	);
}

export default TransactionInsights;
