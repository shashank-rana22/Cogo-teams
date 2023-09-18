import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styled from './styles.module.css';

const getFormattedAmount = ({ amount, currency }) => (
	formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	})
);

function FieldPair({ itemData, field }) {
	const { topKey, lowerKey } = field || {};
	function Element(type, key, currencyKey = 'currency') {
		if (type === 'href') {
			return (
				<div className={styled.link}>
					<text onClick={() => window.open(getByKey(itemData, topKey?.redirectKey), '_blank')}>
						{getByKey(itemData, key)}
					</text>
				</div>
			);
		} if (type === 'tag') {
			return (
				<text className={styled.lower_keys}>
					{startCase(getByKey(itemData, key))}
				</text>
			);
		} if (type === 'serviceType') {
			return (<div className={styled.lower_keys}>{startCase(getByKey(itemData, key))}</div>);
		} if (type === 'amount') {
			return (
				<div>
					{getFormattedAmount({
						amount   : getByKey(itemData, key),
						currency : getByKey(itemData, currencyKey),
					})}
				</div>
			);
		}
		return (<div>{getByKey(itemData, key)}</div>);
	}

	return (
		<div>
			{!isEmpty(topKey) ? Element(topKey?.type, topKey?.key, topKey?.currencyKey) : null}
			{!isEmpty(lowerKey) ? Element(lowerKey?.type, lowerKey?.key, lowerKey?.currencyKey) : null}
		</div>
	);
}
export default FieldPair;
