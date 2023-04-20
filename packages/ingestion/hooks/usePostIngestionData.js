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
	const onClose = () => {
		setShow((pv) => ({
			...pv,
			open: false,
		}));
	};

	const { profile: { partner, user } } = useSelector((state) => state);
	const { partner_user_id = '' } = partner || {};
	const { id: user_id = '' } = user || {};

	const formProps = useForm();

	const { watch } = formProps;

	const [uploadData, setUploadData] = useState({
		performed_by_type  : 'agent',
		finalModalHeading  : '',
		partner_user_id,
		ingestion_type     : '',
		is_channel_partner : false,
		user_id,
	});

	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion_request',
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
			onClose();

			Toast.info('Data Ingested! Please check after some time');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.file);
		}
	};
	const { ingestion_country_id = '', ingestion_partner_id = '' } = watch();

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'agent') {
			if (ingestion_country_id || ingestion_partner_id) {
				newControl = {
					...newControl,
					params: {
						filters: {
							...newControl?.params?.filters,
							ingestion_country_id : ingestion_country_id || undefined,
							ingestion_partner_id : ingestion_partner_id || undefined,
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
