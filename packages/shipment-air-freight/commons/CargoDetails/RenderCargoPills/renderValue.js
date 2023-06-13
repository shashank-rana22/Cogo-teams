import { Tooltip, Button } from '@cogoport/components';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase, upperCase, format } from '@cogoport/utils';
import { v4 as uuid } from 'uuid';

import CONSTANTS from '../../../constants/CONSTANTS';
import copyToClipboard from '../../utils/copyToClipboard';

import styles from './styles.module.css';

const {
	ZEROTH_INDEX,
	AIR_STANDARD_VOLUMETRIC_WEIGHT_CONVERSION_RATIO,
	EMPTY_LIST_LENGTH,
} = CONSTANTS;

const PACKAGES_MIN_LENGTH = 1;
const REQUIRED_DECIMAL_DIGIT = 2;
const SINGLE_PACKAGE = 1;

export const renderValue = (label, detail = {}) => {
	const { packages = [] } = detail;

	const commodityDataDetails = detail.commodity_details?.[ZEROTH_INDEX] || {};

	const valueForInput = Array.isArray(packages)
				&& !!packages?.length ? packages[ZEROTH_INDEX] : null;

	const chargableWeight = Number(detail?.chargeable_weight)
					|| Math.max(detail.volume * AIR_STANDARD_VOLUMETRIC_WEIGHT_CONVERSION_RATIO, detail?.weight);

	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = valueForInput
		? `${valueForInput.packages_count} Pkg, ${dimension} ${startCase(valueForInput?.packing_type)}`
		: '';

	const volume = ` ${detail.volume} cbm`;

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
								return <div key={uuid()}>{values}</div>;
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

	const formatPocData = (pocDetails) => (
		<div>
			<div>{pocDetails?.name}</div>
			<div>
				{pocDetails?.mobile_country_code}
				-
				{pocDetails?.mobile_number}
			</div>
			<div>{pocDetails?.email}</div>
		</div>
	);

	const formatShipperDetails = (shipperDetails) => (
		<div>
			<div>{shipperDetails?.name}</div>
			<div>{shipperDetails?.address}</div>
		</div>
	);

	const commodityDetails = () => (
		<div>
			{`${startCase(detail?.commodity)}, ${startCase(
				commodityDataDetails?.commodity_type || detail?.commodity_type,
			)}, ${startCase(
				commodityDataDetails?.commodity_subtype || detail?.commodity_sub_type,
			)}`}
		</div>
	);

	switch (label) {
		case 'airline':
			return `Airline : ${detail?.airline?.business_name || ''}`;
		case 'packages_count':
			if (!detail.packages_count) {
				return null;
			}

			if (detail.packages_count === SINGLE_PACKAGE) {
				return '1 Package';
			}

			return `${detail.packages_count} Packages`;
		case 'price_type':
			return `Price Type: ${startCase(detail?.price_type || '')}`;
		case 'trade_type':
			return startCase(detail.trade_type || '');
		case 'commodity':
			return commodityDetails();
		case 'payment_term':
			return startCase(detail.payment_term || '');
		case 'inco_term':
			return `Inco - ${upperCase(detail.inco_term || '')}`;
		case 'packages':
			if (packages?.length === EMPTY_LIST_LENGTH) {
				return null;
			}
			return packageDetails();

		case 'volume':
			return ` ${volume} ${detail.service_type === 'ftl_freight_service'
				|| detail.service_type === 'haulage_freight_service'
				? ''
				: `, Chargeable Weight: ${chargableWeight.toFixed(REQUIRED_DECIMAL_DIGIT)} kg`
			}`;
		case 'weight':
			return ` ${detail.weight} kgs`;
		case 'source':
			return detail?.source === 'direct'
				? 'Sell Without Buy'
				: startCase(detail.source || '');
		case 'state':
			return startCase(detail.state || '');
		case 'schedule_departure':
			return format(detail?.schedule_departure || detail?.selected_schedule_departure, 'dd MMM yyyy');
		case 'schedule_arrival':
			return format(detail?.schedule_arrival || detail?.selected_schedule_arrival, 'dd MMM yyyy');
		case 'bn_expiry':
			return format(detail?.bn_expiry, 'dd MMM yyyy');
		case 'booking_note_deadline':
			return format(detail?.booking_note_deadline, 'dd MMM yyyy - hh:mm aaa');
		case 'bl_category':
			return upperCase(detail.bl_category);
		case 'bl_type':
			return upperCase(detail.bl_type);
		case 'cargo_readiness_date':
			return format(detail?.cargo_readiness_date, 'dd MMM yyyy');
		case 'supplier_poc':
			return formatPocData(detail?.supplier_poc || {});
		case 'shipper_details':
			return formatShipperDetails(detail?.shipper_details || {});
		case 'buy_quotation_agreed_rates':
			return `${detail?.buy_quotation_agreed_rates.toFixed(REQUIRED_DECIMAL_DIGIT)} USD`;
		case 'hs_code':
			return `${detail?.hs_code?.hs_code} - ${detail?.hs_code?.name}`;
		case 'delivery_date':
			return format(detail?.delivery_date, 'dd MMM yyyy');
		case 'master_airway_bill_number':
			return (
				<div className={styles.mawb_container}>
					<span>
						MAWB Number:
						{' '}
						{detail?.master_airway_bill_number || ''}
					</span>
					<Button
						className="secondary sm"
						onClick={() => copyToClipboard(detail?.master_airway_bill_number || '', 'MAWB Number')}
					>
						<IcMCopy fill="#f9ae64" />
					</Button>
				</div>
			);
		case 'house_airway_bill_number':
			return `HAWB Number: ${detail?.house_airway_bill_number || ''}`;
		default:
			return detail[label] || null;
	}
};
