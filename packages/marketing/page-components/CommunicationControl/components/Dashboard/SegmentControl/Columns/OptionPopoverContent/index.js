import { Button } from '@cogoport/components';
import { useState } from 'react';

import AddEditRule from '../../AddEditRule';

function OptionPopoverContent(
	{
		item = {}, setShowDeleteModal = () => {}, updateSegment = () => {},
		setVisible = () => {}, setItemData = () => {}, updateLoading = '',
	},
) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<Button
				style={{ marginBottom: '2px', minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setShowModal(true);
					setVisible(false);
				}}
			>
				EDIT
			</Button>
			<Button
				style={{ minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setShowDeleteModal(true);
					setItemData(item);
					setVisible(false);
				}}
			>
				DEACTIVATE
			</Button>
			<AddEditRule
				showAddModal={showModal}
				setShowAddModal={setShowModal}
				submit={updateSegment}
				loading={updateLoading}
				item={item}
				title="Edit"
			/>
		</div>
	);
}
export default OptionPopoverContent;
