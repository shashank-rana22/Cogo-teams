import { Button } from '@cogoport/components';

function OptionPopoverContent(
	{
		item = {}, setShowDeleteModal = () => {}, setOperationType = () => {},
		setVisible = () => {}, setItemData = () => {}, setShowAddModal = () => {},
	},
) {
	return (
		<div>
			<Button
				style={{ marginBottom: '2px', minWidth: '105px' }}
				themeType="secondary"
				onClick={() => {
					setShowAddModal(true);
					setOperationType('edit');
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
		</div>
	);
}
export default OptionPopoverContent;
