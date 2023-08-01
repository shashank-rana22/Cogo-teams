import { Placeholder, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Details from './Details';
import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

const DEFAULT_AMOUNT = 0;

const LABEL_MAPPING = {
	Financially   : 'actual',
	Operationally : 'operational',
};

function ColumnCard({
	config = {},
	item = {},
	loading = false,
	taxType = '',
	type = '',
}) {
	const [show, setShow] = useState(false);
	const { fields = [] } = config;

	const formData = {
		sid             : item?.jobNumber || '_',
		customerName    : startCase(item?.customerName || '-'),
		estimatedProfit : formatAmount({
			amount   : item?.[`estimatedProfitAmount${taxType}`] || DEFAULT_AMOUNT,
			currency : item?.currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		}),
		actualProfit: formatAmount({
			amount   : item?.[`${LABEL_MAPPING[type]}ProfitAmount${taxType}`] || DEFAULT_AMOUNT,
			currency : item?.currency,
			options  : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		}),
		deviation : item?.[`${LABEL_MAPPING[type]}ProfitDeviation${taxType}`] || '_',
		action    : (
			<div className={styles.flex}>
				{!show ? (
					<IcMArrowRotateDown
						className={styles.edit}
						height={15}
						width={15}
						onClick={() => setShow(true)}
					/>
				) : (
					<IcMArrowRotateUp className={styles.edit} height={15} width={15} onClick={() => setShow(false)} />
				)}
			</div>
		),
	};

	return (
		<div className={styles.marginbottom}>
			<div className={cl`${styles.flex} ${show ? styles.background : ''}`}>
				{fields.map((field) => (
					<div
						key={field.key}
						style={{
							'--span' : field.span || DEFAULT_SPAN,
							width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
						}}
						className={styles.col}
					>
						{loading
							? <Placeholder />
							: formData?.[field.key]}
					</div>
				))}
			</div>
			{show ? (
				<Details
					item={item}
					taxType={taxType}
					LABEL_MAPPING={LABEL_MAPPING}
					type={type}
				/>
			) : null}
		</div>
	);
}

export default ColumnCard;
