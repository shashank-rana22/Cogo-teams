import { isEmpty, startCase } from '@cogoport/utils';

import iconMapping from '../../../helper/iconMapping';
import incoTermMapping from '../../../helper/incoTermMapping';
import serviceLabelMapping from '../../../helper/serviceLabelMapping';
import useGetKamCustomerShipmentInsights from '../../../hooks/useGetKamCustomerShipmentInsights';
import PortDetails from '../../List/Card/Body/PortDetails';

import InsightComponent from './InsightComponent';import styles from './styles.module.css';

function TransactionInsights({ itemData }) {
	const { data:insightsData, loading } = useGetKamCustomerShipmentInsights({ shipmentId: itemData?.id });
	if (isEmpty(insightsData)) {
		return null;
	}
	return (
		<div className={styles.maincontainer}>
			<div className={styles.single_column}>
				<div className={styles.emptybox}>
					{' '}
				</div>
				<div className={styles.single_box}>
					{iconMapping[itemData?.shipment_type]}
					<span style={{ marginLeft: '7px' }}>
						{serviceLabelMapping[itemData?.shipment_type]}
					</span>
				</div>
				<div className={styles.single_box}>
					{serviceLabelMapping[itemData?.shipment_type]}
					{' '}
					{startCase(itemData?.trade_type)
							|| startCase(incoTermMapping[itemData?.inco_term])}
				</div>
				<div className={styles.port_pair_container}>
					<PortDetails data={itemData} />
				</div>
				<div className={styles.single_box}>
					Total Transaction
				</div>
			</div>
			{['customer_insights', 'kam_insights'].map((type) => (
				<div className={styles.single_column} key={type}>
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
