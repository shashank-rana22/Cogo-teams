import { Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateSegment from '../../../../../hooks/useUpdateSegment';
import AddEditRule from '../../AddEditRule';

function OptionPopoverContent(
	{
		item = {}, setShowDeleteModal = () => {}, setVisible = () => {},
		setItemData = () => {}, getSegmentData = () => {},
	},
) {
	const [showModal, setShowModal] = useState(false);
	const { updateSegment = () => {}, updateLoading = '' } = useUpdateSegment({ getSegmentData });

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
