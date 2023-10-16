import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import MapContainer from '../../../../common/MapContainer';
import Table from '../../../../common/Table';
import dashboardTableConfig from '../../../../configuration/dashboardTableConfig';
import useRedirectFn from '../../../../hooks/useRedirectFn';

import StatsContainer from './StatsContainer';
import styles from './styles.module.css';

function TrackingInfo({ summaryHook = {}, view = 'list' }) {
	const { data, loading, globalFilter, setGlobalFilter } = summaryHook || {};
	const { activeTab = '', page = 1 } = globalFilter || {};
	const {
		page_limit = 0, total_count = 0, on_track = 0,
		delayed = 0, attention_required = 0, list = [],
	} = data || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const { redirectToTracker = () => {} } = useRedirectFn();

	const itmFunction = {
		redirectToTracker,
		activeTab,
	};

	return (
		<div className={styles.container}>
			{activeTab === 'ocean' && (
				<StatsContainer
					stats={{ on_track, delayed, attention_required }}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			)}

			{view === 'list' && (
				<>

					<Table
						configs={dashboardTableConfig({ type: activeTab, t })}
						data={data}
						loading={loading}
						isClickable={false}
						showPagination={false}
						showHover={false}
						itmFunction={itmFunction}
						maxHeight="48vh"
						isScroll
					/>

					{(isEmpty(list) && !loading) && (
						<div className={styles.empty_state}>
							<Image
								src={GLOBAL_CONSTANTS.image_url.container_icon}
								width={300}
								height={200}
								alt="empty"
							/>
							<p className={styles.empty_state_txt}>{t('airOceanTracking:create_shipment_text')}</p>
						</div>
					)}
				</>
			)}

			{view === 'map' && (
				<MapContainer height="55vh" data={data} activeTab={activeTab} />
			)}

			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="compact"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(e) => setGlobalFilter((prev) => ({ ...prev, page: e }))}
					/>
				</div>
			)}
		</div>
	);
}
export default TrackingInfo;
