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
		origin_airport = {},
		trade_type = '',
		inco_term = '',
		destination_airport = {},
		airport = {},
	} = item;

	const { display_name = '', port_code = '', postal_code = '' } = origin_airport || {};

	const { display_name:destination_display_name = '', port_code:destination_port_code = '' } = destination_airport || {};

	const { display_name:ex1 = '', port_code:p2 = '' } = airport || {};

	const isSingleDataCountryServices = Object.keys(SingleCountryDataServices).includes(shipment_type);

	const { icon = '', text = '' } = SERVICE_ICON_MAPPINGS[shipment_type];

	const tradeType = trade_type || INCO_TERM_MAPING[inco_term];

	return (
		<div className={styles.list_middle_part}>
			<div className={styles.service_icon}>
				{icon}
				{text}
			</div>

			<div className={styles.service_icon}>
				{isSingleDataCountryServices ? (
					<div>
						<div>
							{SingleCountryDataServices[shipment_type][tradeType]}
						</div>
						<div>{SingleCountryDataServices[shipment_type].suffix_label}</div>
					</div>
				) : (
					<div>
						<div>
							{(port_code || postal_code)
								&& (
									<div>
										(
										{port_code || postal_code}
										)
										<div>{display_name}</div>
										{/* {icdInfo?.name ? <Icd>{icdInfo?.name}</Icd> : null} */}
									</div>
								)}
						</div>
					</div>
				)}
			</div>
			<div>
				<div>
					{(port_code || postal_code)
								&& (
									<div>
										(
										{destination_port_code || p2}
										)
										<div>{destination_display_name || ex1}</div>
										{/* {icdInfo?.name ? <Icd>{icdInfo?.name}</Icd> : null} */}
									</div>
								)}
				</div>
			</div>

		</div>
	);
}
export default ListMiddlePart;
