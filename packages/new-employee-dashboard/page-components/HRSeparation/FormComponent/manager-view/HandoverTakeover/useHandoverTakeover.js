import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

const TNC_TEXT = [`The details you provide guide critical decisions, making accuracy paramount.
By submitting this form, you affirm the accuracy of all information.
Any discrepancies could lead to losses for which you&#39;ll bear full responsibility.
This self-attestation is legally binding.`,
'Enter your Full Name, confirm your understanding and commitment to these terms.'];

const useHandoverTakeover = ({ data, refetch }) => {
	const [showModal, setShowModal] = useState(false);

	const { control, handleSubmit, formState: { errors } } = useForm();

	const { manager_clearance } = data || {};
	const { assign_hoto } = manager_clearance || {};
	const {
		sub_process_detail_id,
		// sub_process_data,
		is_complete,
	} = assign_hoto || {};

	const { updateApplication, loading } = useUpdateAppliationProcessDetails({ refetch, setShowModal });

	const onSubmit = (values) => {
		const payload = {
			process_name     : 'manager_clearance',
			sub_process_detail_id,
			sub_process_data : {
				takeover_by                : values?.takeover_by,
				handover_by                : values?.handover_by,
				additional_remark          : values?.additional_remark,
				suggested_last_working_day : values?.suggested_last_working_day,
				terms_and_conditions       : {
					is_accepted : values?.accept_tnc,
					name        : values?.full_name,
					text        : TNC_TEXT,
				},
				notes: [
					{
						label               : 'Note for HRBP',
						value               : values?.notes_for_hrbp,
						is_shared_with_hrbp : true,
					},
				],
			},
		};

		updateApplication({ payload });
	};

	return {
		showModal,
		setShowModal,
		control,
		handleSubmit,
		errors,
		onSubmit,
		loading,
		is_complete,
	};
};

export default useHandoverTakeover;
