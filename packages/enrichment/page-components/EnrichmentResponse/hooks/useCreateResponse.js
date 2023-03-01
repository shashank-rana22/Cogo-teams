import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getUserControls from '../../../configurations/get-controls';
import { cardLabelsMapping } from '../../../constants/get-card-details';

function useCreateResponse(props) {
	const {
		user = {},
		type,
		index,
		responseData,
		setShowAddPoc,
		setResponseData,
		activeTab,
		setShowDetailsForm,
	} = props;

	const controls = getUserControls({ activeTab });

	const formProps = useForm();

	const { control, handleSubmit, setValue, formState: { errors } } = formProps;

	useEffect(() => {
		const items = cardLabelsMapping[activeTab];

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
			country_code : user.alternate_country_code,
			number       : user.alternate_mobile_number,
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSave = (formValues, e) => {
		e.preventDefault();

		const newFormValues = {
			...formValues,
			mobile_country_code           : formValues?.mobile_number?.country_code,
			mobile_number                 : formValues?.mobile_number?.number,
			alternate_mobile_country_code : formValues?.alternate_mobile_number?.country_code,
			alternate_mobile_number       : formValues?.alternate_mobile_number?.number,
			whatsapp_country_code         : formValues?.whatsapp_number?.country_code,
			whatsapp_number               : formValues?.whatsapp_number?.number,

		};

		if (type === 'edit') {
			const data = [...responseData];
			data[index] = { ...newFormValues };

			setResponseData(data);

			setShowDetailsForm(false);
		} else {
			setResponseData((prev) => ([

				...prev,
				newFormValues,
			]));

			if (type === 'addPoc') {
				setShowAddPoc(false);
			}
		}
	};

	return {
		controls,
		control,
		errors,
		handleSubmit,
		onSave,

	};
}

export default useCreateResponse;
