import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowNext,
	IcMArrowRotateDown,
	IcMInfo,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

export function CardBody({ charge, type }) {
	const [showFullDetails, setShowFullDetails] = useState(false);
	const handleWidth = () => {
		setShowFullDetails(!showFullDetails);
	};
	const { serviceType, lineItems = [] } = charge || {};
	const hidden = lineItems.length < 2 ? styles.hidden : '';
	const BORDER_COLOR = '#6CC077';
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
			className={`${showFullDetails ? styles.card : styles.custompadding} ${
				lineItems.length < 2 ? styles.padding : ''
			}`}
			style={{ '--bordercolor': BORDER_COLOR }}
		>
			<div className={styles.layout}>
				<div
					className={styles.heading}
					style={{ '--span': 2 }}
				>
					{startCase(serviceType) || 'Platform Fees'}
				</div>
				<div
					className={styles.flex}
					style={{ '--span': 1 }}
				>
					Expected
				</div>
				<div
					className={styles.flex}
					style={{ '--span': 1 }}
				>
					Actual
				</div>
			</div>
			{(showFullDetails ? lineItems : lineItems.slice(0, 2)).map((lineItem) => {
				const value = Number(lineItem?.priceInInrActual) - Number(lineItem?.priceInInrQuotation);
				let className = styles.neutral;
				let iconClassName = styles.neutral_icon;
				if (value > 0 && type === 'sell') {
					className = styles.positive;
					iconClassName = styles.profiticon;
				} else if (value < 0 && type === 'sell') {
					className = styles.negative;
					iconClassName = styles.negative_icon;
				} else if (value > 0 && type === 'buy') {
					className = styles.negative;
					iconClassName = styles.negative_icon;
				} else if (value < 0 && type === 'buy') {
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
							style={{ '--span': 1 }}
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
							style={{ '--span': 1 }}
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
			{(showFullDetails || lineItems.length < 2) && (
				<div className={styles.total}>
					<div
						className={styles.heading}
						style={{ '--span': 2 }}
					/>
					<div
						className={`${styles.flex} ${styles.totalamount}`}
						style={{ '--span': 1 }}
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
						style={{ '--span': 1 }}
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
			<div
				className={`${styles.viewmore} ${hidden}`}
				role="presentation"
				onClick={handleWidth}
			>
				{showFullDetails ? 'View Less' : 'View More'}
				<span
					className={showFullDetails ? styles.arrowicon : styles.bottomicon}
				>
					<IcMArrowRotateDown height={15} width={15} />
				</span>
			</div>
		</div>
	) : null;
}
