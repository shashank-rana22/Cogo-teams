// import dynamic from 'next';
// import { Tabs } from '@cogoport/components';
// import Head from 'next';
import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import useGetList from '../../hooks/useGetList';
import List from '../List';

import styles from './styles.module.css';

// import styles from './styles.module.css';

function PageNew({
	config,
	activeCard,
	setViewToShow,
	setActiveCard,
	formatParams,
	formatData,
	onCardClick,
	showScopeSelect = true,
	id_prefix = 'page',
}) {
	const {
		tabs,
		globalActions,
	} = config;
	const { currentTab, ...rest } = useGetList({ config, formatParams });

	const list = (

		<List
			setViewToShow={setViewToShow}
			setActiveCard={setActiveCard}
			onCardClick={onCardClick}
			activeCard={activeCard}
			listProps={{ currentTab, ...rest }}
			tabs={{ ...tabs, active: currentTab }}
			globalActions={
				globalActions
					? () => globalActions(setViewToShow, { currentTab, ...rest })
					: null
			}
			formatData={formatData}
			showScopeSelect={showScopeSelect}
			id_prefix={id_prefix}
		/>

	);

	return (
		<>
			<div className={styles.flex}>
				<h1>Locations View</h1>
				<Button onClick={() => setViewToShow('create')}>Create</Button>
				{/* <Button onClick={setCreateLocation}>Update</Button> */}
			</div>
			<div>{list}</div>
		</>
	);
}

export default PageNew;
