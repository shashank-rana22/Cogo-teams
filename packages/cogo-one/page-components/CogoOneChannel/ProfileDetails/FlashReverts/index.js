import { Pagination, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import REVERT_RATE_FILTERS from '../../../../constants/revertRatesFIlterMapping';
import useListShipmentFlashBookingRates from '../../../../hooks/useListShipmentFlashBookingRates';

import Card from './Card';
import RevertModal from './RevertModal';
import styles from './styles.module.css';

const loader = (
	<div className={styles.loader_div}>
		<Image src={GLOBAL_CONSTANTS.image_url.saas_subscription_loading} height={50} width={50} />
	</div>
);

export default function FlashReverts({
	orgId = '',
	activeVoiceCard,
	formattedMessageData,
}) {
	const [modalState, setModalState] = useState({ isOpen: false, data: {} });

	const userId = formattedMessageData?.user_id || activeVoiceCard?.user_id;

	const {
		data,
		loading,
		setActiveTab,
		activeTab,
		shipmentFlashBookingRates,
	} = useListShipmentFlashBookingRates({ orgId, accountType: formattedMessageData?.account_type });

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
						}}
					>
						{eachItem.title}
					</div>
				))}
			</div>
			<div className={styles.list}>
				{loading ? loader : (
					<Card
						list={list}
						activeTab={activeTab}
						setModalState={setModalState}
					/>
				)}

			</div>
			{!loading && (
				<Pagination
					type="compact"
					className={styles.pagination_styles}
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => shipmentFlashBookingRates({ page: val })}
				/>
			)}
			{modalState?.isOpen && (
				<RevertModal
					modalState={modalState}
					setModalState={setModalState}
					userId={userId}
					shipmentFlashBookingRates={shipmentFlashBookingRates}
				/>
			)}
		</div>
	);
}
