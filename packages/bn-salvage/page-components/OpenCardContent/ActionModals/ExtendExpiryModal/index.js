import { useContext } from 'react';

import BookingNoteForm from '../../../../commons/BookingNoteForm';
import EXTENDEXPIRYCONTROLS from '../../../../config/extendExpiryControls.json';
import STEP2CONTROLS from '../../../../config/uploadBNStep2Controls.json';
import { BNSalvageContext } from '../../../../context/BNSalvageContext';
import getDefaultValues from '../../../../helpers/getDefaultValuesForExtendBN';
import useUpdateBookingNote from '../../../../hooks/useUpdateBookingNote';

const controlsMapping = {
	step1 : EXTENDEXPIRYCONTROLS,
	step2 : STEP2CONTROLS,
};

export default function ExtendExpiryModal({ item, successRefetch }) {
	const { closeModal } = useContext(BNSalvageContext);
	const defaultValues = getDefaultValues({ controlsMapping, item });

	const { loading, updateBookingNote } = useUpdateBookingNote({ refetch: successRefetch });

	const onFormSubmit = (formData) => {
		const url = typeof formData?.url === 'object' ? formData.url.finalUrl : formData?.url;

		updateBookingNote({ ...formData, url, id: item?.id });
	};

	return (
		<BookingNoteForm
			closeModal={closeModal}
			defaultValues={defaultValues}
			controlsMapping={controlsMapping}
			onFormSubmit={onFormSubmit}
			loading={loading}
			modalHeader="Extend Expiry of Booking Note"
		/>
	);
}
