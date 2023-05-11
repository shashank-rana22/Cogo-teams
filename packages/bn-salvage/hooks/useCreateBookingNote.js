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
	schedule_departure,
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
				controls[index].minDate = schedule_departure ? addDays(schedule_departure, 1) : undefined;
				controls[index].disable = !schedule_departure;
			}
			if (cut_offs.includes(ctrl.name)) {
				controls[index].maxDate = schedule_departure;
				controls[index].disable = !schedule_departure;
			}
		});
	}, [controls, schedule_departure]);

	return {
		controls,
		loading,
		createBookingNote,
	};
}
