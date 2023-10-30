import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import useGetLocationsList from './hooks/useGetLocationsList';
import Header from './page-components/Header';
import PageView from './page-components/PageView';

const SideBarComponent = dynamic(() => import('./page-components/SideBar'), { ssr: false });

function Locations() {
	const [sideBar, setSideBar] = useState('');
	const [selectedLocation, setSelectedLocation] = useState({});

	const onClickCard = (values) => {
		setSideBar('details');
		setSelectedLocation(values);
	};

	const {
		data = {},
		filters = {},
		loading = false,
		setFilters = () => {},
		refetch = () => {},
	} = useGetLocationsList();
	return (
		<div>
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
			{sideBar ? (
				<SideBarComponent
					refetch={refetch}
					setSideBar={setSideBar}
					sideBar={sideBar}
					selectedLocation={selectedLocation}
					setSelectedLocation={setSelectedLocation}
				/>
			) : null}
		</div>
	);
}

export default Locations;
