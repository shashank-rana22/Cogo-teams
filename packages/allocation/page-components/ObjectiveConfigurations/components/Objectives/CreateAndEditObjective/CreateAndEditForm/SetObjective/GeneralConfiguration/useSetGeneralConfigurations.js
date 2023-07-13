import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import getGeneralConfiguratioFormControls from '../../../../../../configurations/general-configuration-form-controls';

const useSetGeneralConfiguration = (props) => {
	const { setFormValues, onSaveCallback } = props;

	const [selectedRoles, setSelectedRoles] = useState([]);
	const [showEditAgentsModal, setShowEditAgentsModal] = useState(false);

	const { control, watch, handleSubmit, resetField, formState: { errors } } = useForm({
		defaultValues: {
			roles: [],
		},
	});

	const watchPartner = watch('partner');
	const watchChannel = watch('channel');

	const controls = getGeneralConfiguratioFormControls({ watchPartner, watchChannel, setSelectedRoles });

	const onSave = (values, event) => {
		event.preventDefault();

		setFormValues((previousValues) => ({
			...previousValues,
			generalConfiguration: {
				...(previousValues.generalConfiguration || {}),
				...values,
				roles: selectedRoles,
			},
			objectiveRequirements: {},
		}));

		if (typeof onSaveCallback === 'function') onSaveCallback();
	};

	useEffect(() => {
		resetField('roles');

		setSelectedRoles([]);

		setFormValues((previousValues) => ({
			...previousValues,
			generalConfiguration: {
				...(previousValues.generalConfiguration || {}),
				roles      : [],
				selectMode : 'select_all',
				user_ids   : [],
			},
		}));
	}, [watchPartner, watchChannel, resetField, setFormValues]);

	return {
		selectedRoles,
		showEditAgentsModal,
		setShowEditAgentsModal,
		control,
		errors,
		handleSubmit,
		controls,
		onSave,
	};
};

export default useSetGeneralConfiguration;
