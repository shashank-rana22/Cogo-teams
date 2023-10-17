import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOceanSchedules, IcMAirport, IcMTransport } from '@cogoport/icons-react';
import { useState } from 'react';

import OverallPayablesStatsKeyMapping from '../../constants/overall-payables-stats-key-mapping';
import OverallReceivablesStatsKeyMapping from '../../constants/overall-receivables-key-mapping';
import { serviceDataMapping } from '../../constants/service-base-data-mapping';
import { statsTabs } from '../../constants/service_base_key_mapping';
import useGetAccordianCardData from '../../hooks/getAccordianCardData';
import useGetAccordianStatsData from '../../hooks/getAccordianStatsCardData';
import showInTooltop from '../../utils/getOverFlowData';

import styles from './styles.module.css';

function AccordianCards({ globalFilters, entityTabFilters }) {
	const [isViewButtonOpen, setIsViewButtonOpen] = useState(null);
	const {
		accordianDataData,
		accordianDataLoading,
	} = useGetAccordianCardData({ globalFilters, entityTabFilters });

	const {
		accordianStatsData,
		refetch,
		accordianStatsLoading,
	}	 = 	useGetAccordianStatsData({ globalFilters, entityTabFilters });

	const iconMapping = {
		Surface : <IcMTransport height={20} width={20} />,
		Air     : <IcMAirport height={20} width={20} />,
		Ocean   : <IcMOceanSchedules height={24} width={24} />,
	};

	const [subActiveTab, setSubActiveTab] = useState('overall');
	const [viewButton, setViewButton] = useState({
		Ocean   : false,
		Surface : false,
		Air     : false,
	});

	function activeViewButton(service) {
		setViewButton((prev) => ({
			Ocean     : false,
			Surface   : false,
			Air       : false,
			[service] : !prev[service],
		}));
		refetch(service, undefined);
	}

	return (
		<div>
			{accordianDataLoading ? (
				<>
					{([1, 2, 3]).map((val) => (
						<Placeholder
							key={val}
							height="100px"
							width="100%"
							margin="20px 20px 20px 0px"
							style={{ borderRadius: '4px' }}
						/>
					))}
				</>
			) : (
				<div>
					{(accordianDataData || []).map((item) => (
						<div className={styles.container} key={item}>
							<div className={styles.main_div}>
								<div className={styles.icon_div}>
									<div style={{ display: 'flex', width: '100px' }}>
										{accordianDataLoading ? (
											<Placeholder
												height="20px"
												width="324px"
												margin="10px 0px 20px 0px"
											/>
										) : (
											<>
												<div className={styles.icons}>{iconMapping[item?.service]}</div>
												<div className={styles.texts}>{item?.service}</div>
											</>
										)}
									</div>
									{!viewButton[item?.service] && (
										<div className={styles.main_stats}>
											{accordianDataLoading ? (
												<Placeholder
													height="20px"
													width="200px"
													margin="10px 0px 20px 50px"
												/>
											) : (
												<div className={styles.amount_div}>
													<div className={styles.amounts}>
														<div className={item.accountRec + item.accountPay >= 0
															? styles.pills : styles.pill}
														>
															{showInTooltop(
																formatAmount({
																	amount:	(Math.abs(item.accountRec
																		+ item.accountPay)),
																	currency : GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style           : 'currency',
																		currencyDisplay : 'code',
																	},
																}),
																formatAmount({
																	amount:	Math.abs(
																		item.accountRec + item.accountPay,
																	),
																	currency : GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style           : 'currency',
																		currencyDisplay : 'code',
																		notation        : 'compact',
																	},
																}),
															)}
														</div>
													</div>
												</div>
											)}
											<div className={styles.border} />
											{accordianDataLoading ? (
												<Placeholder
													height="20px"
													width="150px"
													margin="	10px 40px 20px 0px"
												/>
											) : (
												<div className={styles.ar_amount}>
													<span style={{ marginRight: '10px' }}>AR:</span>
													{showInTooltop(
														formatAmount({
															amount   :	item?.accountRec,
															currency : GLOBAL_CONSTANTS.currency_code.INR,
															options  : {
																style           : 'currency',
																currencyDisplay : 'code',
															},
														}),
														formatAmount({
															amount   :	item?.accountRec,
															currency :	GLOBAL_CONSTANTS.currency_code.INR,
															options  : {
																style           : 'currency',
																currencyDisplay : 'code',
																notation        : 'compact',
															},
														}),
													)}
												</div>
											)}

											{accordianDataLoading ? (
												<Placeholder
													height="20px"
													width="150px"
													margin="	10px 40px 20px 0px"
												/>
											) : (
												<div className={styles.ar_amount}>
													<span style={{ marginRight: '10px' }}>AP:</span>
													{showInTooltop(
														formatAmount({
															amount   :	(Math.abs(item?.accountPay)),
															currency : GLOBAL_CONSTANTS.currency_code.INR,
															options  : {
																style           : 'currency',
																currencyDisplay : 'code',
															},
														}),
														formatAmount({
															amount   :	Math.abs(item?.accountPay),
															currency :	GLOBAL_CONSTANTS.currency_code.INR,
															options  : {
																style           : 'currency',
																currencyDisplay : 'code',
																notation        : 'compact',
															},
														}),
													)}
												</div>
											)}
										</div>
									)}
								</div>
								{accordianDataLoading ? (
									<Placeholder
										height="20px"
										width="150px"
										margin="	10px 40px 20px 0px"
									/>
								) : (
									<div className={styles.view_button}>

										{isViewButtonOpen === item?.service
											? (
												<Button
													size="md"
													themeType="secondary"
													onClick={() => {
														activeViewButton(item?.service);
														setIsViewButtonOpen(null);
													}}
												>
													View Less

												</Button>
											)
											:												(
												<Button
													size="md"
													themeType="secondary"
													onClick={() => {
														if (
															viewButton[item?.service] === false
														) { refetch(item?.service, undefined); }
														activeViewButton(item?.service);
														setIsViewButtonOpen(
															isViewButtonOpen === null ? item.service : null,
														);
														setIsViewButtonOpen(item.service);
													}}
												>
													View More

												</Button>
											)}
									</div>
								)}
							</div>

							{isViewButtonOpen === item?.service && (
								<div>
									<div className={styles.borders} />

									<div className={styles.stats_styles}>
										{(statsTabs[item?.service] || []).map((val) => (
											<div
												key={val.key}
												className={val.key === subActiveTab
													? styles.border_overall : styles.sub_border_overall}
												onClick={() => {
													refetch(item.service, val.key);
													setSubActiveTab(val.key);
												}}
												role="presentation"
											>

												{subActiveTab === val.key ? (
													<div>
														{accordianStatsLoading
															? (
																<Placeholder
																	height="20px"
																	width="100px"
																	margin="10px 40px 20px 50px"
																/>
															)
															: (
																<span className={styles.overall_text}>{val.label}</span>
															)}
													</div>
												)
													: (
														<div className={styles.import_export_style}>
															{accordianStatsLoading
																? (
																	<Placeholder
																		height="20px"
																		width="100px"
																		margin="10px 40px 20px 0px"
																	/>
																)
																: (
																	<div className={styles.stats_overall_import_export}>
																		{val.label}

																	</div>
																)}
															<div className={styles.stats_border_left} />

															<div className={styles.stats_text}>
																{accordianStatsLoading ? (
																	<Placeholder
																		height="20px"
																		width="152px"
																		margin="	10px 40px 20px 0px"
																	/>
																) : (
																	<>
																		<div className={styles.labels}>
																			AR :
																			<div style={{ marginLeft: '10px' }}>
																				{showInTooltop(
																					formatAmount({
																						amount: (accordianStatsData
																							?.cardDataAr
																		|| {})[((serviceDataMapping[item?.service]
																		|| {})[val?.key] || {})?.AR] || '',
																						currency:
																						GLOBAL_CONSTANTS
																							.currency_code.INR,
																						options: {
																							style:
																							'currency',
																							currencyDisplay: 'code',
																						},
																					}),
																					formatAmount({
																						amount:	(
																							accordianStatsData
																								?.cardDataAr
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR]
																|| '',
																						currency:	GLOBAL_CONSTANTS
																							.currency_code.INR,
																						options: {
																							style:
																								'currency',
																							currencyDisplay : 'code',
																							notation        : 'compact',
																						},
																					}),
																				)}
																			</div>
																		</div>
																		<div className={styles.labels}>
																			AP :
																			<div style={{ marginLeft: '10px' }}>
																				{showInTooltop(
																					formatAmount({
																						amount: (
																							(accordianStatsData
																								?.cardDataAp
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '') * -1,
																						currency: GLOBAL_CONSTANTS
																							.currency_code.INR,
																						options: {
																							style:
																							'currency',
																							currencyDisplay: 'code',
																						},
																					}),
																					formatAmount({
																						amount:	(
																							(accordianStatsData
																								?.cardDataAp
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '') * -1,
																						currency:	GLOBAL_CONSTANTS
																							.currency_code.INR,
																						options: {
																							style:
																								'currency',
																							currencyDisplay : 'code',
																							notation        : 'compact',
																						},
																					}),
																				)}
																			</div>
																		</div>
																	</>
																)}
															</div>
														</div>
													)}
											</div>
										))}
									</div>

									<div className={styles.border_all}>
										<div className={styles.data_style}>
											<div className={styles.text_amount_styles}>
												{accordianStatsLoading ? (
													<Placeholder
														height="20px"
														width="152px"
														margin="	10px 40px 20px 0px"
													/>
												) : (
													<>
														<div style={{ fontWeight: '600' }}>
															{showInTooltop(
																formatAmount({
																	amount:	accordianStatsData
																		?.arData?.overdueAmount,
																	currency : GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style:
																		'currency',
																		currencyDisplay: 'code',
																	},
																}),
																formatAmount({
																	amount:	accordianStatsData
																		?.arData?.overdueAmount,
																	currency :	GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style:
																	'currency',
																		currencyDisplay : 'code',
																		notation        : 'compact',
																	},
																}),
															)}
														</div>
														<div>Account Receivables</div>
													</>
												)}
											</div>
											<div>
												<div className={styles.border_left_top} />
											</div>

											<div className={styles.right_container}>
												{(OverallReceivablesStatsKeyMapping({ accordianStatsData })
												|| []).map((val) => (
													<div className={styles.due_ageing} key={val}>
														{accordianStatsLoading ? (
															<Placeholder
																height="20px"
																width="100px"
																margin="10px 40px 20px 0px"
															/>
														) : (
															<>
																<div className={styles.recei_label}>{val.label}</div>
																<div className={styles.label}>{val.valueKey}</div>
															</>
														)}
													</div>
												))}
											</div>
										</div>
										<div className={styles.border_bottom} />
										<div className={styles.data_style}>
											<div className={styles.text_amount_styles}>
												{accordianStatsLoading ? (
													<Placeholder
														height="20px"
														width="100px"
														margin="10px 40px 20px 0px"
													/>
												) : (
													<>
														<div style={{ fontWeight: '600' }}>
															{showInTooltop(
																formatAmount({
																	amount:	Math.abs(accordianStatsData
																		?.apData?.overdueAmount),
																	currency : GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style:
																		'currency',
																		currencyDisplay: 'code',
																	},
																}),
																formatAmount({
																	amount:	Math.abs(accordianStatsData
																		?.apData?.overdueAmount),
																	currency :	GLOBAL_CONSTANTS.currency_code.INR,
																	options  : {
																		style:
																	'currency',
																		currencyDisplay : 'code',
																		notation        : 'compact',
																	},
																}),
															)}
														</div>
														<div>Account Payables</div>
													</>
												)}
											</div>
											<div>
												<div className={styles.border_left_buttom} />
											</div>
											<div className={styles.right_container}>
												{(OverallPayablesStatsKeyMapping({ accordianStatsData })
												|| []).map((val) => (
													<div className={styles.due_ageing} key={val}>
														{accordianStatsLoading ? (
															<Placeholder
																height="20px"
																width="100px"
																margin="10px 40px 20px 0px"
															/>
														) : (
															<>
																<div className={styles.recei_label}>{val.label}</div>
																<div className={styles.label}>{val.valueKey}</div>
															</>
														)}
													</div>
												))}
											</div>
										</div>
									</div>

								</div>
							)}
						</div>
					))}

				</div>
			)}
		</div>
	);
}

export default AccordianCards;