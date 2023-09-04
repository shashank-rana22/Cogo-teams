import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ONE_OPTION = 1;

const getRefundAdvanceDocumentData = ({ viewRefundModal = {} }) => {
	const { details = {}, currency = 'INR', paymentMode = '' } = viewRefundModal || {};
	const { numberOfContainers = '', amountPerContainer = '' } = details || {};
	return (
		[
			{ title: 'Amount', value: `${currency} ${amountPerContainer}` },
			{
				title : 'Date',
				value : `${numberOfContainers} Container${numberOfContainers > ONE_OPTION ? 's' : ''}`,
			},
			{
				title : 'UTR Number',
				value : `${currency} ${(amountPerContainer && numberOfContainers)
					? amountPerContainer * numberOfContainers : ''}`,
			},
			{ title: 'Proof', value: paymentMode },
		]
	);
};

function ViewRefundModal({
	viewRefundModal = {},
	setViewRefundModal = () => {},
}) {
	const refundAdvanceDocumentData = getRefundAdvanceDocumentData(viewRefundModal);
	return (
		<Modal
			show={!isEmpty(viewRefundModal)}
			onClose={() => setViewRefundModal({})}
		>
			<Modal.Header title="Refund Details" />
			<Modal.Body>
				{refundAdvanceDocumentData.map((itm) => {
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
		</Modal>
	);
}
export default ViewRefundModal;
