import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ClickableDiv from '../../../../../ClickableDiv';

import ServiceProvider from './ServiceProvider';
import styles from './styles.module.css';

function UpdateServiceProvider(props) {
	const { services, getRate, serviceProviderData = {} } = props;

	let initialTruckType = '';
	const truckType = {};

	const [currentTab, setCurrentTab] = useState();

	services.forEach((item) => {
		if (item.service_type !== 'subsidiary_service') {
			if (item.truck_type in truckType) {
				truckType[item.truck_type] += 1;
			} else {
				if (!currentTab) {
					initialTruckType = item.truck_type;
				}
				truckType[item.truck_type] = 1;
			}
		}
	});

	useEffect(() => {
		setCurrentTab(initialTruckType);
		getRate(initialTruckType);
	}, [setCurrentTab, getRate, initialTruckType]);

	useEffect(() => {
		if (currentTab) {
			getRate(currentTab);
		}
	}, [currentTab, getRate]);

	const tabs = [];

	Object.keys(truckType).forEach((key) => {
		tabs.push(
			<div
				className={cl`${currentTab === key ? 'active' : ''} ${styles.box}`}
			>
				<ClickableDiv onClick={() => {
					setCurrentTab(key);
					getRate(key);
				}}
				>
					{startCase(key)}
					{' '}
					X
					{' '}
					{truckType[key]}
				</ClickableDiv>
			</div>,
		);
	});

	return (
		<div>
			<div className={styles.truck_type}>{tabs.map((item) => item)}</div>

			{serviceProviderData[currentTab]?.list?.map((item) => (
				<ServiceProvider
					truck_type={currentTab}
					truck_numbers={truckType[currentTab]}
					{...props}
					singleServiceProvider={item}
				/>
			))}
		</div>
	);
}

export default UpdateServiceProvider;
