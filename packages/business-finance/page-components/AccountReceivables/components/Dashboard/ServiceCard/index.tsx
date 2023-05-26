import { Tooltip, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMAirport, IcMTransport, IcMShip, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import CardData from './CardData';
import styles from './styles.module.css';

interface OverallStats {
	customersCount?: number,
	dashboardCurrency?: string,
	onAccountAmount?: number,
	onAccountAmountForPastSevenDaysPercentage?: number,
	openInvoiceAmountForPastSevenDaysPercentage?: number,
	openInvoicesAmount?: number,
	openInvoicesCount?: number,
	totalOutstandingAmount?: number
}

interface OceanProps {
	currency?: string,
	openInvoiceAmount?: number,
	tradeType?: object[]
}
interface OutstandingServiceWise {
	ocean?: OceanProps,
	air?: OceanProps,
	surface?: OceanProps
}

interface OutsatndingProps {
	outstandingServiceWise?: OutstandingServiceWise,
	overallStats?: OverallStats,
}

interface ServiceCardProps {
	outstandingData?: OutsatndingProps,
	outstandingLoading?: boolean,
	entityCode?: string,
}

function ServiceCard({ outstandingData, outstandingLoading, entityCode }: ServiceCardProps) {
	const {
		outstandingServiceWise = {},
	} = outstandingData || {};

	const {
		ocean = {},
		air = {},
		surface = {},
	} = outstandingServiceWise || {};
	const [isAccordionActive, setIsAccordionActive] = useState(false);

	const handleClick = () => {
		setIsAccordionActive(!isAccordionActive);
	};

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const {
		currency:oceanCurrency = '', openInvoiceAmount:oceanOpen = '',
		tradeType:oceanTradeType = [],
	} = ocean || {};
	const { currency:airCurrency = '', openInvoiceAmount:airOpen = '', tradeType:airTradeType = [] } = air || {};
	const {
		currency:surfaceCurrency = '',
		openInvoiceAmount:surfaceOpen = '', tradeType:surfaceTradeType = [],
	} = surface || {};

	const [tab, setTab] = useState({
		key  : 'Ocean',
		data : outstandingServiceWise?.ocean?.tradeType || [{}],
	});

	useEffect(() => {
		setTab({
			key  : 'Ocean',
			data : outstandingServiceWise?.ocean?.tradeType,
		});
	}, [outstandingServiceWise?.ocean?.tradeType]);

	const getCardData = [
		{
			label        : 'Ocean',
			amount       : oceanOpen,
			currency     : oceanCurrency || currency,
			openInvoices : oceanOpen || 0,
			tradeType    : oceanTradeType,
			onAccount    : 'onAccountAmount',
			icon         : <IcMShip style={{ width: '24px', height: '24px' }} />,
		},
		{
			label        : 'Air',
			currency     : airCurrency || currency,
			amount       : airOpen,
			openInvoices : airOpen || 0,
			tradeType    : airTradeType,
			onAccount    : 'onAccountAmount',
			icon         : <IcMAirport style={{ width: '24px', height: '24px' }} />,
		},
		{
			label        : 'Surface',
			currency     : surfaceCurrency || currency,
			amount       : surfaceOpen,
			tradeType    : surfaceTradeType,
			openInvoices : surfaceOpen || 0,
			onAccount    : 'onAccountAmount',
			icon         : <IcMTransport style={{ width: '24px', height: '24px' }} />,
		},
	];

	const serviceCard = [
		{
			label    : 'Ocean',
			amount   : oceanOpen || 0,
			currency : oceanCurrency || currency,
			icon     : <IcMShip className={styles.icon_container} />,
		},
		{
			label    : 'Air',
			currency : airCurrency || currency,
			amount   : airOpen || 0,
			icon     : <IcMAirport className={styles.icon_container} />,
		},
		{
			label    : 'Surface',
			currency : surfaceCurrency || currency,
			amount   : surfaceOpen || 0,
			icon     : <IcMTransport className={styles.icon_container} />,
		},
	];

	return (
		<div
			style={{
				maxHeight: isAccordionActive ? '430px' : '60px',
			}}
			className={styles.container}
		>

			<div
				className={styles.service_container}
				onClick={() => handleClick()}
				role="presentation"
			>

				<div
					className={styles.sub_service_container}
				>

					{outstandingLoading ? <Placeholder className={styles.placeholder_container} />

						: (
							<div className={styles.styled_text}>
								Account Receivables By Service
							</div>
						)}

				</div>

				{	!isAccordionActive

				&& (
					<div
						className={styles.ocean_container}
					>

						{outstandingLoading

							? [1, 2, 3].map((item) => (

								<div key={item} className={styles.card}>
									<div className={styles.row}>
										<Placeholder />

									</div>
								</div>

							))

							: (
								<>
									{serviceCard.map((item) => (
										<div
											className={styles.sub_ocean_container}
											key={item.label}
										>

											<IcMShip className={styles.icon_container} />

											<div className={styles.ocean_text}>
												{item.label}
											</div>
											<div className={styles.amount_currency}>
												<div className={styles.account_receivables_open_line}>
													<div>
														{item.currency}
													</div>

													<div
														className={styles.account_receivables_amount}
													>
														<Tooltip content={(
															<div>
																{getFormattedPrice(
																	item.amount,
																	item.currency,
																)}
															</div>
														)}
														>
															<div className={styles.wrapper}>
																{getFormattedPrice(
																	item.amount,
																	item.currency,
																	{
																		notation              : 'compact',
																		compactDisplay        : 'short',
																		maximumFractionDigits : 2,
																		style                 : 'decimal',
																	},
																)}
															</div>

														</Tooltip>

													</div>
												</div>
											</div>
										</div>
									))}
								</>
							)}

					</div>
				)}

				<div className={styles.header}>
					{isAccordionActive ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>

			</div>

			{isAccordionActive
			&& (
				<div>

					<div
						className={styles.accordian_card}
					/>

					<div className={styles.accordian_sub_card}>

						{getCardData.map((item) => (
							<div
								key={item.label}
								className={item.label === tab.key ? styles.on_click_ocean_card : styles.ocean_card}
								onClick={() => {
									setTab((prev) => ({
										...prev,
										key  : item?.label,
										data : item?.tradeType,
									}));
								}}
								role="presentation"
							>
								<div className={styles.sub_ocean_card}>
									<div className={styles.label_flex}>

										<div className={item.label === tab.key && styles.icon}>{item?.icon}</div>
										<div>
											<div
												className={item.label === tab.key
													? styles.text_label : styles.styled_ocean_text}
											>
												{item?.label}

											</div>
										</div>
									</div>
								</div>
								<div>
									<div className={styles.styled_ocean_text}>
										{getFormattedPrice(
											item?.openInvoices,
											item?.currency,
											{
												notation              : 'compact',
												compactDisplay        : 'short',
												maximumFractionDigits : 2,
											},
										)}

									</div>
								</div>
							</div>
						))}
					</div>
					<div><CardData tab={tab} /></div>

					<div
						className={styles.view_less}
						onClick={() => handleClick()}
						role="presentation"

					>
						<div
							className={styles.sub_view_less}
						>
							view Less
						</div>
					</div>
				</div>
			)}

		</div>
	);
}

export default ServiceCard;
