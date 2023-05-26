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
	const handleChangeOnEditMargin = (v) => {
		setEditedMargins((m) => {
			const newM = { ...m };
			const { serviceKey, ...rest } = v;
			if (!newM[serviceKey]) {
				newM[serviceKey] = [];
			}
			const codeIndex = newM[serviceKey].findIndex(
				(mar) => mar?.code === rest?.code,
			);
			if (codeIndex > -1) {
				newM[serviceKey][codeIndex] = rest;
			} else {
				newM[serviceKey].push(rest);
			}
			return newM;
		});
	};

	const serviceKey = item.id;
	const codeIndex = (editedMargins[serviceKey] || []).findIndex(
		(m) => m?.code === lineItem?.code,
	);

	let buy_price =		(lineItem?.total_price_discounted || 0)
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

	const finalPrice = (
		<div className={styles.container} style={{ width: getWidth(2.0) }}>
			<Margin
				item={lineItem}
				editedDemandMargin={editedMargins?.[serviceKey]?.[codeIndex] || {}}
			/>
		</div>
	);

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
			<div className={styles.col} style={{ width: getWidth(2), paddingLeft: '6px' }}>{finalPrice}</div>
		</div>
	);
}

export default RenderLineItem;
