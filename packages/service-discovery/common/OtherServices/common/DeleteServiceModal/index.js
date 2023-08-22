import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

function DeleteServiceModal({
	show = false,
	setShow = () => {},
	service = {},
	loading = false,
	onClick = () => {},
	cancelText = 'Cancel',
	deleteText = 'Delete',
	title = '',
	service_name = '',
	modalSize = 'sm',
}) {
	const handleCancel = (event) => {
		event.stopPropagation();
		setShow(false);
	};

	const handleDelete = async (event) => {
		event.stopPropagation();
		event.preventDefault();

		const deleted = await onClick();

		if (deleted) {
			setShow(false);
		}
	};

	const BUTTONS_MAPPING = {
		cancel: {
			themeType : 'secondary',
			onClick   : handleCancel,
			style     : {},
			disabled  : loading,
			label     : cancelText,
		},
		delete: {
			themeType : 'primary',
			style     : { marginLeft: 12 },
			onClick   : handleDelete,
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
		>
			<Modal.Header title={title || `Are you sure you want to delete 
			${startCase(service_name || service.label || service.name)} ?`}
			/>

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

export default DeleteServiceModal;
