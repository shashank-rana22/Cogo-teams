import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase, upperCase, isEmpty } from '@cogoport/utils';

import copyToClipboard from '../../utils/copyToClipboard';

import styles from './styles.module.css';

const PACKAGES_MIN_LENGTH = 1;
const REQUIRED_DECIMAL_DIGIT = 2;
const SINGLE_PACKAGE = 1;
const AIR_STANDARD_VOLUMETRIC_WEIGHT_CONVERSION_RATIO = 166.67;

export const renderValue = (label, detail = {}) => {
	const {
		packages = [], chargeable_weight, volume, weight, commodity, airline = {}, packages_count, trade_type, source,
		payment_term, inco_term, price_type, service_type, cargo_readiness_date, awb_execution_date, bl_category,
		master_airway_bill_number, house_airway_bill_number, commodity_details, commodity_type, commodity_sub_type,
	} = detail;

	const commodityDataDetails = commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const valueForInput = (Array.isArray(packages) && !isEmpty(packages) && packages[GLOBAL_CONSTANTS.zeroth_index])
	|| {};

	const chargableWeight = Number(chargeable_weight)
					|| Math.max(volume * AIR_STANDARD_VOLUMETRIC_WEIGHT_CONVERSION_RATIO, weight);

	const dimension = valueForInput.length
		? `${valueForInput.length}cm X ${valueForInput.width}cm X ${valueForInput.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(valueForInput.packing_type)}`
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
		case 'bl_category':
			return `BL Category: ${upperCase(bl_category)}`;

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
		case 'cargo_readiness_date':
			return formatDate({
				date       : cargo_readiness_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'is_minimum_price_shipment':
			return 'Min. Price';
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
		case 'schedule_departure':
			return formatDate({
				date       : detail?.schedule_departure || detail?.selected_schedule_departure,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'schedule_arrival':
			return formatDate({
				date       : detail?.schedule_arrival || detail?.selected_schedule_arrival,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		case 'awb_execution_date':
			return `AWB Exe. Date: ${formatDate({
				date       : awb_execution_date || awb_execution_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})}`;
		default:
			return detail[label] || null;
	}
};
