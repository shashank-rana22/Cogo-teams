import { Button } from '@cogoport/components';
import { useState } from 'react';

import SideBarComponent from '../common/SideBar';

import PageView from './PageView';
import styles from './styles.module.css';

function Locations() {
	const [sideBar, setSideBar] = useState('');
	const [selectedLocation, setSelectedLocation] = useState({});

	const onClickCard = (values) => {
		setSideBar('details');
		setSelectedLocation(values);
	};

	const onCreateClick = () => {
		setSideBar('create');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Locations</h1>
				<Button onClick={onCreateClick}>Create Location</Button>
			</div>
			<PageView
				onClickCard={onClickCard}
				setSideBar={setSideBar}
				selectedLocation={selectedLocation}
			/>
			<SideBarComponent
				setSideBar={setSideBar}
				sideBar={sideBar}
				selectedLocation={selectedLocation}
				setSelectedLocation={setSelectedLocation}
			/>
		</div>
	);
}

export default Locations;
