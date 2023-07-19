import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

// eslint-disable-next-line max-len
import getGeneralConfiguratioFormControls from '../../../../../../configurations/get-general-configuration-form-controls';
import getSeparatedIdData from '../../../../../../helpers/get-separated-id-data';

const useSetGeneralConfiguration = (props) => {
	const { formValues, setFormValues, onSaveCallback, onResetCallback, disabled } = props;

	const {
		generalConfiguration:
		{
			type,
			name,
			partner:{ id: partner_id, business_name: partner_name } = {},
			channel,
			roles: agentRoles,
			lifecycle_stage,
		},
	} = formValues;

	const [showEditAgentsModal, setShowEditAgentsModal] = useState(false);

	const { control, watch, handleSubmit, setValue, formState: { errors } } = useForm({
		defaultValues: {
			type,
			name,
			partner : (partner_id && partner_name) ? `${partner_id}_${partner_name}` : '',
			channel,
			roles   : !isEmpty(agentRoles) ? agentRoles.map((role) => `${role.id}_${role.name}`) : [],
			lifecycle_stage,
		},
	});

	const watchPartner = watch('partner');
	const watchChannel = watch('channel');
	const watchRoles = watch('roles');

	const controls = getGeneralConfiguratioFormControls({ watchPartner, watchChannel, disabled });

	const onSave = (values) => {
		const { partner } = values;
		const [id, business_name] = partner.split('_');

		setFormValues((previousValues) => ({
			...previousValues,
			generalConfiguration: {
				...(previousValues.generalConfiguration || {}),
				...values,
				partner: {
					id, business_name,
				},
				roles: getSeparatedIdData({ values: watchRoles }),
			},
			objectiveRequirements: {},
		}));

		if (typeof onSaveCallback === 'function') onSaveCallback();
	};

	const onReset = (event) => {
		event.preventDefault();

		if (typeof onResetCallback === 'function') onResetCallback();
	};

	useEffect(() => {
		const subscription = watch((_, { name: controlName }) => {
			if (controlName === 'partner' || controlName === 'channel') {
				setValue('roles', []);
			}

			if (controlName === 'roles') {
				setFormValues((previousValues) => ({
					...previousValues,
					generalConfiguration: {
						...(previousValues.generalConfiguration || {}),
						selectMode : 'select_all',
						user_ids   : [],
					},
				}));
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue, setFormValues]);

	return {
		watchRoles,
		showEditAgentsModal,
		setShowEditAgentsModal,
		control,
		errors,
		handleSubmit,
		controls,
		onSave,
		onReset,
	};
};

export default useSetGeneralConfiguration;
