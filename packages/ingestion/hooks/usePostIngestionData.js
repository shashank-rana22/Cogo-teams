import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../utils/controls';

function usePostIngestionData({ refetch = () => {} }) {
	const [showModal, setShowModal] = useState(false);
	const [show, setShow] = useState('');

	const { profile: { partner = '' } } = useSelector((state) => state);
	const { partner_user_id = '' } = partner || {};

	// console.log('partner_user_id', partner_user_id);

	const [uploadData, setUploadData] = useState({
		performed_by_type  : 'agent',
		finalModalHeading  : '',
		partner_user_id,
		ingestion_type     : '',
		is_channel_partner : false,
	});

	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion',
		method : 'POST',
	}, { manual: true });

	const formProps = useForm();

	const { watch } = formProps;

	const onSubmit = async (e) => {
		const payload = Object.entries({ ...e, ...uploadData })
			.filter(([key, value]) => key !== 'finalModalHeading')
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

		try {
			await trigger({
				data: payload,
			});

			setShow('');

			Toast.success('Data Uploaded');
			refetch();
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	const watchCountry = watch('country_id');
	const watchPartner = watch('partner_id');

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'agent') {
			if (!isEmpty(watchCountry)) {
				newControl = {
					...newControl,
					params: {
						filters: {
							...newControl?.params?.filters,
							country_id : watchCountry || undefined,
							partner_id : watchPartner || undefined,
						},
					},
				};
			}
		}

		return newControl;
	});

	return {
		uploadData,
		setUploadData,
		formProps,
		modalControls: mutatedControls,
		loading,
		onSubmit,
		show,
		setShow,
		showModal,
		setShowModal,
	};
}

export default usePostIngestionData;
