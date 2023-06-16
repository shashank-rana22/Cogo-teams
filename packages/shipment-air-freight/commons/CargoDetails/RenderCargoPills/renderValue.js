import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase, upperCase, format, isEmpty } from '@cogoport/utils';

import CONSTANTS from '../../../constants/CONSTANTS';
import copyToClipboard from '../../utils/copyToClipboard';

import styles from './styles.module.css';

const PACKAGES_MIN_LENGTH = 1;
const REQUIRED_DECIMAL_DIGIT = 2;
const SINGLE_PACKAGE = 1;

export const renderValue = (label, detail = {}) => {
	const {
		packages = [], chargeable_weight, volume, weight, commodity,
		airline = {}, packages_count, trade_type, payment_term,
		inco_term, price_type, service_type, source, schedule_departure,
		selected_schedule_departure, selected_schedule_arrival, schedule_arrival,
		booking_note_deadline, bl_category, bl_type, cargo_readiness_date,
		supplier_poc, shipper_details, buy_quotation_agreed_rates, hs_code = {},
		master_airway_bill_number, house_airway_bill_number, commodity_details, commodity_type, commodity_sub_type,
	} = detail;

	const commodityDataDetails = commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const valueForInput = Array.isArray(packages)
				&& !isEmpty(packages) ? packages[GLOBAL_CONSTANTS.zeroth_index] : null;

	const chargableWeight = Number(chargeable_weight)
					|| Math.max(volume * CONSTANTS.AIR_STANDARD_VOLUMETRIC_WEIGHT_CONVERSION_RATIO, weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(valueForInput?.packing_type)}`
		: '';

	const vol = ` ${volume} cbm`;

	const packageDetails = () => {
		if (packages?.length > PACKAGES_MIN_LENGTH) {
			return (
				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div style={{ fontSize: '10px' }}>
							{(packages || []).map((item) => {
								const values = item
									? `${item.packages_count} Pkg, (${item?.length}cm X ${item?.width
									}cm X ${item?.height}cm), ${startCase(item?.packing_type)}`
									: '';
								return <div key={JSON.stringify(item)}>{values}</div>;
							})}
						</div>
					)}
				>
					<div className="cargo-details-info">
						{`Package: ${inputValue} + ${packages.length - SINGLE_PACKAGE} more`}
					</div>
				</Tooltip>
			);
		}
		return `Package: ${inputValue}`;
	};

	const formatPocData = (pocDetails) => {
		const { name, mobile_country_code, mobile_number, email } = pocDetails || {};
		return (
			<div>
				<div>{name}</div>
				<div>
					{mobile_country_code}
					-
					{mobile_number}
				</div>
				<div>{email}</div>
			</div>
		);
	};

	const formatShipperDetails = (shipperDetails) => (
		<div>
			<div>{shipperDetails?.name}</div>
			<div>{shipperDetails?.address}</div>
		</div>
	);

	const commodityDetails = () => (
		<div>
			{`${startCase(commodity)}, ${startCase(
				commodityDataDetails?.commodity_type || commodity_type,
			)}, ${startCase(
				commodityDataDetails?.commodity_subtype || commodity_sub_type,
			)}`}
		</div>
	);

	switch (label) {
		case 'airline':
			return `Airline : ${airline?.business_name || ''}`;
		case 'packages_count':
			if (!packages_count) {
				return null;
			}

			if (packages_count === SINGLE_PACKAGE) {
				return '1 Package';
			}

			return `${packages_count} Packages`;
		case 'price_type':
			return `Price Type: ${startCase(price_type || '')}`;
		case 'trade_type':
			return startCase(trade_type || '');
		case 'commodity':
			return commodityDetails();
		case 'payment_term':
			return startCase(payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(inco_term || '')}`;
		case 'packages':
			if (isEmpty(packages)) {
				return null;
			}
			return packageDetails();

		case 'volume':
			return ` ${vol} ${service_type === 'ftl_freight_service'
				|| service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${chargableWeight.toFixed(REQUIRED_DECIMAL_DIGIT)} kg`
			}`;
		case 'weight':
			return ` ${weight} kgs`;
		case 'source':
			return source === 'direct'
				? 'Sell Without Buy'
				: startCase(source || '');
		case 'schedule_departure':
			return format(schedule_departure || selected_schedule_departure, 'dd MMM yyyy');
		case 'schedule_arrival':
			return format(schedule_arrival || selected_schedule_arrival, 'dd MMM yyyy');
		case 'booking_note_deadline':
			return format(booking_note_deadline, 'dd MMM yyyy - hh:mm aaa');
		case 'bl_category':
			return upperCase(bl_category);
		case 'bl_type':
			return upperCase(bl_type);
		case 'cargo_readiness_date':
			return format(cargo_readiness_date, 'dd MMM yyyy');
		case 'supplier_poc':
			return formatPocData(supplier_poc || {});
		case 'shipper_details':
			return formatShipperDetails(shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${buy_quotation_agreed_rates?.toFixed(REQUIRED_DECIMAL_DIGIT)} USD`;
		case 'hs_code':
			return `${hs_code?.hs_code} - ${hs_code?.name}`;
		case 'master_airway_bill_number':
			return (
				<div className={styles.mawb_container}>
					<span>
						MAWB Number:
						{' '}
						{master_airway_bill_number || ''}
					</span>
					<div
						className="mawb_copy"
						onClick={() => copyToClipboard(master_airway_bill_number || '', 'MAWB Number')}
						role="presentation"
					>
						<IcMCopy fill="#f9ae64" />
					</div>
				</div>
			);
		case 'house_airway_bill_number':
			return `HAWB Number: ${house_airway_bill_number || ''}`;
		default:
			return detail[label] || null;
	}
};
