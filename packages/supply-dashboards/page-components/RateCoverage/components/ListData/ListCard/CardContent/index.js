import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { SERVICE_ICON_MAPPING } from '../../../../configurations/helpers/constants';

import styles from './styles.module.css';

function CardContent({ data = {}, filter = {}, service = {} }) {
	const {
		shipping_line = {}, airline = {}, service_provider = {}, serial_id = {},
		assigned_to = {}, created_at = {},
	} = data || {};

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
						{['air_freight', 'air_customs']?.includes(filter?.service) ? 'Air Line:' : 'Shipping Line:'}
						{shipping_line?.short_name || airline?.short_name}
					</Pill>
				</div>
				<div className={styles.vertical_line} />
				<div>
					{service_provider?.business_name || service_provider?.name}
				</div>
			</div>
			<div className={styles.pill_container}>
				{serial_id
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#ffe7d5">
								<span>
									TID :
									{' '}
									{serial_id}
								</span>
							</Pill>
						</div>
					)}
				{assigned_to?.name
					&& (
						<div className={styles.pill}>
							<Pill size="md" color="#EEF0F0">
								<span>
									Assigned to :
									{' '}
									{assigned_to?.name}
								</span>
							</Pill>
						</div>
					)}
				<div>
					Last Updated At:
					{' '}
					{created_at && formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}

export default CardContent;
