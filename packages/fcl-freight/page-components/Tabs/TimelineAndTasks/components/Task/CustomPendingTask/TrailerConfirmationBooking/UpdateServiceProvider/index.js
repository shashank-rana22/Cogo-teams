import React, { useState, useEffect } from 'react';
import startCase from '../../../../../../../utils/startCase';
import { TrailerType, Box } from './styles';
import ServiceProvider from './ServiceProvider';

const UpdateServiceProvider = (props) => {
	const { services, getRate, serviceProviderData } = props;

	let initialTrailerType = '';
	const trailerType = {};

	services.forEach((item) => {
		if (item.service_type !== 'subsidiary_service') {
			if (item.service_type === 'haulage_freight_service') {
				if (item.trailer_type in trailerType) {
					trailerType[item.trailer_type] += 1;
				} else {
					if (!currentTab) {
						initialTrailerType = item?.trailer_type;
					}
					trailerType[item.trailer_type] = 1;
				}
			}
		}
	});

	const [currentTab, setCurrentTab] = useState();

	useEffect(() => {
		setCurrentTab(initialTrailerType);
		getRate(initialTrailerType);
	}, []);

	useEffect(() => {
		if (currentTab) {
			getRate(currentTab);
		}
	}, [currentTab]);

	const tabs = [];

	Object.keys(trailerType).forEach((key) => {
		tabs.push(
			<Box
				className={currentTab === key ? 'active' : ''}
				onClick={() => {
					setCurrentTab(key);
					getRate(key);
				}}
			>
				{startCase(key)} X {trailerType[key]}
			</Box>,
		);
	});

	return (
		<div>
			<TrailerType>{tabs.map((item) => item)}</TrailerType>

			{serviceProviderData?.list.map((item) => {
				return (
					<ServiceProvider
						trailer_type={currentTab}
						trailer_numbers={trailerType[currentTab]}
						{...props}
						singleServiceProvider={item}
					/>
				);
			})}
		</div>
	);
};

export default UpdateServiceProvider;
