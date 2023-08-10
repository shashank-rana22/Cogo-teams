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
	const { services = [] } = props;
	const initialTruckType = services?.[GLOBAL_CONSTANTS.zeroth_index]?.truck_type;

	const [currentTab, setCurrentTab] = useState(initialTruckType);
	const { data } = useListOrganizationAssets({
		id       : services?.[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id,
		assetIds : services?.[GLOBAL_CONSTANTS.zeroth_index]?.asset_ids || [],
	});

	const { destination_location_id, origin_location_id } = services?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { data: distanceResp } = useGetDistance({
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
						/>
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default UpdateDetails;
