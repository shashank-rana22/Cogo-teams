import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

const TNC_TEXT = [`The details you provide guide critical decisions, making accuracy paramount.
By submitting this form, you affirm the accuracy of all information.
Any discrepancies could lead to losses for which you&#39;ll bear full responsibility.
This self-attestation is legally binding.`,
'Enter your Full Name, confirm your understanding and commitment to these terms.'];

const useHandoverTakeover = ({ data, refetch }) => {
	const [showModal, setShowModal] = useState(false);

	const { control, handleSubmit, formState: { errors }, setValue } = useForm();

	const { manager_clearance } = data || {};
	const { assign_hoto } = manager_clearance || {};
	const {
		sub_process_detail_id,
		sub_process_data,
		is_complete = false,
	} = assign_hoto || {};

	const { updateApplication, loading } = useUpdateAppliationProcessDetails({ refetch, setShowModal });

	const onSubmit = (values) => {
		const payload = {
			process_name     : 'manager_clearance',
			sub_process_detail_id,
			sub_process_data : {
				takeover_by          : values?.takeover_by,
				handover_by          : values?.handover_by,
				additional_remark    : values?.additional_remark,
				last_working_day     : values?.last_working_day,
				terms_and_conditions : {
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

	useEffect(() => {
		if (is_complete) {
			setValue('handover_by', sub_process_data?.handover_by);
			setValue('takeover_by', sub_process_data?.takeover_by);
			setValue('additional_remark', sub_process_data?.additional_remark);
			setValue('last_working_day', new Date(sub_process_data?.last_working_day));
			setValue('notes_for_hrbp', sub_process_data?.notes[GLOBAL_CONSTANTS.zeroth_index]?.value);
			setValue('accept_tnc', sub_process_data?.terms_and_conditions?.is_accepted);
			setValue('full_name', sub_process_data?.terms_and_conditions?.name);
		}
	}, [is_complete, setValue, sub_process_data]);

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
