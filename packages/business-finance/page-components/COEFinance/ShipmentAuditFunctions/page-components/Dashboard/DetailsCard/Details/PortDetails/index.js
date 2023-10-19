import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getLocations from '../../../../../../../../utils/getLocationConfig';
import GetServiceInfo from '../../../../../../../commons/GetServiceInfo';

import RenderLocation from './RenderLocation';
import styles from './styles.module.css';

function PortDetails({ data = {}, showDate = false }) {
	if (isEmpty(data)) {
		return null;
	}

	const {
		origin_main_port: originMainPort = '',
		destination_main_port: destinationMainPort = '',
	} = data || {};

	const { origin, destination } = getLocations({ ...data, search_type: data?.shipment_type }) || {};

	const serviceIcon = GetServiceInfo(data?.shipment_type);

	const shipmentTypeName = data?.shipment_type
		?.split('_')
		?.join(' ')
		?.toUpperCase();
	return (
		<div className={styles.container}>
			<div className={styles.icon_and_service}>
				<div>
					{' '}
					{serviceIcon}
				</div>
				<div className={styles.service_name}>{shipmentTypeName || ''}</div>
			</div>

			<RenderLocation
				originMainPort={originMainPort}
				destinationMainPort={destinationMainPort}
				origin={origin}
				destination={destination}
				data={data}
				showDate={showDate}
			/>
		</div>
	);
}

export default PortDetails;
