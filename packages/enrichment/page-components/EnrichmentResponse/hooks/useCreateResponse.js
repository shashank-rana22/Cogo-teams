import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import getUserControls from '../../../configurations/get-controls';
import { CARD_LABELS_MAPPING } from '../../../constants/get-card-details';

const possibleResponseKeys = {
	user: ['name', 'email', 'mobile_number', 'mobile_country_code', 'whatsapp_number',
		'whatsapp_country_code', 'alternate_mobile_number', 'alternate_mobile_country_code', 'work_scopes'],

	address: ['tax_number', 'address', 'pincode', 'city', 'state', 'country'],
};

function useCreateResponse(props) {
	const {
		user = {},
		type,
		// index,
		setShowAddPoc,
		// responses,
		// setResponses,
		activeTab,
		setShowDetailsForm,
		refetch,
	} = props;

	const {
		profile = {},
	} = useSelector((state) => state);

	const router = useRouter();
	const { query = {} } = router;

	const controls = getUserControls({ activeTab });

	const formProps = useForm();

	const { control, handleSubmit, setValue, formState: { errors } } = formProps;

	useEffect(() => {
		const items = CARD_LABELS_MAPPING[activeTab];

		Object.keys(items).map((item) => (

			setValue(item, user[item])

		));

		setValue('work_scopes', user.work_scopes);

		setValue('mobile_number', {
			country_code : user.mobile_country_code,
			number       : user.mobile_number,
		});

		setValue('whatsapp_number', {
			country_code : user.whatsapp_country_code,
			number       : user.whatsapp_number,
		});

		setValue('alternate_mobile_number', {
			country_code : user.alternate_mobile_country_code,
			number       : user.alternate_mobile_number,
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const onSave = (formValues, e) => {
	// 	e.preventDefault();

	// 	const newFormValues = {
	// 		...formValues,
	// 		mobile_country_code           : formValues?.mobile_number?.country_code,
	// 		mobile_number                 : formValues?.mobile_number?.number,
	// 		alternate_mobile_country_code : formValues?.alternate_mobile_number?.country_code,
	// 		alternate_mobile_number       : formValues?.alternate_mobile_number?.number,
	// 		whatsapp_country_code         : formValues?.whatsapp_number?.country_code,
	// 		whatsapp_number               : formValues?.whatsapp_number?.number,

	// 	};

	// 	const data = [...responses];

	// 	if (type === 'edit') {
	// 		const existingData = data[index];

	// 		data[index] = { ...existingData, ...newFormValues };

	// 		setResponses(data);

	// 		setShowDetailsForm(false);
	// 	} else if (type === 'addPoc') {
	// 		const newData = [...data, newFormValues];

	// 		setResponses(newData);

	// 		setShowAddPoc(false);
	// 	} else {
	// 		setResponses([{ ...newFormValues }]);
	// 	}
	// };

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',
	}, { manual: true });

	const onSave = async (values = {}) => {
		try {
			const newFormValues = {
				...values,
				mobile_country_code           : values?.mobile_number?.country_code,
				mobile_number                 : values?.mobile_number?.number,
				alternate_mobile_country_code : values?.alternate_mobile_number?.country_code,
				alternate_mobile_number       : values?.alternate_mobile_number?.number,
				whatsapp_country_code         : values?.whatsapp_number?.country_code,
				whatsapp_number               : values?.whatsapp_number?.number,
			};

			// console.log('newFormValues :: ', newFormValues);

			const responses = [newFormValues];

			// console.log('responses :: ', responses);

			const newResponses = responses.map((response) => {
				const filteredResponse = {};

				possibleResponseKeys[activeTab].forEach((key) => {
					if (Object.keys(response).includes(key)) {
						filteredResponse[key] = response[key];
					}
				});
				return filteredResponse;
			});

			const payload = {
				...newResponses[0],
				response_type       : activeTab,
				source              : 'manual',
				feedback_request_id : query?.id,

				// ! Romove this before merge
				performed_by_type : 'agent',
				performed_by_id   : profile.user?.id,
			};

			// console.log('payload :: ', payload);

			await trigger({
				data: payload,
			});

			Toast.success('Response Submitted Successfully');

			setShowAddPoc(false);

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();

		if (type === 'edit') {
			setShowDetailsForm(false);
		} else if (type === 'addPoc') {
			setShowAddPoc(false);
		}
	};

	return {
		controls,
		control,
		errors,
		onSave,
		handleSubmit,
		handleCancel,
		loading,
	};
}

export default useCreateResponse;
