import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTrailorFull } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDistance from '../../hooks/useGetDistance';
import useListOrganizationAssets from '../../hooks/useListOrganizationAssets';

import CardList from './CardList';

const DEFAULT_VALUE = 0;
const INCREAMENT_VALUE = 1;

function UpdateDetails(props) {
	const { services = [], serviceProviderData = {} } = props;
	const initialTruckType = services?.[GLOBAL_CONSTANTS.zeroth_index]?.truck_type;
	const [currentTab, setCurrentTab] = useState(initialTruckType);

	const {
		destination_location_id = '',
		origin_location_id = '',
		asset_ids = [],
	} = services?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { data, loading: assetsLoading } = useListOrganizationAssets({
		id       : serviceProviderData?.[currentTab]?.[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id,
		assetIds : asset_ids,
	});

	const { data: distanceResp, loading: distanceLoading } = useGetDistance({
		destination_location_id,
		origin_location_id,
	});

	const { truckTypes, similarServiceIds } = (services || []).reduce((acc, service) => {
		if (service.service_type !== 'subsidiary_service') {
			acc.truckTypes[service.truck_type] = (acc.truckTypes[service.truck_type] || DEFAULT_VALUE)
             + INCREAMENT_VALUE;
			if (acc.similarServiceIds[service?.truck_type]) {
				acc.similarServiceIds[service?.truck_type].push(service.id);
			} else {
				acc.similarServiceIds[service?.truck_type] = [service?.id];
			}
		}

		return acc;
	}, { truckTypes: {}, similarServiceIds: {} });

	return (
		<div>
			<Tabs
				tabIcon={<IcMTrailorFull height={25} width={25} />}
				activeTab={currentTab}
				themeType="tertiary"
				onChange={setCurrentTab}
			>
				{Object.entries(truckTypes).map(([key, value]) => (
					<TabPanel name={key} title={startCase(key)} badge={value} key={key}>
						<CardList
							currentTab={currentTab}
							{...props}
							truckDetailsList={data?.list || []}
							tripDistance={distanceResp?.distance || INCREAMENT_VALUE}
							similarServiceIds={similarServiceIds}
							otherLoading={assetsLoading || distanceLoading}
						/>
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default UpdateDetails;
