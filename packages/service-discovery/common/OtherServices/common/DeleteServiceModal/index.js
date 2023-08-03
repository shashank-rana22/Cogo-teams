import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

function DeleteServiceModal({
	show = false,
	setShow = () => {},
	service = {},
	loading = false,
	onClick = () => {},
	...rest
}) {
	return (
		<Modal
			size={rest.size || 'sm'}
			show={show}
			showCloseIcon={false}
			onClose={() => setShow(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title={rest.title ? rest.title : `Are you sure you want to delete 
			${startCase(rest.service_name || service.label || service.name)} ?`}
			/>

			<Modal.Footer>
				<Button
					type="button"
					themeType="primary"
					onClick={(event) => { event.stopPropagation(); setShow(false); }}
					disabled={loading}
				>
					{rest.cancelText || 'Cancel'}
				</Button>

				<Button
					type="button"
					style={{ marginLeft: 12 }}
					themeType="secondary"
					disabled={loading}
					loading={loading}
					onClick={async (event) => {
						event.stopPropagation();
						event.preventDefault();
						const done = await onClick();
						if (done) { setShow(false); }
					}}
				>
					{rest.deleteText || 'Delete'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteServiceModal;
