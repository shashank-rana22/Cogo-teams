import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

const useAdminClearanceDetails = ({ data = {}, refetch = () => {} }) => {
	const [show, setShow] = useState(false);
	const admin_clearance = data?.admin_clearance || {};
	const applicant_details = data?.applicant_details || {};
	const { last_working_day } = applicant_details || null;
	const { sub_process_detail_id } = admin_clearance?.admin_clearance || {};
	const { sub_process_data } = admin_clearance?.admin_clearance || {};
	const { is_complete } = admin_clearance?.admin_clearance || false;
	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
		setValue,
		reset,
	} = useForm();

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, setShowModal: setShow });

	const onSubmit = (values) => {
		const notes = [{
			label                  : 'notes for hrbp',
			Value                  : values.notes,
			Is_shared_with_manager : true,

		}];
		const payload = {
			sub_process_data: {
				notes,
				accessCardStatus : values?.accessCardStatus,
				termsAcceptance  : values?.termsAcceptance,
				specify          : values?.specify,
				parkingCharges   : values?.parkingCharges,
				otherCharges     : values?.otherCharges,
				name             : values?.name,
				last_working_day,
				idCardStatus     : values?.idCardStatus,
				companyAssets    : values?.companyAssets,

			},
			sub_process_detail_id,
			process_name: 'admin_clearance',
		};
		updateApplication({
			payload,
		});
		reset();
	};

	useEffect(() => {
		setValue('accessCardStatus', sub_process_data?.accessCardStatus);
		setValue('companyAssets', sub_process_data?.companyAssets);
		setValue('idCardStatus', sub_process_data?.idCardStatus);
		setValue('name', sub_process_data?.name);
		setValue('otherCharges', sub_process_data?.otherCharges);
		setValue('parkingCharges', sub_process_data?.parkingCharges);
		setValue('specify', sub_process_data?.specify);
		setValue('notes', sub_process_data?.notes[GLOBAL_CONSTANTS.zeroth_index].Value);
		setValue('termsAcceptance', sub_process_data?.termsAcceptance);
		setValue('last_working_day', last_working_day && new Date(last_working_day));
	}, [setValue, sub_process_data, is_complete, last_working_day]);

	return {
		show,
		setShow,
		last_working_day,
		admin_clearance,
		sub_process_detail_id,
		sub_process_data,
		is_complete,
		control,
		errors,
		handleSubmit,
		watch,
		setValue,
		reset,
		onSubmit,
	};
};

export default useAdminClearanceDetails;
