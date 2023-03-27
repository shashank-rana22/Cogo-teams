/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowRotateUp, IcMAirport, IcMTransport, IcMShip, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import CardData from './CardData';
import styles from './styles.module.css';

function ServiceCard({ outstandingData, outstandingLoading }) {
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

	const { currency:oceanCurrency, openInvoiceAmount:oceanOpen, tradeType:oceanTradeType } = ocean || {};
	const { currency:airCurrency, openInvoiceAmount:airOpen, tradeType:airTradeType } = air || {};
	const { currency:surfaceCurrency, openInvoiceAmount:surfaceOpen, tradeType:surfaceTradeType } = surface || {};

	const [tab, setTab] = useState({
		key  : 'Ocean',
		data : outstandingServiceWise?.ocean?.tradeType || [{}],
	});

	useEffect(() => {
		setTab({
			key  : 'Ocean',
			data : outstandingServiceWise?.ocean?.tradeType,
		});
	}, [JSON.stringify(outstandingServiceWise)]);

	const getCardData = [
		{
			label        : 'Ocean',
			amount       : oceanOpen,
			currency     : oceanCurrency,
			openInvoices : oceanOpen,
			tradeType    : oceanTradeType,
			onAccount    : 'onAccountAmount',
			icon         : <IcMShip style={{ width: '24px', height: '24px' }} />,
		},
		{
			label        : 'Air',
			currency     : airCurrency,
			amount       : airOpen,
			openInvoices : airOpen,
			tradeType    : airTradeType,
			onAccount    : 'onAccountAmount',
			icon         : <IcMAirport style={{ width: '24px', height: '24px' }} />,
		},
		{
			label        : 'Surface',
			currency     : surfaceCurrency,
			amount       : surfaceOpen,
			tradeType    : surfaceTradeType,
			openInvoices : surfaceOpen,
			onAccount    : 'onAccountAmount',
			icon         : <IcMTransport style={{ width: '24px', height: '24px' }} />,
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

					{outstandingLoading ? <Placeholder style={{ width: '200px', height: '30px' }} />

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

							? [1, 2, 3].map(() => (

								<div className={styles.card}>
									<div className={styles.row}>
										<Placeholder />

									</div>
								</div>

							))

							: (
								<>
									<div
										className={styles.sub_ocean_container}
									>

										<IcMShip style={{ width: '24px', height: '24px' }} />

										<div style={{ marginLeft: '12px' }}>
											Ocean
										</div>
										<div style={{ marginLeft: '16px' }}>
											<div className={styles.account_receivables_open_line}>
												<div>
													{oceanCurrency || 'INR'}
												</div>

												<div
													className={styles.account_receivables_amount}
												>
													<Tooltip content={(
														<div>
															{getFormattedPrice(
																oceanOpen,
																oceanCurrency,
															)}
														</div>
													)}
													>
														<div className={styles.wrapper}>
															{getFormattedPrice(
																oceanOpen || 0,
															)}
														</div>

													</Tooltip>

												</div>
											</div>
										</div>
									</div>

									<div
										className={styles.air_container}
									>

										<IcMAirport style={{ width: '24px', height: '24px' }} />

										<div style={{ marginLeft: '12px' }}>
											Air
										</div>

										<div style={{ marginLeft: '16px' }}>
											<div className={styles.account_receivables_open_line}>
												<div>
													{air?.currency || 'INR'}
												</div>

												<div
													className={styles.account_receivables_amount}
												>
													<Tooltip content={(
														<div>
															{getFormattedPrice(
																air?.openInvoiceAmount,
																air?.currency,
															)}
														</div>
													)}
													>
														<div className={styles.wrapper}>
															{getFormattedPrice(
																air?.openInvoiceAmount || 0,
																'INR',
															)}
														</div>

													</Tooltip>

												</div>
											</div>
										</div>

									</div>

									<div
										className={styles.air_container}
									>
										<IcMTransport style={{ width: '24px', height: '24px' }} />
										<div style={{ marginLeft: '12px' }}>
											Surface
										</div>

										<div style={{ marginLeft: '16px' }}>
											<div className={styles.account_receivables_open_line}>
												<div>
													{surface?.currency || 'INR'}
												</div>

												<div
													className={styles.account_receivables_amount}
												>
													<Tooltip content={(
														<div>
															{getFormattedPrice(
																surface?.openInvoiceAmount,
																surface?.currency,
															)}
														</div>
													)}
													>
														<div className={styles.wrapper}>
															{getFormattedPrice(
																surface?.openInvoiceAmount || 0,
																'INR',
															)}
														</div>

													</Tooltip>

												</div>
											</div>
										</div>
									</div>
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

					<div style={{ display: 'flex', justifyContent: 'space-between' }}>

						{getCardData.map((item) => (
							<div
								className={item.label === tab.key ? styles.on_click_ocean_card : styles.ocean_card}
								style={{ marginLeft: '20px' }}
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
									<div style={{ display: 'flex', alignItems: 'center' }}>

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
