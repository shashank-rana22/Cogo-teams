import { Checkbox } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useRouter } from 'next/router';

import { SERVICE_MAPPING } from '../../../../../../constants';
import { getformattedDuration } from '../../../../../../utils/getFormattedDuration';

import styles from './styles.module.css';

function Card({ item, handleCheck, checkedItems, partner_id }) {
	const router = useRouter();

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
				<div className={styles.org_name}>{item?.organization_business_name || '-'}</div>
				<div className={styles.tags}>
					<div className={styles.primary_tag}>
						{item?.port_pairs_count}
						{' '}
						Port Pairs :
						{' '}
						{item?.pending_requests}
						{' '}
						Requested for Approval
					</div>
					{item?.sub_type && <div className={styles.primary_tag}>{startCase(item?.sub_type)}</div>}
					<div className={styles.primary_tag}>
						Last Shipment :
						{' '}
						{getformattedDuration(item?.last_shipment)}
						{' '}
						Ago
					</div>
				</div>
				<div className={styles.rest_tags}>
					<div className={styles.secondary_tag}>
						<IcMProfile className={styles.avatar} />
						{item?.kam_name}
					</div>
					<div className={styles.secondary_tag}>Requested on : 20 Mar 2023</div>
					<div className={styles.secondary_tag}>RFQ ID : 1124</div>
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
					<div className={styles.field}>
						<div className={styles.label}>Avg Contract Utilization</div>
						<div className={styles.value}>11.2 %</div>

					</div>
				</div>
				{item?.services ? (
					<div className={styles.services}>
						{(item?.services || []).map((val) => (
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
