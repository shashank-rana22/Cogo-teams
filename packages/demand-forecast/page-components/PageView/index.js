import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCalendar } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetForecastFclFreightClusters from '../../hooks/useGetForecastResults';

import Filters from './Filters';
import ForecastList from './ForecastList';
import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function PageView() {
	const [activeTab, setActiveTab] = useState('fcl_freight');

	const [filters, setFilters] = useState({});

	const {
		loading, list: dataList, page, setPage, pageData,
	} = useGetForecastFclFreightClusters({ filters });

	const card = dataList?.[GLOBAL_CONSTANTS.zeroth_index];

	const { forecast_start_date = '', forecast_end_date = '' } = card || {};

	const start_date = formatDate({
		date       : forecast_start_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
		separator  : ' ',
	});

	const end_date = formatDate({
		date       : forecast_end_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
		separator  : ' ',
	});

	return (
		<div>
			<Header />

			<div className={styles.secondary_header}>
				<Tab activeTab={activeTab} setActiveTab={setActiveTab} />
				<div className={styles.dates}>
					{!loading && start_date && end_date && (
						<div className={styles.forecast_date}>
							<IcMCalendar
								width={16}
								height={20}
								className={styles.calendar_image}
							/>
							{start_date}
							{' '}
							-
							{' '}
							{end_date}
						</div>
					)}
					<Filters setFilters={setFilters} setPage={setPage} filters={filters} />
				</div>

			</div>

			<ForecastList
				filters={filters}
				loading={loading}
				dataList={dataList}
				page={page}
				setPage={setPage}
				pageData={pageData}
			/>
		</div>
	);
}
export default PageView;
