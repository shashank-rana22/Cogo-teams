import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { snakeCase, isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { v1 as uuid } from 'uuid';

import getContentMapping from '../../../configurations/default-content-mapping';
import useSubmitFormDetails from '../../../hooks/useSubmitFormDetails';
import FormLayout from '../FormLayout';

import controls from './controls';
import DynamicFormComponent from './DynamicFormComponent';
import styles from './styles.module.css';

const DynamicFormEditor = dynamic(() => import('./FormEditor'), { ssr: false });

const prefillControls = [
	'label',
	'type',
	'placeholder',
	'width',
	'options_type',
	'is_mandetory',
	'manual_options',
	'dynamic_data_endpoint',
	'options',
];

function FormComponent({
	pageConfiguration,
	setPageConfiguration,
	rowData,
	widget,
	childId,
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

	console.log('Dfkjidjifj', rowData);

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

	const showElementsFunc = (controlItems, values) => {
		const showElements = {};

		controlItems.forEach((cntrl) => {
			if (cntrl.name === 'controls') {
				if (showElements.controls === undefined) {
					showElements.controls = Array.from(
						Array(values?.controls?.length),
						() => ({}),
					);
				}

				if (values.controls) {
					values?.controls?.forEach((item, i) => {
						if (item.type === 'select') {
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].manual_options = false;
							showElements.controls[i].options_type = true;
							showElements.controls[i].options = false;
							if (item.options_type === 'dynamic_data') {
								showElements.controls[i].dynamic_data_endpoint = true;
								showElements.controls[i].manual_options = false;
								showElements.controls[i].options = false;
							} else if (item.options_type === 'manual_data') {
								showElements.controls[i].manual_options = true;
								showElements.controls[i].dynamic_data_endpoint = false;
								showElements.controls[i].options = false;
							} else {
								showElements.controls[i].manual_options = false;
								showElements.controls[i].dynamic_data_endpoint = false;
								showElements.controls[i].options = false;
							}
						} else if (['radioGroup', 'chips'].includes(item.type)) {
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].manual_options = false;
							showElements.controls[i].options_type = false;
							showElements.controls[i].options = true;
						} else {
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].manual_options = false;
							showElements.controls[i].options_type = false;
							showElements.controls[i].options = false;
						}
					});
				}
			} else {
				showElements[cntrl.name] = true;
			}
		});
		return showElements;
	};

	const showElements = showElementsFunc(controls, formValues);

	const onDynamicFormSubmit = (val) => {
		onSubmitDetails(val);
	};

	const onSubmit = async (value) => {
		const { controls: defaultControls, heading } = value || {};

		const { parentId, id } = rowData || {};

		const CONTENT_MAPPING = getContentMapping();

		const data = pageConfiguration;

		const newControls = (defaultControls || []).map((item) => {
			const { type, options_type, manual_options, is_mandetory, options: groupOptions } = item || {};
			const isOptionsTrue = ['asyncSelect', 'select', 'radioGroup', 'chips'].includes(type);

			let options = [];

			if (options_type === 'manual_data') {
				try {
					options = JSON.parse(manual_options)?.options;
				} catch (err) {
					console.log(err);
				}
			} else if (['radioGroup', 'chips'].includes(type)) {
				try {
					options = JSON.parse(groupOptions)?.options;
				} catch (err) {
					console.log(err);
				}
			}

			return ({
				...item,
				name    : snakeCase(item?.label),
				style   : { flexBasis: item?.width || 'none' },
				options : isOptionsTrue ? options : undefined,
				rules   : {
					required: is_mandetory === 'yes' ? true : undefined,
				},
			});
		});

		const newValue = { ...value, controls: newControls };

		const selectedComponentIndex = (data.layouts || []).findIndex((sComponentId) => (sComponentId.id === id));

		const defaultParentId = uuid();

		const textWigdet = 		{
			component: {
				...CONTENT_MAPPING.text.component,
				content: heading,
			},
			id       : 0,
			parentId : parentId || defaultParentId,
			type     : 'COLUMN',
		};

		const formWidget = {
			component: {
				...CONTENT_MAPPING.form.component,
				formData: newValue,
			},
			id       : 1,
			parentId : parentId || defaultParentId,
			type     : 'COLUMN',
		};

		// const buttonWigdet = {
		// 	...CONTENT_MAPPING.button,
		// 	id         : 2,
		// 	content    : buttonText,
		// 	parentId   : defaultParentId,
		// 	attributes : {
		// 		// onClick: dynamicHandleSubmit(onDynamicFormSubmit),
		// 	},
		// };

		const childrenData = [textWigdet, formWidget];

		// console.log('dfjijdi', parentId, childId);

		const { id: selectedRowId } = selectedRow || {};

		const { id : columnId } = columnData || {};

		const { id : nestedColumnId } = nestedColumData || {};

		const { id: selectedColumnId } = selectedColumn || {};

		const { id: selectedChildId } = selectedItem || {};

		const { id: selectedNestedColumnId } = selectedItem || {};

		console.log('sdjskdjk', selectedColumn, selectedNestedColumn, selectedItem);

		if (id === selectedRowId && selectedItem) {
			if (Object.keys(selectedNestedColumn).length > 0 && nestedColumnId === selectedNestedColumnId) {
				// console.log('dkfodjfjosjx');
			} else if (Object.keys(selectedColumn).length > 0 && columnId === selectedColumnId) {
				// if (data.layouts[selectedComponentIndex].component.children.length === 2) {
				// 	data.layouts[selectedComponentIndex].component.children = childrenData;
				// } else if (data.layouts[selectedComponentIndex].component.children.length === 1) {
				// 	console.log('sdkjskdk', selectedColumn, selectedChildId);
				// 	// data.layouts[selectedComponentIndex].component.children[selectedColumnId].component = {
				// 	// 	...data.layouts[selectedComponentIndex].component.children.component,
				// 	// 	children : childrenData,
				// 	// 	type     : 'container',
				// 	// };
				// }
			} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
				data.layouts[selectedComponentIndex] = {
					...data.layouts[selectedComponentIndex],
					parentId: defaultParentId,
				};
				data.layouts[selectedComponentIndex].component = {
					...data.layouts[selectedComponentIndex].component,
					children : childrenData,
					type     : 'container',
				};
			}
		}

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));

		setShow(false);
	};

	const handleEditForm = (values) => {
		const { api_url, buttonText, heading, controls: controlsPrefill } = values || {};
		setShowForm(false);

		setTimeout(() => {
			setShowForm(true);
		}, 100);

		setShow(true);
		setValue('api_url', api_url);
		setValue('buttonText', buttonText);
		setValue('heading', heading);
		(controlsPrefill || []).map((itemList, idx) => (prefillControls || []).map((item) => (
			setValue(`controls[${idx}][${item}]`, itemList[item])
		)));
	};

	const onClose = () => {
		setShow(false);
	};

	const handleRenderComponents = () => {
		if (!isEmpty(dynamicControls)) {
			return (
				<DynamicFormComponent
					errors={dynamicControlErrors || {}}
					formData={formData}
					control={dynamicControl}
					dynamicHandleSubmit={dynamicHandleSubmit}
					onDynamicFormSubmit={onDynamicFormSubmit}
					handleEditForm={handleEditForm}

				/>
			);
		}

		return (
			<div>
				<IcMPlusInCircle height="22px" width="22px" cursor="pointer" onClick={() => setShow(true)} />
				<div>Click here to start Customizing your form</div>
			</div>
		);
	};

	return (
		<div>
			{handleRenderComponents()}
			<Modal className={styles.modal_styles} size="xl" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Customize Form" />
				<Modal.Body>
					<div className={styles.flex_item}>
						<div className={styles.left_panel}>
							<DynamicFormEditor formData={formValues} />
						</div>
						<div className={styles.right_panel}>
							{showForm && (
								<FormLayout
									controls={controls}
									control={control}
									errors={errors}
									showElements={showElements}
								/>
							)}
						</div>

					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit(onSubmit)}>
						Add Form

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FormComponent;
