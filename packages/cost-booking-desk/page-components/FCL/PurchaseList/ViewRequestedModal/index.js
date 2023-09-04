import { Modal, Button, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ONE_OPTION = 1;
const REMARK_LENGTH_LIMIT = 30;

const getRequestAdvanceDocumentData = ({ viewRequestModal = {} }) => {
	const { details = {}, currency = 'INR', paymentMode = '', remarks = '' } = viewRequestModal || {};
	const { numberOfContainers = '', amountPerContainer = '' } = details || {};
	return (
		[
			{ title: 'Amount per container', value: `${currency} ${amountPerContainer}` },
			{
				title : 'Number of containers',
				value : `${numberOfContainers} Container${numberOfContainers > ONE_OPTION ? 's' : ''}`,
			},
			{
				title : 'Total Amount to be paid',
				value : `${currency} ${(amountPerContainer && numberOfContainers)
					? amountPerContainer * numberOfContainers : ''}`,
			},
			{ title: 'Payment Mode', value: paymentMode },
			{
				title: 'Remark',
				value:
	<div>
		{remarks?.length >= REMARK_LENGTH_LIMIT ? (
			<Tooltip
				placement="top"
				content={<div className={styles.tooltip_text}>{remarks}</div>}
				interactive
			>
				<div className={styles.remark_overflow}>
					{remarks}
					...
				</div>
			</Tooltip>
		) : (
			remarks
		)}
	</div>,
			},
		]
	);
};

function ViewRequestModal({
	viewRequestModal = {},
	setViewRequestModal = () => {},
}) {
	const { status = '' } = viewRequestModal || {};
	const requestAdvanceDocumentData = getRequestAdvanceDocumentData({ viewRequestModal });

	const handleClick = () => {
		setViewRequestModal({});
	};

	return (
		<Modal
			show={!isEmpty(viewRequestModal)}
			onClose={() => setViewRequestModal({})}
		>
			<Modal.Header title="Request Advance Payment" />
			<Modal.Body>
				{status.toLowerCase() === 'approved'
					? <div className={styles.approved_request}>Approved: </div> : null}
				{status.toLowerCase() === 'rejected'
					? <div className={styles.rejected_request}>Reason For Rejection: </div> : null}

				{requestAdvanceDocumentData.map((itm) => {
					const { title, value } = itm || {};
					return (
						<div key={title} className={styles.flex}>
							<div className={styles.title}>{title}</div>
							<div className={styles.divider}>:</div>
							<div className={styles.name}><div>{value || ''}</div></div>
						</div>
					);
				})}
			</Modal.Body>
			{status.toLowerCase() === 'rejected'
				? (
					<Modal.Footer>
						<Button onClick={handleClick}>Send Request Again</Button>
					</Modal.Footer>
				)
				: null}
		</Modal>
	);
}
export default ViewRequestModal;
