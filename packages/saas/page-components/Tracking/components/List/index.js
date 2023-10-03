import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetListTracker from '../../hooks/useGetListTracker';

import AirCard from './AirCard';
import Header from './Header';
import ModalList from './ModalList';
import OceanCard from './OceanCard';
import styles from './styles.module.css';

const LOADING_ROWS = 5;

const CARD_COMPONENT = {
	air   : AirCard,
	ocean : OceanCard,
};

const EMPTY_STATE_IMG = {
	ocean : GLOBAL_CONSTANTS.image_url.ocean_empty_state,
	air   : GLOBAL_CONSTANTS.image_url.air_empty_state,
};

function List() {
	const { t } = useTranslation(['common', 'airOceanTracking']);
	const [modalInfo, setModalInfo] = useState({
		show: false,
	});
	const {
		data,
		loading, globalFilter, filterChangeHandler, refetchTrackerList,
		...rest
	} = useGetListTracker();

	const { activeTab = '' } = globalFilter;

	const { list = [], filter_data = {}, page, page_limit, total_count } = data || {};

	const newList = loading ? [...Array(LOADING_ROWS).keys()] : list;
	const Card = CARD_COMPONENT?.[activeTab];

	return (
		<div className={styles.container}>
			<Header
				globalFilter={globalFilter}
				filterChangeHandler={filterChangeHandler}
				filterData={filter_data}
				{...rest}
			/>

			{(newList || []).map((listItem) => (
				<Card
					key={listItem?.id || listItem}
					listItem={listItem}
					loading={loading}
					setModalInfo={setModalInfo}
					activeTab={activeTab}
					refetchTrackerList={refetchTrackerList}
				/>
			))}
			{isEmpty(newList) ? (
				<div className={styles.empty_state}>
					<Image
						src={EMPTY_STATE_IMG[activeTab]}
						width={450}
						height={300}
						alt="empty"
					/>
					<p>{t('airOceanTracking:tracking_data_not_found_text')}</p>
				</div>
			) : (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(e) => filterChangeHandler('page', e)}
					/>
				</div>
			)}

			<ModalList
				modalInfo={modalInfo}
				setModalInfo={setModalInfo}
				activeTab={activeTab}
				refetchTrackerList={refetchTrackerList}
			/>
		</div>
	);
}

export default List;
