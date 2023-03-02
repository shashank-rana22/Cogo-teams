import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getUserControls from '../../../configurations/get-controls';
import { CARD_LABELS_MAPPING } from '../../../constants/get-card-details';

function useCreateResponse(props) {
	const {
		user = {},
		type,
		index,
		setShowAddPoc,
		responses,
		setResponses,
		activeTab,
		setShowDetailsForm,
	} = props;

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

		const data = [...responses];

		if (type === 'edit') {
			const existingData = data[index];

			data[index] = { ...existingData, ...newFormValues };

			setResponses(data);

			setShowDetailsForm(false);
		} else if (type === 'addPoc') {
			const newData = [...data, newFormValues];

			setResponses(newData);

			setShowAddPoc(false);
		} else {
			setResponses([{ ...newFormValues }]);
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

	};
}

export default useCreateResponse;
