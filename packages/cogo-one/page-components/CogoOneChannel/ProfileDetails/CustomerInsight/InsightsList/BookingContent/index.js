import { Tooltip } from '@cogoport/components';
import { IcMPort } from '@cogoport/icons-react';
import { startCase, isEmpty, format } from '@cogoport/utils';

import { SERVICE, SERVICE_ICON_MAPPING } from '../../../../../../constants';
import { TRANSACTIONAL_KEYS_MAPPING } from '../../../../../../constants/TRANSACTIONAL_KEYS_MAPPING';

import styles from './styles.module.css';

function BookingContent({ last_shipment_data = {}, trade_type = '', shipping_line = {}, created_at = '' }) {
	const services = last_shipment_data?.shipment_type;

	const { origin = '', destination = '' } = TRANSACTIONAL_KEYS_MAPPING[services] || {};

	const origin_port = last_shipment_data[origin] || {};

	const destination_port = last_shipment_data[destination] || {};

	function toolTip(country, name) {
		return (
			<div className={styles.tooltip_content}>
				{startCase(country)}
				,
				{' '}
				{startCase(name)}
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>

					<div className={styles.title}>
						{shipping_line?.business_name}
						{' '}

					</div>
				</div>
				<div className={styles.right}>

					<div className={styles.category_type}>
						{startCase(trade_type)}
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.type}>

					{SERVICE_ICON_MAPPING[last_shipment_data?.shipment_type]}
					<div className={styles.type_name}>{SERVICE[last_shipment_data?.shipment_type]}</div>
				</div>
				<div className={styles.details}>
					<div className={styles.port}>

						<Tooltip content={toolTip(origin_port?.country?.name, origin_port?.name)} placement="bottom">
							<div className={styles.origin}>
								{startCase(origin_port?.country?.name)}
								,
								{' '}
								{!isEmpty(origin_port?.port_code) && (
									<>
										(
										{origin_port?.port_code}
										)
									</>
								)}
								,
								{' '}
								{startCase(origin_port?.name)}
							</div>
						</Tooltip>

					</div>
					<IcMPort width={20} height={20} fill="#ACDADF" />

					<div className={styles.port}>

						<Tooltip
							content={toolTip(
								destination_port?.country?.name,
								destination_port?.name,
							)}
							placement="bottom"
						>
							<div className={styles.origin}>
								{startCase(destination_port?.country?.name)}
								,
								{' '}
								{!isEmpty(destination_port?.port_code) && (
									<>
										(
										{destination_port?.port_code}
										)
									</>
								)}
								,
								{' '}

								{startCase(destination_port?.name)}

							</div>
						</Tooltip>

					</div>
				</div>
			</div>
			<div className={styles.footer}>
				Booked On :
				{' '}
				{format(created_at, 'dd MMM YYYY')}
				{}
			</div>

		</div>
	);
}
export default BookingContent;
