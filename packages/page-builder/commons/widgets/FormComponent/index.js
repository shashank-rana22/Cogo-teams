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
	components,
	setComponents,
	selectedRow,
	widget,
	childId,
}) {
	const [show, setShow] = useState(false);

	const { formData } = widget || {};

	const formProps = useForm();

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
						if (item.type === 'asyncSelect') {
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

		const { parentId, id } = selectedRow || {};

		const CONTENT_MAPPING = getContentMapping();

		const data = components;

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

		setShow(false);

		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

		const defaultParentId = uuid();

		const textWigdet = 		{
			...CONTENT_MAPPING.text,
			id       : 0,
			content  : heading,
			parentId : defaultParentId,
		};

		const formWidget = {
			...CONTENT_MAPPING.form,
			id       : 1,
			formData : newValue,
			parentId : defaultParentId,
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

		if (parentId) {
			data.layouts[selectedComponentIndex].children[childId] = {
				...data.layouts[selectedComponentIndex].children[childId],
				type     : 'container',
				parentId : defaultParentId,
			};

			data.layouts[selectedComponentIndex].children[childId].children = childrenData;
		} else {
			data.layouts[selectedComponentIndex] = {
				...data.layouts[selectedComponentIndex],
				type     : 'container',
				parentId : defaultParentId,
			};

			data.layouts[selectedComponentIndex].children = childrenData;
		}

		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const handleEditForm = (values) => {
		const { api_url, buttonText, heading, controls: controlsPrefill } = values || {};

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
							<FormLayout
								controls={controls}
								control={control}
								errors={errors}
								showElements={showElements}
							/>
						</div>

					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit(onSubmit)}>Add Form</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FormComponent;
