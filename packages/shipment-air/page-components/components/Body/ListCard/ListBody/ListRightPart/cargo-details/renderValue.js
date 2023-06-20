import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import copyToClipboard from '../../../../../../utils/copyToClipboard';

import styles from './styles.module.css';

const renderValue = (props = '', item = {}) => {
	const {
		airline = {},
		inco_term = '',
		trade_type = '',
		chargeable_weight = 0.0,
		weight = 0.0,
		volume = 0.0,
		payment_term = '',
		price_type = '',
		house_airway_bill_number = '',
		awb_execution_date,
		packages = [],
		bl_category = '',
		commodity_details = {},
		commodity_type = '',
		commodity_sub_type = '',
		commodity = '',
		master_airway_bill_number = '',
	} = item;

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;
	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = `${valueForInput?.packages_count} Pkg, ${dimension} ${startCase(
		valueForInput?.packing_type,
	)}`;

	const chargableWeight = Number(chargeable_weight) || Math.max(volume * 166.67, weight);

	const commodityDataDetails = commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const commodityDetails = () => (
		<div>
			{`${startCase(commodity)}, ${startCase(
				commodityDataDetails?.commodity_type || commodity_type,
			)}, ${startCase(
				commodityDataDetails?.commodity_subtype || commodity_sub_type,
			)}`}
		</div>
	);

	const handleMAWBNumberClick=(e)=>{
		e.stopPropagation();
		copyToClipboard(master_airway_bill_number || '', 'MAWB Number')
	}

	switch (props) {
		case 'airline':
			return `Airline:${airline?.business_name}`;
		case 'inco_term':
			return `IncoTerm-${upperCase(inco_term)}`;
		case 'trade_type':
			return `${startCase(trade_type)}`;
		case 'packages':
			return `Packages:${inputValue} `;
		case 'commodity':
			return commodityDetails();
		case 'payment_term':
			return `${startCase(payment_term)}`;
		case 'volume':
			return `Volume:${item[props]} cbm, Chargeable Weight: ${chargableWeight.toFixed(2)} kgs`;
		case 'house_airway_bill_number':
			return `HAWB Number: ${house_airway_bill_number}`;
		case 'weight':
			return ` ${weight} kgs`;
		case 'bl_category':
			return upperCase(bl_category);
		case 'price_type':
			return `Price Type: ${startCase(price_type)}`;
		case 'master_airway_bill_number':
			return (
				<div className={styles.mawb_container}>
					<span>
						MAWB Number:
						{' '}
						{master_airway_bill_number || ''}
					</span>
					<div
						aria-hidden="true"
						onClick={(e) => handleMAWBNumberClick(e)}
					>
						<IcMCopy />
					</div>
				</div>
			);
		case 'awb_execution_date':
			return `AWB Execution Date - ${formatDate({
				date       : awb_execution_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})}`;
		default:
			return `${item[props]}` || null;
	}
};
export default renderValue;
