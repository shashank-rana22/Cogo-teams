import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useRouter } from 'next/router';

import { SERVICE_MAPPING } from '../../../../../../constants';
import { getformattedDuration } from '../../../../../../utils/getFormattedDuration';

import styles from './styles.module.css';

function Card({ item, handleCheck, checkedItems, partner_id }) {
	const router = useRouter();

	const { port_pair_count = {} } = item;

	const services = Object.keys(port_pair_count);

	return (
		<div
			role="presentation"
			onClick={() => router.push(`/${partner_id}/rfq-dashboard/${item.id}`)}
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
				<div className={styles.org_name}>{item?.name || '-'}</div>
				<div className={styles.tags}>
					<div className={styles.primary_tag}>
						{item?.total_port_pair}
						{' '}
						Port Pairs :
						{' '}
						{item?.requested_for_approval}
						{' '}
						Requested for Approval
					</div>
					<div className={styles.primary_tag}>{startCase(item?.importer_exporter?.sub_type)}</div>
					{item?.sub_type && <div className={styles.primary_tag}>{startCase(item?.sub_type)}</div>}
					<div className={styles.primary_tag}>
						Last Shipment :
						{' '}
						{getformattedDuration(item?.importer_exporter?.bookings_completed_last_date)}
						{' '}
						Ago
					</div>
				</div>
				<div className={styles.rest_tags}>
					<div className={styles.secondary_tag}>
						<IcMProfile className={styles.avatar} />
						{item?.kam?.name}
					</div>
					<div className={styles.secondary_tag}>
						Requested on :
						{format(item?.requested_on, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
					</div>
					<div className={styles.secondary_tag}>
						RFQ ID :
						{' '}
						{item?.serial_id}
					</div>
				</div>
			</div>

			<div className={styles.revenue_details}>
				<div className={styles.figures}>
					<div className={styles.field}>
						<div className={styles.label}>Promised Con Revenue</div>
						<div className={styles.value}>$1,40,000</div>

					</div>
					<div className={styles.field}>
						<div className={styles.label}>Promised Con Profitability</div>
						<div className={styles.value}>2.6 %</div>

					</div>
					{/* <div className={styles.field}>
						<div className={styles.label}>Avg Contract Utilization</div>
						<div className={styles.value}>11.2 %</div>

					</div> */}
					<div className={styles.field}>
						<div className={styles.label}>Live Contracts of Organization</div>
						<div className={styles.value}>{item?.live_contracts}</div>

					</div>
				</div>
				{services ? (
					<div className={styles.services}>
						{(services || []).map((val) => (
							<div className={styles.services}>
								{SERVICE_MAPPING[val].icon}
								<div className={styles.service_name}>{SERVICE_MAPPING[val].label}</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Card;
