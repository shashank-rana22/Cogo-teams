import { getByKey, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getFormattedAmount from '../../../../Settlement/commons/Utils/getFormattedAmount.ts';

import styled from './styles.module.css';

function FieldPair({ itemData, field }) {
	const { topKey, lowerKey } = field || {};
	const getElement = (type, key, currencyKey = 'currency') => {
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
	};

	return (
		<div>
			{!isEmpty(topKey) ? getElement(topKey?.type, topKey?.key, topKey?.currencyKey) : null}
			{!isEmpty(topKey) ? getElement(lowerKey?.type, lowerKey?.key, lowerKey?.currencyKey) : null}
		</div>
	);
}
export default FieldPair;
