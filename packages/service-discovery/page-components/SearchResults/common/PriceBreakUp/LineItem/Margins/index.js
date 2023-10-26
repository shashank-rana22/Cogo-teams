import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import CC from '../../../../../../helpers/condition-constants';
import useGetPermission from '../../../../../../helpers/useGetPermission';

import styles from './styles.module.css';

const ROUND_OFF_VALUE = 2;

function Margins({ margins = [] }) {
	const { isConditionMatches } = useGetPermission({ navigation: 'service_discovery' });

	const salesMargin = (margins || []).filter(
		(item) => item?.margin_type === 'demand',
	);
	const supplyMargin = (margins || []).filter(
		(item) => item?.margin_type === 'supply',
	);
	const cogoMargin = (margins || []).filter(
		(item) => item?.margin_type === 'cogoport',
	);

	let label = '';
	let margin = '';
	const handleMargin = (item, type) => {
		if (type === 'demand') {
			label = '(Sales)';
		} else if (type === 'supply') {
			label = '(Supply)';
		} else if (type === 'cogoport') {
			label = '(Cogo)';
		}

		if (!isEmpty(item)) {
			const value = item[GLOBAL_CONSTANTS.zeroth_index];

			const { value: marginValue = 0, margin_value = 0, currency = '' } = value || {};

			if (value?.type === 'percentage') {
				margin = `${currency}${margin_value} (${marginValue}%) ${label}`;
			} else {
				margin = `${currency}${(marginValue).toFixed(ROUND_OFF_VALUE)} ${label}`;
			}
		} else {
			margin = `0 ${label}`;
		}

		return margin;
	};

	return (
		<div className={styles.container}>
			<div className={styles.container}>
				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SALES_MARGIN],
					'or',
				) ? (
					<div>
						+
						<Pill>{handleMargin(salesMargin, 'demand')}</Pill>
					</div>
					) : null}

				{isConditionMatches(
					[...CC.SEE_ALL_MARGINS, ...CC.SEE_SUPPLY_MARGIN],
					'or',
				) ? (
					<div>
						+
						<Pill>{handleMargin(supplyMargin, 'supply')}</Pill>
					</div>
					) : null}
			</div>

			{isConditionMatches(CC.SEE_ALL_MARGINS, 'or') ? (
				<div>
					+
					<Pill>{handleMargin(cogoMargin, 'cogoport')}</Pill>
				</div>
			) : null}
		</div>
	);
}

export default Margins;
