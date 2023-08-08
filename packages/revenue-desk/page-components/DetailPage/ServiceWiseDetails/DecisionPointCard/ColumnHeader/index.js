import { InputNumber } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';
import getTableValue from './utils/getTableValue';

const NUMBERS = {
	ONE     : 1,
	TWO     : 2,
	HUNDRED : 100,
};
const columnTitle = [
	'profitability', 'buy_price', 'sell_price', 'shipping_line',
	'service_provider', 'active_booking', 'alloc_ratio', 'fulfill_ratio',
];
const getBackGround = (key) => {
	if (key === 'buy_price') return '#849E4C';
	if (key === 'sell_price') return '#EE3425';
	return '#221f20';
};
const getServiceLabel = ({ service, isHead }) => {
	const Label = service.split('_');
	if (isHead) {
		let columnLabel = '';
		Label.map((item) => {
			columnLabel += `${startCase(item)} `;
			return null;
		});
		return columnLabel;
	}
	return `${startCase(Label[GLOBAL_CONSTANTS.zeroth_index])} ${startCase(Label[NUMBERS.ONE])}`;
};
const calcProfit = ({ prefCount, sumBuy, sumSell }) => (NUMBERS.HUNDRED
* parseFloat((Number(sumSell[prefCount - NUMBERS.ONE])
			- Number(sumBuy[prefCount - NUMBERS.ONE]))
			/ Number(sumBuy[prefCount - NUMBERS.ONE]))).toFixed(NUMBERS.TWO);

function ColumnHeader({ list = {}, priceData = {} }) {
	const [prefCount, setPrefCount] = useState(NUMBERS.ONE);
	const [sumBuy, setSumBuy] = useState({});
	const [sumSell, setSumSell] = useState({});
	useEffect(() => {
		setSumBuy({});
		setSumSell({});
		Object.keys(list).map((service) => {
			Object.keys(list[service]).map((rowData) => {
				(list[service][rowData]).map((rowItem, index) => {
					setSumBuy((prev) => ({
						...prev,
						[index]: Number(prev[index] || GLOBAL_CONSTANTS.zeroth_index)
						+ Number(rowItem?.data?.rowData?.total_price_in_preferred_currency),
					}));
					setSumSell((prev) => ({
						...prev,
						[index]: Number(prev[index] || GLOBAL_CONSTANTS.zeroth_index)
						+ Number(priceData?.[rowData]?.[NUMBERS.ONE] || GLOBAL_CONSTANTS.zeroth_index)
						/ (Number(priceData?.exchange_rate || NUMBERS.ONE)) || GLOBAL_CONSTANTS.zeroth_index,
					}));
					return null;
				});
				return null;
			});
			return null;
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(list)]);

	if (isEmpty(sumBuy)) return null;
	return (
		<div>
			<div className={styles.outerContainer}>
				{columnTitle.map((title) => (
					<div key={title} className={styles.title}>
						{getServiceLabel({ service: title, isHead: true })}
					</div>
				))}
			</div>
			<div className={styles.overall}>
				<div className={styles.rowTitle}>
					Overall
					<div className={styles.preference}>
						<div className={styles.text}>Preference</div>
						<InputNumber
							size="xs"
							min={1}
							max={Math.max(Object.keys(sumBuy).length, Object.keys(sumSell).length)}
							value={prefCount}
							onChange={setPrefCount}
							step={1}
						/>
					</div>
				</div>

				<div className={styles.title}>
					{`${calcProfit({ prefCount, sumBuy, sumSell }) || GLOBAL_CONSTANTS.zeroth_index}%`}

				</div>
				<div className={styles.title} style={{ color: '#849E4C' }}>
					{
formatAmount({
	amount   : sumBuy?.[prefCount - NUMBERS.ONE] || GLOBAL_CONSTANTS.zeroth_index,
	currency : 'USD',
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	},
})
}
				</div>
				<div className={styles.title} style={{ color: '#EE3425' }}>
					{
formatAmount({
	amount   : sumSell?.[prefCount - NUMBERS.ONE] || GLOBAL_CONSTANTS.zeroth_index,
	currency : 'USD',
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	},
})
            }

				</div>
			</div>
			<div className={styles.tableContainer}>
				{Object.keys(list).map((service, index) => {
					const serviceIndex = index;
					return (
						<div key={service} className={styles.tableRow}>
							{Object.keys(list[service]).map((rowData, idx) => (
								<div
									key={rowData}
									style={{ background: serviceIndex % NUMBERS.TWO ? '#f9f9f9' : '#fff' }}
								>
									{!isEmpty(list[service][rowData]) ? (
										<div className={styles.serviceType}>
											{`${getServiceLabel({ service, isHead: false })} - ${(idx + NUMBERS.ONE)}`}
										</div>
									) : null}
									{(list[service][rowData]).map((rowItem, idxx) => (
										<div key={rowItem} className={styles.tableData}>
											<div className={styles.prefTitle}>
												<div>
													Preference :
													{' '}
													{idxx + NUMBERS.ONE}

												</div>
												{idxx + NUMBERS.ONE === prefCount
													? <IcCFtick width="20px" height="20px" /> : null}
											</div>
											{columnTitle.map((key) => (
												<div
													key={key}
													style={{ color: getBackGround(key) }}
													className={styles.rowBox}
												>
													{getTableValue({ key, rowItem, priceData, service_id: rowData })}
												</div>
											))}
										</div>
									))}
								</div>
							))}

						</div>
					);
				})}
			</div>

		</div>
	);
}

export default ColumnHeader;
