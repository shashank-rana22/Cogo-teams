import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import getGeneralConfiguratioFormControls from '../../../../../../configurations/general-configuration-form-controls';

const useSetGeneralConfiguration = (props) => {
	const { formRef, setFormValues } = props;

	const [selectedRoles, setSelectedRoles] = useState([]);
	const [showEditAgentsModal, setShowEditAgentsModal] = useState(false);

	const { control, watch, handleSubmit, setValue, formState: { errors } } = useForm({
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

		formRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		setValue('roles', []);

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
	}, [watchPartner, watchChannel, setValue, setFormValues]);

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
