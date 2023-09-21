import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import SideBarComponent from '../../common/SideBar';

import PageView from './PageView';
import styles from './styles.module.css';

function StandardMilestones() {
	const { t } = useTranslation(['milestone']);
	const [sideBar, setSideBar] = useState('');
	const [selected, setSelected] = useState({});

	const onClickCard = (values) => {
		setSideBar('update');
		setSelected(values);
	};
	const onCreateClick = () => {
		setSideBar('create');
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{t('milestone:main_title')}</h1>
				<Button onClick={onCreateClick}>{t('milestone:create')}</Button>
			</div>
			<PageView
				onClickCard={onClickCard}
				setSideBar={setSideBar}
				setSelectedLocation={setSelected}
				sideBar={sideBar}
			/>
			<SideBarComponent
				setSideBar={setSideBar}
				sideBar={sideBar}
				selected={selected}
				setSelected={setSelected}
			/>

		</div>
	);
}

export default StandardMilestones;
