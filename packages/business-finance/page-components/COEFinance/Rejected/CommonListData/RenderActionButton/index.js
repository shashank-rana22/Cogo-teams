import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import RaiseTicketModal from './RaiseTicketModal';
import RenderContent from './RenderContent';

function RenderActionButton() {
	const [showPopover, setShowPopover] = useState(false);
	const [showTicketModal, setShowTicketModal] = useState(false);
	return (
		<>
			<Popover
				placement="left"
				caret={false}
				interactive
				render={
					<RenderContent setShowTicketModal={setShowTicketModal} setShowPopover={setShowPopover} />
            }
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
			>
				<IcMOverflowDot
					onClick={() => setShowPopover((pre) => !pre)}
					style={{ cursor: 'pointer', width: 16, height: 16 }}
				/>
			</Popover>
			{showTicketModal ? (
				<RaiseTicketModal showTicketModal={showTicketModal} setShowTicketModal={setShowTicketModal} />
			) : null}

		</>

	);
}

export default RenderActionButton;
