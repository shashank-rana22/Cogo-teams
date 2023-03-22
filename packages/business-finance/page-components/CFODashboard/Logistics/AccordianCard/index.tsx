import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMOceanSchedules, IcMAirport } from '@cogoport/icons-react';
import { useState } from 'react';

// import OverallImportExportStats from '../../constants/overall-import-export-stats';
import OverallImportExportStatsKeyMapping from '../../constants/overall-import-export-stats-key-mapping';

import styles from './styles.module.css';

function AccordianCards() {
	const iconMapping = {
		air_freight : <IcMAirport height={20} width={20} />,
		fcl_freight : <IcMOceanSchedules height={24} width={24} />,
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
			<div className={styles.container}>
				<div className={styles.main_div}>
					<div className={styles.icon_div}>
						<div className={styles.icons}>{iconMapping.fcl_freight}</div>
						<div className={styles.texts}>Ocean</div>
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
											<Pill size="xl" color="green">INR 10,00,000</Pill>

										</div>
									</Tooltip>
								</div>
								<div className={styles.border} />
								<div className={styles.ar_amount}>AR : INR 40,00,000</div>
								<div className={styles.ar_amount}>AP : INR 30,00,000</div>
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
							{statsTabs.map((item) => (
								<div
									key={item.key}
									className={item.key === subActiveTab
										? styles.border_overall : styles.sub_border_overall}
									onClick={() => {
										setSubActiveTab(item.key);
									}}
									role="presentation"
								>
									{subActiveTab === item.key ? (
										<span className={styles.overall_text}>{item.label}</span>
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
		</div>
	);
}

export default AccordianCards;
