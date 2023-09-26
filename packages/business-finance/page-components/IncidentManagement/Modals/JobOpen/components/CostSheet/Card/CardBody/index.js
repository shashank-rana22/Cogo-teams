import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowNext,
	IcMInfo,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const SPLIT_NUMBER = 2;
const SHOWFULLDETAILS = true;

export function CardBody({ charge = {}, type = '' }) {
	const { serviceType, lineItems = [] } = charge || {};
	function ToolTipContent(quotation, actual) {
		return (
			<div className={styles.content}>
				<div>
					<span className={styles.label}>Expected Quantity:</span>
					{' '}
					{quotation}
				</div>
				<div>
					<span className={styles.label}>Actual Quantity:</span>
					{' '}
					{actual}
				</div>
			</div>
		);
	}

	return charge ? (
		<div
			className={`${SHOWFULLDETAILS ? styles.card : styles.custompadding} ${
				lineItems.length < SPLIT_NUMBER ? styles.padding : ''
			}`}
		>
			<div className={styles.layout}>
				<div className={styles.flex}>
					<div
						className={styles.heading}
						style={{ '--span': 2 }}
					>
						{startCase(serviceType) || 'Platform Fees'}
					</div>
					<div className={styles.supplier}>
						{type === 'sell' ? 'Customer : ' : 'Service Provider : '}
						<div className={styles.name}>
							mayank yadav
						</div>

					</div>
				</div>
				<div className={styles.flexEnd}>
					<div className={styles.expectedContainer}>
						Expected
					</div>
					<div className={styles.actualContainer}>
						Actual
					</div>
				</div>
			</div>
			{(SHOWFULLDETAILS ? lineItems
				: lineItems.slice(GLOBAL_CONSTANTS.zeroth_index, SPLIT_NUMBER)).map((lineItem) => {
				const value = Number(lineItem?.priceInInrActual) - Number(lineItem?.priceInInrQuotation);
				let className = styles.neutral;
				let iconClassName = styles.neutral_icon;
				if (value > GLOBAL_CONSTANTS.zeroth_index && type === 'sell') {
					className = styles.positive;
					iconClassName = styles.profiticon;
				} else if (value < GLOBAL_CONSTANTS.zeroth_index && type === 'sell') {
					className = styles.negative;
					iconClassName = styles.negative_icon;
				} else if (value > GLOBAL_CONSTANTS.zeroth_index && type === 'buy') {
					className = styles.negative;
					iconClassName = styles.negative_icon;
				} else if (value < GLOBAL_CONSTANTS.zeroth_index && type === 'buy') {
					className = styles.positive;
					iconClassName = styles.profiticon;
				}
				return (
					<div key={lineItem?.id} className={styles.values}>
						<div
							className={`${styles.coloredlabel} ${
								lineItem?.sameCurrencyDataPresent && className
							}`}
							style={{ '--span': 2 }}
						>
							{lineItem.nameQuotation || lineItem.nameActual}
							<Tooltip
								content={ToolTipContent(
									lineItem?.quantityQuotation,
									lineItem?.quantityActual,
								)}
								placement="right"
							>
								<div className={styles.tooltip}>
									<IcMInfo />
								</div>
							</Tooltip>
						</div>
						<div
							className={styles.flex}
						>
							{(lineItem?.priceQuotation && lineItem?.currencyQuotation) ? formatAmount({
								amount   : lineItem?.priceQuotation,
								currency :	lineItem?.currencyQuotation,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							}) : '-'}
						</div>
						<div
							className={styles.flex}
						>
							{(lineItem?.priceActual && lineItem?.currencyActual) ? formatAmount({
								amount   :	lineItem?.priceActual,
								currency :	lineItem?.currencyActual,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							}) : '-'}
							{lineItem?.sameCurrencyDataPresent && (
								<span className={iconClassName}>
									<IcMArrowNext height={15} width={15} />
								</span>
							)}
						</div>
					</div>
				);
			})}
			{(SHOWFULLDETAILS || lineItems.length < SPLIT_NUMBER) && (
				<div className={styles.total}>
					<div
						className={styles.heading}
						style={{ '--span': 2 }}
					/>
					<div
						className={`${styles.flex} ${styles.totalamount}`}
					>
						{charge?.serviceTotalQuotational
							? formatAmount({
								amount   :	charge?.serviceTotalQuotational,
								currency : charge?.serviceCurrencyQuotational,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})
							: '-'}
					</div>
					<div
						className={`${styles.flex} ${styles.totalamount}`}
					>
						{charge?.serviceTotalActual
							? formatAmount({
								amount   :	charge?.serviceTotalActual,
								currency : GLOBAL_CONSTANTS.currency_code.INR,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})
							: '-'}
					</div>
				</div>
			)}
		</div>
	) : null;
}
