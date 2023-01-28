import { Tooltip } from '@cogoport/components';
import {
	IcMArrowNext,
	IcMArrowRotateDown,
	IcMInfo,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { GenericObject } from '../../../../commons/Interfaces';
import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface Props {
	charge: GenericObject;
	type: string;
}
export function CardBody({ charge, type }: Props) {
	const [showFullDetails, setShowFullDetails] = useState(false);
	const handleWidth = () => {
		setShowFullDetails(!showFullDetails);
	};
	const { serviceType, lineItems = [] } = charge || {};
	const hidden = lineItems.length < 2 ? styles.hidden : '';
	const borderColor = '#6CC077';
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
			style={{ '--bordercolor': borderColor } as React.CSSProperties}
		>
			<div className={styles.layout}>
				<div
					className={styles.heading}
					style={{ '--span': 2 } as React.CSSProperties}
				>
					{startCase(serviceType) || 'Platform Fees'}
				</div>
				<div
					className={styles.flex}
					style={{ '--span': 1 } as React.CSSProperties}
				>
					Expected
				</div>
				<div
					className={styles.flex}
					style={{ '--span': 1 } as React.CSSProperties}
				>
					Actual
				</div>
			</div>
			{(showFullDetails ? lineItems : lineItems.slice(0, 2)).map((lineItem: GenericObject) => {
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
					<div className={styles.values}>
						<div
							className={`${styles.coloredlabel} ${
								lineItem?.sameCurrencyDataPresent && className
							}`}
							style={{ '--span': 2 } as React.CSSProperties}
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
							style={{ '--span': 1 } as React.CSSProperties}
						>
							{getFormattedPrice(
								lineItem?.priceQuotation,
								lineItem?.currencyQuotation,
							) || '-'}
						</div>
						<div
							className={styles.flex}
							style={{ '--span': 1 } as React.CSSProperties}
						>
							{getFormattedPrice(
								lineItem?.priceActual,
								lineItem?.currencyActual,
							) || '-'}
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
						style={{ '--span': 2 } as React.CSSProperties}
					/>
					<div
						className={`${styles.flex} ${styles.totalamount}`}
						style={{ '--span': 1 } as React.CSSProperties}
					>
						{charge?.serviceTotalQuotational
							? getFormattedPrice(charge?.serviceTotalQuotational, 'INR')
							: '-'}
					</div>
					<div
						className={`${styles.flex} ${styles.totalamount}`}
						style={{ '--span': 1 } as React.CSSProperties}
					>
						{charge?.serviceTotalActual
							? getFormattedPrice(charge?.serviceTotalActual, 'INR')
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
