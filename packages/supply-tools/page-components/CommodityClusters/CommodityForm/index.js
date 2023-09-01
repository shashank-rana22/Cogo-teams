import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useImperativeHandle } from 'react';

import Layout from '../../../common/Layout';

import getControls from './getControls';

const COMMODITY_INDEX = 1;
const OFFSET_LAST_INDEX = 1;

const handleContainerTypeChange = ({ setValue = () => {}, name }) => {
	const splitArr = name.split('.');

	splitArr[splitArr.length - OFFSET_LAST_INDEX] = 'commodity';

	setValue(splitArr.join('.'), []);
};

function CommodityForm({ item = {}, handleSubmitForm = () => {} }, ref) {
	const controls = getControls({ item });

	const { control, formState:{ errors = {} } = {}, watch, setValue, handleSubmit } = useForm();

	controls[COMMODITY_INDEX].controls[GLOBAL_CONSTANTS.zeroth_index].onChange = (
		_o,
		_v,
		name,
	) => handleContainerTypeChange({ name, setValue });

	const onSubmit = (values) => handleSubmitForm({ data: values, item });

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	return (
		<Layout
			controls={controls}
			errors={errors}
			control={control}
			formValues={watch()}
		/>
	);
}

export default CommodityForm;
