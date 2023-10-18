import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateServetalAgent from '../../../../../hooks/useUpdateServetalAgent';
import UpdateAgentModal from '../../UpdateAgentModal';

function OptionPopoverContent({
	item = {},
	setVisiblePopover = () => {},
	listServetalAgent = () => {},
}) {
	const [title, setTitle] = useState('');
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const {
		updateAgent = () => {},
		updateLoading = '',
	} = useUpdateServetalAgent({ listServetalAgent });

	const PAYLOAD = {
		agent_name      : item?.agent_data?.name,
		agent_number    : item?.mobile_number,
		id              : item?.id,
		provider_number : item?.provider_number,
	};

	const handleSubmit = async () => {
		if (title === 'Delete') {
			await updateAgent({
				payload : PAYLOAD,
				action  : 'delete_agent',
			});
			setTitle(false);
		} else {
			await updateAgent({
				payload : PAYLOAD,
				action  : item?.servetel_status === 'active' ? 'block_agent' : 'unblock_agent',
			});
			setTitle(false);
		}
	};
	return (
		<div>
			<Button
				style={{ marginBottom: '2px', minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setShowUpdateModal(true);
					setVisiblePopover(false);
				}}
			>
				UPDATE
			</Button>
			<UpdateAgentModal
				item={item}
				showUpdateModal={showUpdateModal}
				setShowUpdateModal={setShowUpdateModal}
				updateAgent={updateAgent}
				loading={updateLoading}
				payload={PAYLOAD}
			/>
			<Button
				style={{ marginBottom: '2px', minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setTitle('Deactivate');
					setVisiblePopover(false);
				}}
			>
				DEACTIVATE
			</Button>
			<Button
				style={{ minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setTitle('Delete');
					setVisiblePopover(false);
				}}
			>
				DELETE
			</Button>
			<Modal
				show={title}
				onClose={() => setTitle()}
				placement="top"
			>
				<Modal.Header title={`${title} Agent`} />
				<Modal.Body>
					{`Are you sure you want to ${title} Agent`}
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						style={{ marginRight: 5 }}
						disabled={updateLoading}
						onClick={() => { setTitle(); }}
					>
						NO
					</Button>
					<Button
						disabled={updateLoading}
						onClick={() => handleSubmit()}
					>
						YES
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default OptionPopoverContent;
