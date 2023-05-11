import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { addDays } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import STEP1CONTROLS from '../config/uploadBNStep1Controls.json';
import STEP2CONTROLS from '../config/uploadBNStep2Controls.json';
import getCreateBookingDocumentPayload from '../helpers/getCreateBookingDocumentPayload';
import toastApiError from '../utils/toastApiError';

const cut_offs = [
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];

const controlsMapping = {
	step1 : STEP1CONTROLS,
	step2 : STEP2CONTROLS,
};

export default function useCreateBookingNote({
	closeModal,
	currentStep,
	refetchList,
	scheduleDeparture,
}) {
	const controls = controlsMapping[currentStep];

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/create_booking_document',
		method : 'POST',
	}, { manual: true });

	const createBookingNote = useCallback(async (formData) => {
		try {
			await trigger({
				data: getCreateBookingDocumentPayload(formData),
			});

			refetchList();
			closeModal();
			Toast.succes('Booking Confirmation Document Created Successfully');
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, closeModal, refetchList]);

	useEffect(() => {
		controls.forEach((ctrl, index) => {
			if (ctrl.name === 'schedule_arrival') {
				controls[index].minDate = scheduleDeparture ? addDays(scheduleDeparture, 1) : undefined;
				controls[index].disable = !scheduleDeparture;
			}
			if (cut_offs.includes(ctrl.name)) {
				controls[index].maxDate = scheduleDeparture;
				controls[index].disable = !scheduleDeparture;
			}
		});
	}, [controls, scheduleDeparture]);

	return {
		controls,
		loading,
		createBookingNote,
	};
}
