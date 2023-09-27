import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import SideBarComponent from '../../common/SideBar';

import Filter from './page-components/Filters';
import PageView from './page-components/PageView';
import styles from './styles.module.css';

function Locations() {
	const { t } = useTranslation(['locations']);

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
				<h1>{t('locations:locations_heading')}</h1>
				<Button onClick={onCreateClick}>{t('locations:create_location')}</Button>
			</div>

			<PageView
				onClickCard={onClickCard}
				setSideBar={setSideBar}
				setSelectedLocation={setSelectedLocation}
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
