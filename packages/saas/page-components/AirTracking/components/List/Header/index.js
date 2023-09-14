import {
	ButtonIcon, Tabs, TabPanel, cl, Button, Popover,
} from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getTabMapping, getViewMapping } from '../../../constant/tabMapping';
import useExportData from '../../../hooks/useExportData';
import useGetDsrList from '../../../hooks/useGetDsrList';
import useRedirectFn from '../../../hooks/useRedirectFn';

import DailyReport from './DailyReport';
import FilterSection from './FilterSection';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Header(props) {
	const { globalFilter, filterChangeHandler } = props;

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const { query } = useRouter();

	const TAB_MAPPING = getTabMapping({ t });

	const VIEW_MAPPING = getViewMapping({ t });

	const [showConfigure, setShowConfigure] = useState(false);

	const { isArchived = false } = query || {};
	const { activeTab = '', search_type = '' } = globalFilter;

	const { redirectArchivedList, redirectToDashboard, redirectToList } = useRedirectFn();
	const { loading, getTrackingData } = useExportData();

	const dsrListValue = useGetDsrList({ showConfigure });

	const backHandler = () => {
		if (isArchived) {
			redirectToList({ type: activeTab });
			return;
		}
		redirectToDashboard();
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.first_row}`}>

				<div className={styles.flex_box}>
					<ButtonIcon size="lg" icon={<IcMArrowBack />} themeType="primary" onClick={backHandler} />
					<h2>
						{isArchived ? t('airOceanTracking:tracking_list_archived_heading')
							: t('airOceanTracking:tracking_list_shipment_heading') }
					</h2>
					<div>
						<Tabs
							themeType="tertiary"
							activeTab={activeTab}
							onChange={(e) => filterChangeHandler('activeTab', e)}
						>
							{Object.keys(TAB_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} title={TAB_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				</div>

				<div className={cl`${styles.flex_box} ${styles.archived_section}`}>
					{!isArchived && (
						<>
							<Button
								type="button"
								themeType="linkUi"
								onClick={() => redirectArchivedList(activeTab)}
							>
								{t('airOceanTracking:tracking_list_button_label')}
							</Button>

							{activeTab === 'ocean' && (
								<Popover
									caret={false}
									visible={showConfigure}
									content={(
										<DailyReport
											activeTab={activeTab}
											dsrListValue={dsrListValue}
											setShowConfigure={setShowConfigure}
										/>
									)}
									placement="bottom-end"
								>
									<Button
										themeType="secondary"
										type="button"
										onClick={() => setShowConfigure((prev) => !prev)}
									>
										{t('airOceanTracking:tracking_list_daily_status_report_button_label')}
									</Button>
								</Popover>
							)}
						</>
					)}
					{activeTab === 'ocean' && (
						<Button
							type="button"
							loading={loading}
							className={styles.export_btn}
							onClick={getTrackingData}
						>
							{t('airOceanTracking:tracking_list_daily_export_data_button_label')}
						</Button>
					)}
				</div>

			</div>

			<div className={cl`${styles.flex_box} ${styles.second_row}
				${activeTab === 'ocean' ? styles.ocean_row : ''}`}
			>
				{activeTab === 'ocean'	&& (
					<div className={styles.second_row_tab}>
						<Tabs
							activeTab={search_type}
							onChange={(e) => filterChangeHandler('search_type', e)}
							themeType="secondary"
							fullWidth
						>
							{Object.keys(VIEW_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} title={VIEW_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				)}

				<FilterSection {...props} />
			</div>
		</div>
	);
}

export default Header;
