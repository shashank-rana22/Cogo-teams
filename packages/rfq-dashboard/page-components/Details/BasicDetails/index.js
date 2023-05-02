import { IcMProfile } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ServiceStats from '../../../common/ServiceStats';
import { PortPairsEnterpriseShipmentSection } from '../../../configurations/customer-past-month-data-card';
import { AvgPromisedConAndContract } from '../../../configurations/service-stats-data';

import Empty from './Empty';
import Loader from './Loader';
import styles from './styles.module.css';

function BasicDetails({ loading, data = {} }) {
	if (loading) return <Loader />;

	if (!isEmpty(data)) return <Empty />;

	return (

		<div className={styles.container}>
			<div className={styles.company_name}>
				Zetwerk International Manufacturing Businesses Private Limited
			</div>
			<div className={styles.rfqid_and_agent}>
				<div className={styles.rfq_id}>
					RFQ ID :
					<div className={styles.data_value}>1124</div>
				</div>
				<div className={styles.sales_agent_section}>
					<IcMProfile fill="#4F4F4F" />
					<div className={styles.sales_agent}>
						Sales Agent :
						<div className={styles.data_value}>Aditya Singh</div>
					</div>
				</div>
			</div>

			<div className={styles.pairs_enterprise_shipment_section}>

				<div className={styles.port_pairs_section}>
					<div className={styles.tag_prefix_name}>
						{PortPairsEnterpriseShipmentSection.port_pairs}
						Port Pairs :
					</div>
					<div className={styles.tag_suffix_name}>
						{PortPairsEnterpriseShipmentSection.requested_for_approval}
						Requested For Approval
					</div>
				</div>

				{PortPairsEnterpriseShipmentSection.labels.map((item) => (
					<div className={styles.enterprise_tag}>{item}</div>
				))}

				<div className={styles.last_shipment_section}>
					<div className={styles.tag_prefix_name}>Last Shipment: </div>
					<div className={styles.tag_suffix_name}>
						{PortPairsEnterpriseShipmentSection.last_shipment}
						{' '}
						Ago
					</div>
				</div>

			</div>

			<ServiceStats data={AvgPromisedConAndContract} />
		</div>
	);
}
export default BasicDetails;
