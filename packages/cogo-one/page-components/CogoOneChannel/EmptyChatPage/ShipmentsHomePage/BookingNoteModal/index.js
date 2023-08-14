import { Modal, Button, CheckboxGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useSendBookingNoteOnWhatsapp from '../../../../../hooks/useSendBookingNoteOnWhatsapp';

import { getCheckboxOptions } from './getCheckboxOptions';
import styles from './styles.module.css';

function BookingNoteModal({ setShowBookingNote = () => {}, showBookingNote = {} }) {
	const [documentsSelected, setDocumentsSelected] = useState([]);

	const onClose = () => {
		setShowBookingNote({ show: false, data: {} });
	};

	const {
		triggerBookingNote = () => {},
		bnLoading = false,
		alreadySentData = [],
	} = useSendBookingNoteOnWhatsapp({ onClose });

	const { data = {} } = showBookingNote;

	const options = getCheckboxOptions({ documents: data?.documents || [], alreadySentData });

	const isAlreadySentSelected = documentsSelected?.some((selectedDoc) => alreadySentData?.includes(selectedDoc));

	return (
		<Modal
			show
			onClose={onClose}
			placement="center"
			size="sm"
		>
			<Modal.Header title="Send Booking Notes" className={styles.title} />
			<Modal.Body>
				<div>
					<CheckboxGroup
						onChange={setDocumentsSelected}
						value={documentsSelected}
						options={options}
						className={styles.docs_div}
					/>
				</div>
				{!isEmpty(alreadySentData)
				&& <div className={styles.already_sent_text}>*Highlighted documents are already sent</div>}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer_styles}>
					<Button
						size="sm"
						themeType="tertiary"
						disabled={bnLoading}
						onClick={onClose}
					>
						cancel

					</Button>
					<Button
						className={styles.button_styles}
						loading={bnLoading}
						onClick={() => {
							triggerBookingNote({ documentIds: documentsSelected, shipmentId: data?.shipmentId });
						}}
						disabled={isEmpty(documentsSelected)}
					>
						{isAlreadySentSelected ? 'Send Anyway' : 'Send'}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default BookingNoteModal;
