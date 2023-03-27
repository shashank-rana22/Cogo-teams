import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMOceanSchedules, IcMAirport, IcMTransport } from '@cogoport/icons-react';
import { useState } from 'react';

import showOverflowingNumber from '../../../commons/showOverflowingNumber';
import getFormattedPrice from '../../../commons/utils/getFormattedPrice';
import OverallImportExportStatsKeyMapping from '../../constants/overall-import-export-stats-key-mapping';
import useGetAccordianCardData from '../../hooks/getAccordianCardData';
import useGetAccordianStatsData from '../../hooks/getAccordianStatsCardData';

import styles from './styles.module.css';

interface ItemProps {
	key: string;
	label: string;
}
function AccordianCards() {
	const {
		accordianDataData,
	} = useGetAccordianCardData();
	const { accordianStatsData } = useGetAccordianStatsData();

	const iconMapping = {
		Surface : <IcMTransport height={20} width={20} />,
		Air     : <IcMAirport height={20} width={20} />,
		Ocean   : <IcMOceanSchedules height={24} width={24} />,
	};
	const statsTabs = [
		{
			key   : 'overall',
			label : 'Overall',
		},
		{
			key   : 'import ',
			label : 'Import',
		},
		{
			key   : 'emport ',
			label : 'Emport',
		},
	];
	const [subActiveTab, setSubActiveTab] = useState<string>('overall');
	const [viewButton, setViewButton] = useState(false);
	function activeViewButton() {
		setViewButton(!viewButton);
	}

	return (
		<div>

			{(accordianDataData || []).map((item) => (

				<div className={styles.container}>
					<div className={styles.main_div}>
						<div className={styles.icon_div}>
							<div className={styles.icons}>{iconMapping[item?.service]}</div>
							<div className={styles.texts}>{item?.service}</div>
							{!viewButton
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
												{
												getFormattedPrice(
													item.accountRec - item.accountPay,
													'INR',
												)
												}

											</Pill>
										</div>
									</Tooltip>
								</div>
								<div className={styles.border} />
								<div className={styles.ar_amount}>
									<span style={{ marginRight: '10px' }}>AR :</span>
									{showOverflowingNumber(getFormattedPrice(item?.accountRec, 'INR'), 15)}
								</div>
								<div className={styles.ar_amount}>
									<span style={{ marginRight: '10px' }}>AP :</span>
									{showOverflowingNumber(getFormattedPrice(item?.accountPay, 'INR'), 15)}
								</div>
							</div>
						)}
						</div>

						<div className={styles.view_button}>
							<Button size="md" themeType="secondary" onClick={activeViewButton}>View More</Button>
						</div>
					</div>

					{viewButton
				&& (
					<div>
						<div className={styles.borders} />
						<div className={styles.stats_styles}>
							{statsTabs.map((val:ItemProps) => (
								<div
									key={val.key}
									className={val.key === subActiveTab
										? styles.border_overall : styles.sub_border_overall}
									onClick={() => {
										setSubActiveTab(val.key);
									}}
									role="presentation"
								>
									{subActiveTab === val.key ? (
										<span className={styles.overall_text}>{val.label}</span>
									)
										: (
											<div className={styles.import_export_style}>
												<div className={styles.stats_overall_import_export}>Import</div>
												<div className={styles.stats_border_left} />
												<div className={styles.stats_text}>
													<div className={styles.labels}>AR : </div>
													<div className={styles.labels}>AP : </div>
												</div>
											</div>
										)}
								</div>
							))}
						</div>

						<div className={styles.border_all}>
							<div className={styles.data_style}>
								<div className={styles.text_amount_styles}>
									<div>INR 40,00,000</div>
									<div>Account Receivables</div>
								</div>
								<div>
									<div className={styles.border_left_top} />
								</div>
								<div className={styles.right_container}>
									{(OverallImportExportStatsKeyMapping || []).map((val) => (
										<div className={styles.due_ageing}>
											<div className={styles.label}>{val.label}</div>

										</div>
									))}
								</div>
							</div>
							<div className={styles.border_bottom} />
							<div className={styles.data_style}>
								<div className={styles.text_amount_styles}>
									<div>INR 40,00,000</div>
									<div>Account Payables</div>
								</div>
								<div>
									<div className={styles.border_left_buttom} />
								</div>
								<div className={styles.right_container}>
									{(OverallImportExportStatsKeyMapping || []).map((val) => (
										<div className={styles.due_ageing}>
											<div className={styles.label}>{val.label}</div>

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
