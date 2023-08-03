import { IcMProfile } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import ServiceStats from '../../../common/ServiceStats';
import { getFormattedDuration } from '../../../utils/getFormattedDuration';

import Empty from './Empty';
import Loader from './Loader';
import styles from './styles.module.css';

function BasicDetails({ data = {}, details_loading }) {
	const detail = data.list?.[0];
	const {
		importer_exporter, serial_id, sales_agent, stats, total_port_pair, requested_for_approval, live_contracts,
	} = detail || {};

	if (details_loading) return <Loader />;

	if (isEmpty(detail)) return <Empty />;

	return (

		<div className={styles.container}>
			<div className={styles.company_name}>
				{importer_exporter?.business_name}
			</div>
			<div className={styles.rfqid_and_agent}>
				<div className={styles.rfq_id}>
					RFQ ID :
					{serial_id ? <div className={styles.data_value}>{serial_id}</div> : null}
				</div>
				<div className={styles.sales_agent_section}>
					<IcMProfile fill="#4F4F4F" />
					<div className={styles.sales_agent}>
						Sales Agent :
						{sales_agent ? <div className={styles.data_value}>{sales_agent?.name}</div> : '-'}
					</div>
				</div>
			</div>

			<div className={styles.pairs_enterprise_shipment_section}>

				<div className={styles.port_pairs_section}>
					<div className={styles.tag_prefix_name}>
						{
							total_port_pair ? `${total_port_pair}
							Port Pairs :` : null
						}

					</div>
					<div className={styles.tag_suffix_name}>

						{requested_for_approval || 0}
						{' '}

						Requested For Approval

					</div>
				</div>

				{importer_exporter?.sub_type
					? <div className={styles.enterprise_tag}>{startCase(importer_exporter?.sub_type)}</div> : null}
				{
					importer_exporter?.bookings_completed_last_date ? (
						<div className={styles.last_shipment_section}>
							<div className={styles.tag_prefix_name}>Last Shipment: </div>
							<div className={styles.tag_suffix_name}>
								{getFormattedDuration(importer_exporter?.bookings_completed_last_date)}
								{' '}
								{' '}
								Ago
							</div>
						</div>
					) : null
				}

			</div>

			<ServiceStats data={stats} live_contracts={live_contracts} type="basic_details" />
		</div>
	);
}
export default BasicDetails;
