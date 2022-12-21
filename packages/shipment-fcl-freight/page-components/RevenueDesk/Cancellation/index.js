import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CancelShipment from './CancelShipment';

function Cancellation({
	data = {},
	refetch = () => {},
	setShowBookingOption = () => {},
}) {
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);

	const { id } = data;

	const content = (
		<CancelShipment
			showCancel={showCancel}
			setShowCancel={setShowCancel}
			setShow={setShow}
			id={id}
			refetch={refetch}
			setShowBookingOption={setShowBookingOption}
		/>
	);

	return (
		<div>
			<Popover
				visible={show && !showCancel}
				caret={show}
				theme="supernova"
				render={
					() => setShow(false)
				}
			>
				<div id="bm_show_options_btn" onClick={() => setShow(!show)}>
					<IcMOverflowDot />
				</div>
			</Popover>
		</div>
	);
}

export default Cancellation;