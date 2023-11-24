import { Modal, Button, CheckboxGroup, Input } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

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
	closingRemarks = {},
	setClosingRemarks = () => {},
}) {
	const { closing_remarks = [], other_reason = ''	} = closingRemarks;

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
			disabled  : isEmpty(closing_remarks),
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

			<Modal.Body className={styles.container}>
				<CheckboxGroup
					value={closing_remarks || []}
					onChange={(value) => {
						setClosingRemarks((prev) => ({ ...prev, closing_remarks: value }));
					}}
					options={[
						{
							label : 'Request not serviceable',
							value : 'request_not_serviceable',
						},
						{
							label : 'No space with service provider',
							value : 'no_space_with_service_provider',
						},
						{
							label : 'Wrong request',
							value : 'wrong_request',
						},
						{
							label : 'Lowest rate already available on platform',
							value : 'lowest_rate_already_available_on_platform',
						},
						{
							label : 'Other Reason',
							value : 'other_reason',
						},
					]}
				/>

				{closing_remarks.includes('other_reason') ? (
					<Input
						value={other_reason}
						onChange={(value) => {
							setClosingRemarks((prev) => ({ ...prev, other_reason: value }));
						}}
					/>
				) : null}
			</Modal.Body>

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
