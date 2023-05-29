import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useRouter } from 'next/router';

import { SERVICE_MAPPING } from '../../../../../../constants';
import { getformattedDuration } from '../../../../../../utils/getFormattedDuration';

import styles from './styles.module.css';

function Card({ item, handleCheck, checkedItems, partner_id }) {
	const { stats = {} } = item;
	console.log('item', item);
	console.log('stats', stats);
	const router = useRouter();

	const { port_pair_count = {} } = item;

	const services = Object.keys(port_pair_count);
	const priceFormating = (price, currency) => formatAmount({
		amount: price,
		currency,

		options: {
			style: 'currency',

			currencyDisplay: 'code',

			maximumFractionDigits: 0,
		},
	});

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
				<div className={styles.org_name}>{item?.name ? startCase(item?.name) : '-'}</div>
				<div className={styles.tags}>
					<div className={styles.primary_tag}>
						{
							item?.total_port_pair ? `${item?.total_port_pair} Port Pairs ` : null
						}

						{
							item?.requested_for_approval ? `: ${item?.requested_for_approval}
							Requested for Approval` : null
						}
					</div>
					{item?.importer_exporter?.sub_type
						&& <div className={styles.primary_tag}>{startCase(item?.importer_exporter?.sub_type)}</div>}
					{
						item?.importer_exporter?.bookings_completed_last_date ? (
							<div className={styles.primary_tag}>
								Last Shipment :
								{' '}
								{getformattedDuration(item?.importer_exporter?.bookings_completed_last_date)}
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
								{format(item?.requested_on, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
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
				<div className={styles.figures}>
					<div className={styles.field}>
						<div className={styles.label}>Promised Con Revenue</div>
						<div className={styles.value}>
							{stats.promised_consolidated_revenue
								? priceFormating(
									stats.promised_consolidated_revenue,
									stats.promised_consolidated_revenue_currency,
								)
								: '-'}

						</div>

					</div>
					<div className={styles.field}>
						<div className={styles.label}>Promised Con Profitability</div>
						<div className={styles.value}>
							{stats.promised_consolidated_profitability !== undefined
								? `${stats.promised_consolidated_profitability.toFixed(2)}%` : '-'}

						</div>

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
