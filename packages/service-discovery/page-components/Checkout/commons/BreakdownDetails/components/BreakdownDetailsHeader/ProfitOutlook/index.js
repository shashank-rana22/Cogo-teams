import { Tags, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const geo = getGeoConstants();

function ProfitOutlook({
	rate = {},
	profitPercent = 0,
	latestDemandMargin = 0,
	condition = {},
}) {
	const {
		supply = 0,
		cogoport = 0,
		currency = '',
	} = rate?.total_margins || {};

	const toalProfitDisplay = formatAmount({
		amount   : latestDemandMargin,
		currency : geo.country.currency.code,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 0,
		},
	});

	const MAPPING = [
		{
			label : 'Sales',
			value : formatAmount({
				amount  : condition.isSuperAdmin ? latestDemandMargin - cogoport - supply : latestDemandMargin,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			}),
			visible: true,
		},
		{
			label : 'Supply',
			value : formatAmount({
				amount  : supply,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			}),
			visible: condition.isSuperAdmin,
		},
		{
			label : 'Cogoport',
			value : formatAmount({
				amount  : cogoport,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			}),
			visible: condition.isSuperAdmin,
		},
	];

	return (
		<div className={styles.container}>
			<div>Total margin for this shipment: </div>

			<div className={styles.amount}>{toalProfitDisplay}</div>

			<div style={{ marginRight: '12px' }}>
				(
				{profitPercent}
				% )
			</div>

			<Tags
				items={[
					{
						key      : 'margin',
						disabled : false,
						children : (
							<div className={styles.flex}>
								{MAPPING.map(({ label = '', value = 0, visible = true }, index) => {
									if (visible) {
										return (
											<div key={label} className={cl`${styles.flex} ${index && styles.item}`}>
												<div>{label}</div>
												<div className={styles.amount}>{value}</div>
											</div>
										);
									}

									return null;
								})}
							</div>
						),
						color    : '#e0e0e0',
						tooltip  : false,
						closable : false,
					},
				]}
				size="md"
			/>
		</div>
	);
}

export default ProfitOutlook;
