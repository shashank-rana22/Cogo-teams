import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import INCO_TERM_MAPING from '../../../../../constants/inco-term-mapping';
import serviceIconMappings from '../../../../../constants/service-icon-mapping';

import styles from './styles.module.css';

const singleCountryDataServices = (t = () => {}) => ({
	air_freight_local: {
		export       : t('airBookingDesk:service_type_export_origin'),
		import       : t('airBookingDesk:service_type_import_destination'),
		suffix_label : t('airBookingDesk:service_type_suffix_label_location'),

	},
	air_customs: {
		export       : t('airBookingDesk:service_type_export_origin'),
		import       : t('airBookingDesk:service_type_import_destination'),
		suffix_label : t('airBookingDesk:service_type_suffix_label_custom_clearance'),

	},
});

function HandleLocationPort({ type = '', item = {} }) {
	const { display_name = '', port_code = '', postal_code = '' } = item[type] || {};

	return (
		<div className={styles.port_details_description}>
			{port_code || postal_code ? (
				<div className={styles.port_code}>
					(
					{port_code || postal_code}
					)
				</div>
			) : (
				<div style={{ height: '16px' }} />
			)}

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div>
						<div style={{ fontSize: '10px' }}>{display_name}</div>
					</div>
				)}
			>
				<div className={styles.display_name}>{display_name}</div>
			</Tooltip>
		</div>
	);
}

function PortDetails({ item = {} }) {
	const { t } = useTranslation(['airBookingDesk']);

	const {
		shipment_type = '',
		trade_type = '',
		inco_term = '',
	} = item || {};

	const SingleCountryDataServices = singleCountryDataServices(t);

	const isSingleDataCountryServices = Object.keys(SingleCountryDataServices).includes(shipment_type);

	const SERVICE_ICON_MAPPINGS = serviceIconMappings(t);
	const { icon = '', text = '' } = SERVICE_ICON_MAPPINGS[shipment_type];

	const tradeType = trade_type || INCO_TERM_MAPING[inco_term];

	return (
		<div className={styles.port_details_container}>
			<div className={styles.service_icon}>
				{icon}
				<div className={styles.service_name}>
					{text}
				</div>
			</div>

			<div className={styles.port_container}>
				{isSingleDataCountryServices ? (
					<div className={styles.single_service_port}>
						<div className={styles.single_service_origin}>
							<div>
								{SingleCountryDataServices[shipment_type][tradeType]}
							</div>
							<div>{SingleCountryDataServices[shipment_type].suffix_label}</div>
						</div>

						<HandleLocationPort type="airport" item={item} />
					</div>
				) : (

					<div className={styles.port_details}>
						<HandleLocationPort type="origin_airport" item={item} />
						<div>
							<IcMPortArrow />
						</div>
						<HandleLocationPort type="destination_airport" item={item} />
					</div>

				)}
			</div>

			<div className={styles.line} />

		</div>
	);
}
export default PortDetails;
