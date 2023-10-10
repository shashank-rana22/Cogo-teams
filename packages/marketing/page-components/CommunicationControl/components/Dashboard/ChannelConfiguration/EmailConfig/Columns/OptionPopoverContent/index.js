import { Button } from '@cogoport/components';
import { useState } from 'react';

import AssignRoleModal from '../../../../../../common/AssignRoleModal';
import useUpdateStatus from '../../../../../../hooks/useUpdateStatus';

function OptionPopoverContent({
	item = {}, getChannelConfig = () => {},
}) {
	const isActive = item?.status === 'active';
	const [show, setShow] = useState(false);
	const [val, setVal] = useState(item?.role_ids);

	const { updateStatus, updateStatusLoading } = useUpdateStatus({
		getChannelConfig,
		channel: 'email',
	});
	return (
		<div>
			{isActive ? (
				<Button
					style={{ marginBottom: '5px', minWidth: '120px' }}
					themeType="secondary"
					onClick={() => {
						setShow(true);
					}}
				>
					ASSIGN ROLES
				</Button>
			) : null}
			<Button
				style={{ minWidth: '120px' }}
				themeType="secondary"
				onClick={() => updateStatus(item)}
				disabled={updateStatusLoading}
			>
				{isActive ? 'DEACTIVATE' : 'ACTIVATE'}
			</Button>
			<AssignRoleModal
				show={show}
				setShow={setShow}
				values={val}
				setVal={setVal}
				getChannelConfig={getChannelConfig}
				channel="email"
				itemId={item?.id}
			/>
		</div>
	);
}
export default OptionPopoverContent;
