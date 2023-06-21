import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import INCO_TERM_MAPING from '../../../../../constants/inco-term-mapping';
import SERVICE_ICON_MAPPINGS from '../../../../../constants/service-icon-mapping';

import styles from './styles.module.css';

const SingleCountryDataServices = {
	air_freight_local: {
		export       : 'Origin',
		import       : 'Destination',
		suffix_label : 'Location:',

	},
	air_customs: {
		export       : 'Origin',
		import       : 'Destination',
		suffix_label : 'Custom Clearance:',

	},
};

function ListMiddlePart({ item = {} }) {
	const {
		shipment_type = '',
		trade_type = '',
		inco_term = '',
	} = item;

	const isSingleDataCountryServices = Object.keys(SingleCountryDataServices).includes(shipment_type);

	const { icon = '', text = '' } = SERVICE_ICON_MAPPINGS[shipment_type];

	const tradeType = trade_type || INCO_TERM_MAPING[inco_term];

	const handleLocationPort = (key) => {
		const { display_name = '', port_code = '', postal_code = '' } = item[`${key}`] || {};
		return (
			<div className={styles.port_details_description}>
				{port_code || postal_code ? (
					<div>
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
					<div>{display_name}</div>
				</Tooltip>
			</div>
		);
	};
	return (
		<div className={styles.list_middle_part}>
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

						{handleLocationPort('airport')}
					</div>
				) : (

					<div className={styles.port_details}>

						{handleLocationPort('origin_airport')}
						<div>
							<IcMPortArrow />
						</div>
						{handleLocationPort('destination_airport')}

					</div>

				)}
			</div>

			<div className={styles.line} />

		</div>
	);
}
export default ListMiddlePart;
