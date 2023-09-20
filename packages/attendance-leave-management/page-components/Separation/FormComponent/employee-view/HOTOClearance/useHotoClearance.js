import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

const tncText = (applicant_details) => [
	`I wish to formally confirm the successful completion of the task 
	takeover from ${applicant_details?.employee_name} 
	(Employee Code: ${applicant_details?.cogo_id}, 
	Email: ${applicant_details?.cogoport_email || applicant_details?.personal_email}). 
	I hereby assume full responsibility for the tasks previously managed by them.`,

	`I have thoroughly reviewed and undertaken all necessary measures 
	to seamlessly transition these responsibilities. 
	I am committed to executing them meticulously, 
	and any challenges that may arise will be addressed with utmost diligence. 
	This correspondence is an official declaration of my assumption 
	of ${applicant_details?.employee_name}'s responsibilities.
	`,

	'By mentioning my Name in the column, I confirm my understanding of the above terms and conditions.',
];

const useHotoClearance = ({ refetch, data = {} }) => {
	const [showModal, setShowModal] = useState(false);

	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { loading, updateApplication } = useUpdateAppliationProcessDetails({ refetch, setShowModal });

	const { applicant_details, hoto_clearance: { hoto_clearance = {} } = {} } = data || {};

	const { sub_process_detail_id, is_complete, sub_process_data } = hoto_clearance || {};

	const onSubmit = async (values = {}) => {
		const payload = {
			sub_process_detail_id,
			process_name     : 'hoto_clearance',
			sub_process_data : {
				name                 : values?.name,
				terms_and_conditions : {
					is_accepted : values?.checkbox_agreement,
					name        : values?.name,
					text        : tncText(applicant_details),
				},
			},
		};

		updateApplication({ payload });
	};

	useEffect(() => {
		if (is_complete) setValue('name', sub_process_data?.name);
	}, [is_complete, setValue, sub_process_data]);

	return {
		is_complete,
		loading,
		handleSubmit,
		errors,
		control,
		onSubmit,
		applicant_details,
		showModal,
		setShowModal,
	};
};

export default useHotoClearance;
