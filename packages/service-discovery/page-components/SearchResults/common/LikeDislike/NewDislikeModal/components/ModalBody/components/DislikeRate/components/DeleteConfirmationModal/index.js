import { Modal, Button } from '@cogoport/components';

function DeleteConfirmationModal({
	show = false,
	loading = false,
	onClickDelete = () => {},
	cancelText = 'Cancel',
	deleteText = 'Delete',
	title = '',
	modalSize = 'sm',
	isMobile = false,
	setShow = () => {},
}) {
	const BUTTONS_MAPPING = {
		cancel: {
			themeType : 'secondary',
			onClick   : () => setShow(false),
			style     : {},
			disabled  : loading,
			label     : cancelText,
		},
		delete: {
			themeType : 'primary',
			style     : { marginLeft: 12 },
			onClick   : onClickDelete,
			loading,
			label     : deleteText,
		},
	};

	return (
		<Modal
			size={modalSize}
			show={show}
			showCloseIcon={false}
			onClose={() => setShow(false)}
			closeOnOuterClick={false}
			placement={isMobile ? 'bottom' : 'center'}
		>
			<Modal.Header title={title || 'Are you sure you want to delete'} />

			<Modal.Footer>
				{Object.entries(BUTTONS_MAPPING).map(([key, buttonObj]) => {
					const { label = '', ...rest } = buttonObj;

					return (
						<Button
							key={key}
							type="button"
							id={`$delete_service_modal_${key}_button`}
							{...rest}
						>
							{label}
						</Button>
					);
				})}
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteConfirmationModal;
