import { Tags } from '@cogoport/components';
import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getIncoTermMapping from '../../../utils/getIncoTermMapping';

function Service({
	selectedCard, service, activeService, setActiveService,
}) {
	const [serviceAdded, setServiceAdded] = useState([]);
	const tradetype = getIncoTermMapping[selectedCard?.detail?.inco_term] === 'export' ? 'Origin' : 'Destination';
	return (
		<div>
			<div>
				{activeService === service ? (
					<IcMArrowRotateDown
						onClick={() => {
							setActiveService(null);
						}}
					/>
				) : (
					<IcMArrowRotateRight
						onClick={() => {
							setActiveService(service);
						}}
					/>
				)}
				{selectedCard?.detail?.service_type !== service && tradetype}
				{' '}
				{startCase(service)}
				{serviceAdded.includes(service) ? (
					<Tags themeType="green">Submitted</Tags>
				) : <Tags themeType="pink">Pending</Tags>}
			</div>
		</div>
	);
}
export default Service;
