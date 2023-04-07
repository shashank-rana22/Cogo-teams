import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import controls from '../utils/controls';

function usePostIngestionData({ refetch = () => {} }) {
	const [show, setShow] = useState({
		open   : false,
		screen : '',
	});

	const { profile: { partner } } = useSelector((state) => state);
	const { partner_user_id = '' } = partner || {};

	const formProps = useForm();

	const { watch } = formProps;

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

	const onSubmit = async (e) => {
		const payload = Object.entries({ ...e, ...uploadData, file_url: e?.file_url?.finalUrl })
			.filter(([key, value]) => key !== 'finalModalHeading' && value !== null && value !== '')
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
	const { country_id = '', partner_id = '' } = watch();

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'agent') {
			if (country_id || partner_id) {
				newControl = {
					...newControl,
					params: {
						filters: {
							...newControl?.params?.filters,
							country_id : country_id || undefined,
							partner_id : partner_id || undefined,
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
	};
}

export default usePostIngestionData;
