import { useState } from 'react';

import useGetLocationsList from '../../hooks/useGetLocationsList';

import Header from './page-components/Header';
import PageView from './page-components/PageView';
import SideBarComponent from './page-components/SideBar';
import styles from './styles.module.css';

function Locations() {
	const [sideBar, setSideBar] = useState('');
	const [selectedLocation, setSelectedLocation] = useState({});

	const onClickCard = (values) => {
		setSideBar('details');
		setSelectedLocation(values);
	};

	const {
		data,
		filters,
		loading,
		setFilters,
	} = useGetLocationsList();
	return (
		<div className={styles.container}>
			<div className={styles.header} />

			<Header setFilters={setFilters} setSideBar={setSideBar} filters={filters} activeTab={filters.type} />
			<PageView
				onClickCard={onClickCard}
				setSideBar={setSideBar}
				setSelectedLocation={setSelectedLocation}
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
			/>
			{sideBar && (
				<SideBarComponent
					setSideBar={setSideBar}
					sideBar={sideBar}
					selectedLocation={selectedLocation}
					setSelectedLocation={setSelectedLocation}
				/>
			)}
		</div>
	);
}

export default Locations;
