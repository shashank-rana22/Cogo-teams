import React, { useState, useEffect } from 'react';
import startCase from '@cogo/utils/startCase';
import { TruckType, Box } from './styles';
import ServiceProvider from './ServiceProvider';

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
	}, []);

	useEffect(() => {
		if (currentTab) {
			getRate(currentTab);
		}
	}, [currentTab]);

	const tabs = [];

	Object.keys(truckType).forEach((key) => {
		tabs.push(
			<Box
				className={currentTab === key ? 'active' : ''}
				onClick={() => {
					setCurrentTab(key);
					getRate(key);
				}}
			>
				{startCase(key)} X {truckType[key]}
			</Box>,
		);
	});

	return (
		<div>
			<TruckType>{tabs.map((item) => item)}</TruckType>

			{serviceProviderData?.list?.map((item) => {
				return (
					<ServiceProvider
						truck_type={currentTab}
						truck_numbers={truckType[currentTab]}
						{...props}
						singleServiceProvider={item}
					/>
				);
			})}
		</div>
	);
}

export default UpdateServiceProvider;
