import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

function LockMarginModal({
	updateQuotation = () => {},
	lockMarginModalData = '',
	setLockMarginModalData = () => {},
	loading = false,
}) {
	const onClose = () => {
		setLockMarginModalData('');
	};

	const onClickMLockMargin = () => {
		updateQuotation();
	};

	return (
		<Modal
			show={!isEmpty(lockMarginModalData)}
			onClose={onClose}
			placement="top"
			size="lg"
		>
			<Modal.Header title="Are you sure you want to lock margin values?" />
			<Modal.Body>
				{`Once you share quotation, margin will be locked. 
                so please ensure that you are satisfied with your selection before sharing quotation.
				However, if you have made any changes to the margins, we will update them accordingly.
				In the event that you wish to cancel the process, kindly click "No" to proceed`}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" disabled={loading} onClick={onClose}>
					No
				</Button>

				<Button
					themeType="accent"
					onClick={() => onClickMLockMargin()}
					disabled={loading}
					style={{ marginLeft: '12px' }}
				>
					Yes, lock margin
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LockMarginModal;
