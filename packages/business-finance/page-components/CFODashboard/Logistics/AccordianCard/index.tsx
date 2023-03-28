import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMOceanSchedules, IcMAirport, IcMTransport } from '@cogoport/icons-react';
import { useState } from 'react';

import getFormattedPrice from '../../../commons/utils/getFormattedPrice';
import OverallPayablesStatsKeyMapping from '../../constants/overall-payables-stats-key-mapping';
import OverallReceivablesStatsKeyMapping from '../../constants/overall-receivables-key-mapping';
import { serviceDataMapping } from '../../constants/service-base-data-mapping';
import { statsTabs } from '../../constants/service_base_key_mapping';
import useGetAccordianCardData from '../../hooks/getAccordianCardData';
import useGetAccordianStatsData from '../../hooks/getAccordianStatsCardData';
import showInTooltop from '../../utils/getOverFlowData';
import { getAmountInLakhCrK } from '../getAmountInLakhCrK';

import styles from './styles.module.css';

interface ItemProps {
	key: string;
	label: string;
}
function AccordianCards({ globalFilters }) {
	const {
		accordianDataData,
	} = useGetAccordianCardData({ globalFilters });

	const { accordianStatsData, refetch } = useGetAccordianStatsData({ globalFilters });

	const iconMapping = {
		Surface : <IcMTransport height={20} width={20} />,
		Air     : <IcMAirport height={20} width={20} />,
		Ocean   : <IcMOceanSchedules height={24} width={24} />,
	};

	const [subActiveTab, setSubActiveTab] = useState<string>('overall');
	const [viewButton, setViewButton] = useState({
		Ocean   : false,
		Surface : false,
		Air     : false,
	});

	function activeViewButton(service) {
		setViewButton((prev) => ({
			...prev,
			[service]: !prev[service],
		}));
	}

	return (
		<div>
			{(accordianDataData || []).map((item) => (
				<div className={styles.container}>
					<div className={styles.main_div}>
						<div className={styles.icon_div}>
							<div style={{ display: 'flex', width: '100px' }}>
								<div className={styles.icons}>{iconMapping[item?.service]}</div>
								<div className={styles.texts}>{item?.service}</div>
							</div>
							{!viewButton[item?.service]
						&& (
							<div className={styles.main_stats}>
								<div className={styles.amount_div}>
									<Tooltip
										content="Profit : INR 10,00,000.34 (AR - AP)"
										placement="top"
										caret={false}
									>
										<div className={styles.amounts}>
											<Pill size="xl" color="green">

												{showInTooltop(
													getFormattedPrice(Math.abs(item.accountRec - Math.abs(item.accountPay)), 'INR'),
													getAmountInLakhCrK(Math.abs(item.accountRec - Math.abs(item.accountPay)), 'INR'),
												)}

											</Pill>
										</div>
									</Tooltip>
								</div>
								<div className={styles.border} />
								<div className={styles.ar_amount}>
									<span style={{ marginRight: '10px' }}>AR:</span>
									{showInTooltop(
										getFormattedPrice(item?.accountRec, 'INR'),
										getAmountInLakhCrK(item?.accountRec, 'INR'),
									)}
								</div>
								<div className={styles.ar_amount}>
									<span style={{ marginRight: '10px' }}>AP:</span>
									{showInTooltop(
										getFormattedPrice(Math.abs(item?.accountPay), 'INR'),
										getAmountInLakhCrK(Math.abs(item?.accountPay), 'INR'),
									)}
								</div>
							</div>
						)}
						</div>

						<div className={styles.view_button}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => {
									if (viewButton[item?.service] === false) refetch(item?.service, undefined);
									activeViewButton(item?.service);
								}}
							>
								View More

							</Button>
						</div>
					</div>

					{viewButton[item?.service]
				&& (
					<div>
						<div className={styles.borders} />
						<div className={styles.stats_styles}>
							{statsTabs[item?.service].map((val:ItemProps) => (
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
										<span className={styles.overall_text}>{val.label}</span>
									)
										: (
											<div className={styles.import_export_style}>
												<div className={styles.stats_overall_import_export}>{val.label}</div>
												<div className={styles.stats_border_left} />

												<div className={styles.stats_text}>
													<div className={styles.labels}>
														AR :
														<div style={{ marginLeft: '10px' }}>
															{showInTooltop(
																getFormattedPrice((accordianStatsData?.arData
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '', 'INR'),
																getAmountInLakhCrK((accordianStatsData?.arData
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '', 'INR'),
															)}
														</div>
													</div>
													<div className={styles.labels}>
														AP :
														<div style={{ marginLeft: '10px' }}>
															{showInTooltop(
																getFormattedPrice(((accordianStatsData?.apData
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '') * -1, 'INR'),
																getAmountInLakhCrK(((accordianStatsData?.apData
																|| {})[((serviceDataMapping[item?.service]
																|| {})[val?.key] || {})?.AR] || '') * -1, 'INR'),
															)}
														</div>
													</div>
												</div>
											</div>
										)}
								</div>
							))}
						</div>

						<div className={styles.border_all}>
							<div className={styles.data_style}>
								<div className={styles.text_amount_styles}>
									<div>
										{showInTooltop(
											getFormattedPrice(accordianStatsData?.arData?.overdueAmount, 'INR'),
											getAmountInLakhCrK(accordianStatsData?.arData?.overdueAmount, 'INR'),
										)}
									</div>
									<div>Account Receivables</div>
								</div>
								<div>
									<div className={styles.border_left_top} />
								</div>
								<div className={styles.right_container}>
									{(OverallReceivablesStatsKeyMapping({ accordianStatsData }) || []).map((val) => (
										<div className={styles.due_ageing}>
											<div className={styles.recei_label}>{val.label}</div>
											<div className={styles.label}>{val.valueKey}</div>
										</div>
									))}
								</div>
							</div>
							<div className={styles.border_bottom} />
							<div className={styles.data_style}>
								<div className={styles.text_amount_styles}>
									<div>
										{showInTooltop(
											getFormattedPrice(Math.abs(accordianStatsData?.apData?.overdueAmount), 'INR'),
											getAmountInLakhCrK(Math.abs(accordianStatsData?.apData?.overdueAmount), 'INR'),
										)}
									</div>
									<div>Account Payables</div>
								</div>
								<div>
									<div className={styles.border_left_buttom} />
								</div>
								<div className={styles.right_container}>
									{(OverallPayablesStatsKeyMapping({ accordianStatsData }) || []).map((val) => (
										<div className={styles.due_ageing}>
											<div className={styles.recei_label}>{val.label}</div>
											<div className={styles.label}>{val.valueKey}</div>
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
	);
}

export default AccordianCards;
