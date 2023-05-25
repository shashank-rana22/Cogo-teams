import { useContext } from 'react';

import BookingNoteForm from '../../commons/BookingNoteForm';
import STEP1CONTROLS from '../../config/uploadBNStep1Controls.json';
import STEP2CONTROLS from '../../config/uploadBNStep2Controls.json';
import { BNSalvageContext } from '../../context/BNSalvageContext';
import useCreateBookingNote from '../../hooks/useCreateBookingNote';

const controlsMapping = {
	step1 : STEP1CONTROLS,
	step2 : STEP2CONTROLS,
};

export default function UploadBN() {
	const { closeModal, refetchList } = useContext(BNSalvageContext);

	const { loading, createBookingNote } = useCreateBookingNote({
		closeModal,
		refetchList,
	});

	return (
		<BookingNoteForm
			closeModal={closeModal}
			controlsMapping={controlsMapping}
			onFormSubmit={createBookingNote}
			loading={loading}
			modalHeader="Upload Booking Note"
		/>
	);
}
