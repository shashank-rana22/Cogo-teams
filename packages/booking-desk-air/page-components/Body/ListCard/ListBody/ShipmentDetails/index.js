import { Tooltip } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getSerialIdLabel = (t = () => {}) => ({
	consol       : t('airBookingDesk:serial_id_label_consol'),
	coload       : t('airBookingDesk:serial_id_label_coload'),
	defaultValue : t('airBookingDesk:serial_id_label_default_value'),
});

const INCLUDES_SHIPMENT = ['air_freight', 'domestic_air_freight'];

function ShipmentDetails({ item = {} }) {
	const { t } = useTranslation(['airBookingDesk']);

	const {
		serial_id = '',
		source = '',
		importer_exporter = {},
		entity_manager = {},
		booking_agent = {},
		airline = {},
	} = item;

	const { business_name = '' } = importer_exporter || {};

	const { business_name:airline_business_name = '' } = airline || {};

	const serialIdLabel = getSerialIdLabel(t);

	return (
		<div className={styles.shipment_details_container}>
			<div className={styles.container}>
				<div className={styles.serial_id}>
					{serialIdLabel[source] || serialIdLabel.defaultValue}
					{' '}
					#
					{serial_id || ''}
				</div>
				<Tooltip
					theme="light"
					interactive
					content={(
						<div>
							{business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>{business_name}</div>
				</Tooltip>
				{INCLUDES_SHIPMENT.includes(item?.shipment_type) && (
					<Tooltip
						theme="light"
						interactive
						content={<div>{airline_business_name}</div>}
					>
						<div className={styles.business_name}>
							<span>{t('airBookingDesk:heading_airline')}</span>
							{' '}
							{airline_business_name}
						</div>
					</Tooltip>
				)}
				<div className={styles.agent_name}>
					{t('airBookingDesk:heading_kam')}
					{' '}
					{entity_manager?.name || booking_agent?.name}
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ShipmentDetails;
