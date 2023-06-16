import { toast, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

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
	} = item;

	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;
	const dimension = valueForInput?.length
		? `${valueForInput?.length}cm X ${valueForInput?.width}cm X ${valueForInput?.height}cm,`
		: '';

	const inputValue = `${valueForInput?.packages_count} Pkg, ${dimension} ${startCase(
		valueForInput?.packing_type,
	)}`;

	const copyToClipboard = async (text) => {
		const modifiedText = text.replace(/-/g, '');
		try {
			await navigator.clipboard.writeText(modifiedText);
			toast.success('MAWB Number copied to clipboard');
		} catch (err) {
			toast.error('Failed to copy MAWB Number');
		}
	};

	const chargableWeight = Number(chargeable_weight) || Math.max(volume * 166.67, weight);

	switch (props) {
		case 'airline':
			return `Airline:${airline?.business_name}`;
		case 'inco_term':
			return `IncoTerm-${upperCase(inco_term)}`;
		case 'trade_type':
			return `${startCase(trade_type)}`;
		case 'packages':
			return `Packages:${inputValue} `;
		case 'payment_term':
			return `${startCase(payment_term)}`;
		case 'volume':
			return `Volume:${item[props]} cbm, Chargeable Weight: ${chargableWeight.toFixed(2)} kgs`;
		case 'house_airway_bill_number':
			return `HAWB Number: ${house_airway_bill_number}`;
		case 'weight':
			return ` ${weight} kgs`;
		case 'price_type':
			return `Price Type: ${startCase(price_type)}`;
		case 'master_airway_bill_number':

			return (
				<div className={styles.mawb_container}>
					<span>
						MAWB Number:
						{' '}
						{item?.master_airway_bill_number || ''}
					</span>
					<div
						aria-hidden="true"
						onClick={() => copyToClipboard(item?.master_airway_bill_number || '')}
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
