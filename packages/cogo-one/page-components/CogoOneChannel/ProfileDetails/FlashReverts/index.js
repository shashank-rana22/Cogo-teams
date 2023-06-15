import { Pagination, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import REVERT_RATE_FILTERS from '../../../../constants/revertRatesFIlterMapping';
import useListShipmentFlashBookingRates from '../../../../hooks/useListShipmentFlashBookingRates';

import Card from './Card';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;

const loader = (
	<div className={styles.loader_div}>
		<Image src={GLOBAL_CONSTANTS.image_url.saas_subscription_loading} height={50} width={50} />
	</div>
);

export default function FlashReverts({ orgId = '', accountType = '' }) {
	const {
		data,
		loading,
		setActiveTab,
		activeTab,
		setPagination,
	} = useListShipmentFlashBookingRates({ orgId, accountType });

	const { list = [], page = 1, page_limit = 10, total_count = '' } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				{REVERT_RATE_FILTERS.map((eachItem) => (
					<div
						role="button"
						tabIndex={0}
						key={eachItem.value}
						className={cl`${styles.each_filter} 
						${loading ? styles.on_loading : ''} ${eachItem.value === activeTab ? styles.selected_tab : ''}`}
						onClick={() => {
							setActiveTab(eachItem.value);
							setPagination(INITIAL_PAGE);
						}}
					>
						{eachItem.title}
					</div>
				))}
			</div>
			<div className={styles.list}>{loading ? loader : <Card list={list} activeTab={activeTab} />}</div>
			{!loading && (
				<Pagination
					type="compact"
					className={styles.pagination_styles}
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPagination}
				/>
			)}
		</div>
	);
}
