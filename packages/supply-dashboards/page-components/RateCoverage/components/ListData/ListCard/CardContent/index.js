import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { SERVICE_ICON_MAPPING } from '../../../../configurations/helpers/constants';

import styles from './styles.module.css';

function CardContent({ data = {}, filter = {}, service = {} }) {
	return (
		<div className={styles.header}>
			<div className={styles.top_left_details}>
				<div className={styles.service_icon}>
					<div style={{ margin: '5px 5px 0 0' }}>{SERVICE_ICON_MAPPING[service]}</div>
					<div>{startCase(service)}</div>
				</div>
				<div className={styles.vertical_line} />
				<div>
					<Pill size="md" color="green">
						{filter?.service === 'fcl_freight' ? 'Shipping Line:' : 'Air Line:'}
						{data?.shipping_line?.short_name || data?.airline?.short_name}
					</Pill>
				</div>
				<div className={styles.vertical_line} />
				<div>
					{data?.service_provider?.business_name || data?.service_provider?.name}
				</div>
			</div>
			<div className={styles.pill_container}>
				{data?.serial_id
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#ffe7d5">
								<span>
									TID :
									{' '}
									{data?.serial_id}
								</span>
							</Pill>
						</div>
					)}
				{data?.assigned_to?.name
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#EEF0F0">
								<span>
									Assigned to :
									{' '}
									{data?.assigned_to?.name}
								</span>
							</Pill>
						</div>
					)}
				{data?.closed_by?.name
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#EEF0F0">
								<span>
									Closed by :
									{' '}
									{data?.closed_by?.name}
								</span>
							</Pill>
						</div>
					)}
				<div>
					Last Updated At:
					{' '}
					{data?.created_at ? formatDate({
						date       : data?.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
						formatType : 'date',
					}) : '_'}
				</div>
			</div>
		</div>
	);
}

export default CardContent;
