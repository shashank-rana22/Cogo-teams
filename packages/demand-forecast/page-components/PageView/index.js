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

	return (
		<div>
			<Header />

			<div className={styles.secondary_header}>
				<Tab activeTab={activeTab} setActiveTab={setActiveTab} />
				<Filters setFilters={setFilters} setPage={setPage} filters={filters} />
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
