import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getWidth from '../../../../../utils/getWidth';

import Form from './Form';
import Margin from './Margin';
import styles from './styles.module.css';

function RenderLineItem({
	lineItem,
	item,
	editedMargins,
	setEditedMargins,
}) {
	const handleChangeOnEditMargin = (values) => {
		setEditedMargins((margin) => {
			const newMargin = { ...margin };
			const { serviceKey, ...rest } = values;
			if (!newMargin[serviceKey]) {
				newMargin[serviceKey] = [];
			}
			const codeIndex = newMargin[serviceKey].findIndex(
				(mar) => mar?.code === rest?.code,
			);
			if (codeIndex > -1) {
				newMargin[serviceKey][codeIndex] = rest;
			} else {
				newMargin[serviceKey].push(rest);
			}
			return newMargin;
		});
	};

	const serviceKey = item.id;
	const codeIndex = (editedMargins[serviceKey] || []).findIndex(
		(m) => m?.code === lineItem?.code,
	);

	let buy_price =	(lineItem?.total_price_discounted || 0)
		- ((lineItem.margins || []).find(
			(marginObj) => marginObj?.margin_type === 'demand',
		)?.total_margin_value || 0);

	buy_price = formatAmount({
		amount   : Number(buy_price),
		currency : lineItem?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	return (
		<div className={styles.row}>
			<div className={styles.col} style={{ width: getWidth(2.5) }}>{lineItem?.name}</div>
			<div className={styles.col} style={{ width: getWidth(2.0) }}>{buy_price}</div>
			<div className={styles.col} style={{ width: getWidth(5.5) }}>
				<Form
					onChange={handleChangeOnEditMargin}
					serviceKey={serviceKey}
					lineItem={lineItem}
					marginType="demand"
				/>
			</div>
			<div className={styles.col} style={{ width: getWidth(2), paddingLeft: '6px' }}>
				<div className={styles.container} style={{ width: getWidth(2.0) }}>
					<Margin
						item={lineItem}
						editedDemandMargin={editedMargins?.[serviceKey]?.[codeIndex] || {}}
					/>
				</div>

			</div>
		</div>
	);
}

export default RenderLineItem;
