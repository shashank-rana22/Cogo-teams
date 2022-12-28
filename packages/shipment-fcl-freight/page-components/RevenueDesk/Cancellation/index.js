import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React from 'react';

import CancelShipment from './CancelShipment';

function Cancellation({
	data = {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	const { id } = data;

	const renderBody = () => (
		<CancelShipment
			id={id}
			refetch={refetch}
			setShowBookingOption={setShowBookingOption}
		/>

	);
	return (
		<div>
			<Popover
				placement="bottom"
				render={renderBody}
			>
				<div>
					<IcMOverflowDot />
				</div>
			</Popover>
		</div>
	);
}

export default Cancellation;
