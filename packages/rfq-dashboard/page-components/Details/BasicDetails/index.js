import { IcMProfile } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ServiceStats from '../../../common/ServiceStats';
import useListRfqs from '../../../hooks/useListrfqs';

import Empty from './Empty';
import Loader from './Loader';
import styles from './styles.module.css';

function BasicDetails({ loading }) {
	const { rfq_id } = useRouter().query;
	const { getRfqsForApproval, data = {} } = useListRfqs({ id: rfq_id });
	const detail = data.list?.[0];
	useEffect(() => {
		getRfqsForApproval();
	}, [getRfqsForApproval]);
	const {
		importer_exporter, serial_id, sales_agent, stats, total_port_pair, requested_for_approval,
	} = detail || {};
	if (loading) return <Loader />;

	if (isEmpty(detail)) return <Empty />;

	return (

		<div className={styles.container}>
			<div className={styles.company_name}>
				{importer_exporter?.business_name}
			</div>
			<div className={styles.rfqid_and_agent}>
				<div className={styles.rfq_id}>
					RFQ ID :
					<div className={styles.data_value}>{serial_id}</div>
				</div>
				<div className={styles.sales_agent_section}>
					<IcMProfile fill="#4F4F4F" />
					<div className={styles.sales_agent}>
						Sales Agent :
						<div className={styles.data_value}>{sales_agent?.name}</div>
					</div>
				</div>
			</div>

			<div className={styles.pairs_enterprise_shipment_section}>

				<div className={styles.port_pairs_section}>
					<div className={styles.tag_prefix_name}>
						{total_port_pair}
						Port Pairs :
					</div>
					<div className={styles.tag_suffix_name}>
						{requested_for_approval}
						Requested For Approval
					</div>
				</div>

				<div className={styles.enterprise_tag}>{startCase(importer_exporter?.sub_type)}</div>

				<div className={styles.last_shipment_section}>
					<div className={styles.tag_prefix_name}>Last Shipment: </div>
					<div className={styles.tag_suffix_name}>
						{importer_exporter?.bookings_completed_last_date}
					</div>
				</div>

			</div>

			<ServiceStats data={stats} />
		</div>
	);
}
export default BasicDetails;
