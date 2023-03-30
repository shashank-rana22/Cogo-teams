import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../utils/controls';

function usePostIngestionData() {
	const [show, setShow] = useState('');
	const profileData = useSelector(({ profile }) => profile);

	console.log('profileData::', profileData);

	const [uploadData, setUploadData] = useState({
		performed_by_type : 'agent',
		// partner_id        : '',
		// orgDetails : {
		// 	isCp    : null,
		// 	country : '',
		// 	partner : '',
		// },
		// isCp              : null,
		finalModalHeading : '', // Todo change logic for this

		// country_id         : '',
		user_id            : profileData?.user?.id,
		// file_url           : '',
		// file_name          : '',
		ingestion_type     : '',
		// description        : '',
		is_channel_partner : false,
		// agent_id           : '',
	});

	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion',
		method : 'POST',
	}, { manual: true });

	const payload = {

	};

	const formProps = useForm();

	const { watch } = formProps;

	const onSubmit = async (e, data) => {
		// console.log('finalone', { ...e, ...data });
		// console.log('ok', e);
		// console.log('kkk::', data);

		const pay = Object.entries({ ...e, ...data }).filter(([key, value]) => key !== 'finalModalHeading')
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

		// console.log('okkok', pay);
		try {
			await trigger({
				data: pay,
			});

			setShow('');

			Toast.success('Data Uploaded');
		} catch (error) {
			console.log('error', error);
		}
	};

	const watchCountry = watch('country_id');
	const watchPartner = watch('partner_id');

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		// Todo ask on this bug
		if (newControl.name === 'agent') {
			if (!isEmpty(watchCountry)) {
				// console.log('watchCountry', watchCountry);
				newControl = {
					...newControl,
					// disabled : false,
					params: {
						filters: {
							...newControl?.params?.filters,
							country_id : watchCountry || undefined,
							partner    : watchPartner || undefined,
						},
					},
				};
			}
		}

		// console.log('newCont::', newControl);

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
