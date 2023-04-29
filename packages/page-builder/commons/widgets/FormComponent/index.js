import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import controls from '../../../configurations/controls';
import useGetControlsToShow from '../../../helpers/useGetControlsToShow';
import useGetHandleEditForm from '../../../helpers/useGetHandleEditForm';
import useGetHandleFormSubmit from '../../../helpers/useGetHandleFormSubmit';
import useSubmitFormDetails from '../../../hooks/useSubmitFormDetails';

import GenerateFormModal from './GenerateFormModal';
import RenderDynamicFormComponent from './RenderDynamicFormComponent';

function FormComponent({
	pageConfiguration,
	setPageConfiguration,
	rowData,
	widget,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
	selectedItem,
	columnData,
	nestedColumData,
}) {
	const [show, setShow] = useState(false);

	const { component } = widget || {};

	const { formData } = component || {};

	const formProps = useForm();

	const [showForm, setShowForm] = useState(true);

	const {
		control,
		watch,
		formState:{ errors = {} },
		handleSubmit,
		setValue,
	} = formProps || {};

	const dynamicFormProps = useForm();

	const {
		control: dynamicControl,
		formState:{ errors: dynamicControlErrors },
		handleSubmit: dynamicHandleSubmit,
	} = dynamicFormProps || {};

	const formValues = watch();

	const { onSubmitDetails } = useSubmitFormDetails({ formData });

	const { controls: dynamicControls } = formData || {};

	const showElements = useGetControlsToShow(controls, formValues);

	const onDynamicFormSubmit = (val) => {
		onSubmitDetails(val);
	};

	const { onSubmit } = useGetHandleFormSubmit({
		pageConfiguration,
		setPageConfiguration,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		setShow,
	});

	const { handleEditForm } = useGetHandleEditForm({ setShowForm, setShow, setValue });

	return (
		<div>
			<RenderDynamicFormComponent
				dynamicControls={dynamicControls}
				dynamicControlErrors={dynamicControlErrors}
				formData={formData}
				dynamicControl={dynamicControl}
				dynamicHandleSubmit={dynamicHandleSubmit}
				onDynamicFormSubmit={onDynamicFormSubmit}
				handleEditForm={handleEditForm}
				setShow={setShow}
			/>
			<GenerateFormModal
				setShow={setShow}
				show={show}
				control={control}
				controls={controls}
				errors={errors}
				showElements={showElements}
				handleSubmit={handleSubmit}
				formValues={formValues}
				onSubmit={onSubmit}
				showForm={showForm}
			/>
		</div>
	);
}

export default FormComponent;
