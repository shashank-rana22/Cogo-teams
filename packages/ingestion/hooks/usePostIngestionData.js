import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import controls from '../utils/controls';

function usePostIngestionData({ refetch = () => {} }) {
	const [show, setShow] = useState({
		open       : false,
		activeMode : '',
	});
	const onClose = () => {
		setShow((pv) => ({
			...pv,
			open: false,
		}));
	};

	const { profile: { partner, user } } = useSelector((state) => state);
	const { partner_user_id = '' } = partner;
	const { id: user_id = '' } = user;

	const formProps = useForm();

	const { watch } = formProps;

	const [uploadData, setUploadData] = useState({
		final_modal_header : '',
		partner_user_id,
		ingestion_type     : '',
		is_channel_partner : false,
		user_id,
		account_type       : '',
	});

	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion_request',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (e) => {
		const payload = Object.entries({ ...e, ...uploadData, file_url: e?.file_url?.finalUrl })
			.filter(([key, value]) => (!!value && key !== 'final_modal_header') || value === false)
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
		try {
			await trigger({
				data: payload,
			});
			onClose();

			Toast.info('Data Ingested! Please check after some time');
			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'Something went wrong');
		}
	};
	const { ingestion_partner_id } = watch();

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'agent') {
			if (ingestion_partner_id) {
				newControl = {
					...newControl,
					params: {
						filters: {
							...newControl?.params?.filters,
							ingestion_partner_id: ingestion_partner_id || undefined,
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
		onClose,
	};
}

export default usePostIngestionData;
