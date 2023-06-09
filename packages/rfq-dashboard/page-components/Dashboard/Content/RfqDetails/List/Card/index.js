import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMProfile } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import ServiceStats from '../../../../../../common/ServiceStats';
import { SERVICE_MAPPING } from '../../../../../../constants';
import { getFormattedDuration } from '../../../../../../utils/getFormattedDuration';

import styles from './styles.module.css';

function Card({ item, handleCheck, checkedItems }) {
	const { stats = {}, live_contracts = '' } = item;

	const router = useRouter();

	const { port_pair_count = {} } = item;

	const services = Object.keys(port_pair_count);

	return (
		<div
			role="presentation"
			onClick={() => router.push(`/rfq-dashboard/${item.id}`)}
			className={styles.container}
			key={item.id}
		>
			<div
				role="presentation"
				onClick={(e) => e.stopPropagation()}
			>
				<Checkbox
					className={styles.checkbox}
					value={item.id}
					checked={checkedItems.some((checkedItem) => checkedItem.id === item.id)}
					onChange={handleCheck}
				/>
			</div>
			<div className={styles.basic_details}>
				<div className={styles.org_name}>
					{item?.name ? startCase(item?.importer_exporter
						?.business_name) : '-'}

				</div>
				<div className={styles.tags}>
					<div className={styles.primary_tag}>
						{
							item?.total_port_pair ? `${item?.total_port_pair} Port Pairs ` : null
						}

						<div className={styles.requested}>
							{
							item?.requested_for_approval ? `: ${item?.requested_for_approval}
							Requested for Approval` : null
						}
						</div>
					</div>
					{item?.importer_exporter?.sub_type
						&& <div className={styles.primary_tag}>{startCase(item?.importer_exporter?.sub_type)}</div>}
					{
						item?.importer_exporter?.bookings_completed_last_date ? (
							<div className={styles.primary_tag}>
								Last Shipment :
								{' '}
								{getFormattedDuration(item?.importer_exporter?.bookings_completed_last_date)}
								{' '}
								Ago
							</div>
						) : null
					}
				</div>
				<div className={styles.rest_tags}>
					{
						item?.sales_agent?.name ? (
							<div className={styles.secondary_tag}>
								<IcMProfile className={styles.avatar} />
								{item?.sales_agent?.name}
							</div>
						) : null
					}
					{
						item?.requested_on ? (
							<div className={styles.secondary_tag}>
								Requested on :
								{formatDate({
									date       : item?.requested_on,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						) : null
					}
					{
						item?.serial_id ? (
							<div className={styles.secondary_tag}>
								RFQ ID :
								{' '}
								{item?.serial_id}
							</div>
						) : null
					}
				</div>
			</div>

			<div className={styles.revenue_details}>
				<ServiceStats data={stats} type="basic_details" live_contracts={live_contracts} />
				{services ? (
					<div className={styles.services}>
						{(services || []).map((val) => (
							<div className={styles.services} key={`${val}`}>
								{SERVICE_MAPPING[val]?.icon}
								<div className={styles.service_name}>{SERVICE_MAPPING[val]?.label}</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Card;
