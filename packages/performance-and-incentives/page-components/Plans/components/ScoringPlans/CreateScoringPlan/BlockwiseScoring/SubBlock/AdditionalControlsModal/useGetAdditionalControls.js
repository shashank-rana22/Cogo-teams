import { useForm, useFieldArray } from '@cogoport/forms';
import { useMemo, useEffect } from 'react';

import getAdditionalControls from '../../../../../../configurations/get-additional-controls';

const useGetAdditionalControls = (props) => {
	const {
		list,
		param,
		setParam,
		additionalControls,
		setParamScoringType,
		setAdditionalControls,
	} = props;

	const afterParameterOptions = useMemo(() => list.map((item) => ({
		label : item.display_name,
		value : item.id,
	})), [list]);

	const controls = getAdditionalControls({ afterParameterOptions });

	const { control, getValues, formState: { errors }, handleSubmit, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'additional_controls',
	});

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = '';
	});

	const handleClose = () => {
		setParamScoringType('');
		setParam(null);
	};

	const handleSave = () => {
		setAdditionalControls((prev) => {
			const currValues = { ...prev };
			currValues[param] = getValues().additional_controls;

			return currValues;
		});

		setParam(null);
	};

	useEffect(() => {
		setValue('additional_controls', additionalControls[param]);
	}, [additionalControls, param, setValue]);

	return {
		fields,
		append,
		remove,
		errors,
		control,
		controls,
		handleSave,
		handleClose,
		handleSubmit,
		CHILD_EMPTY_VALUES,
	};
};

export default useGetAdditionalControls;
