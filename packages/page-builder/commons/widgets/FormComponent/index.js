import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { snakeCase, isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { v1 as uuid } from 'uuid';

import CONTENT_MAPPING from '../../../configurations/default-content-mapping';
import FormLayout from '../FormLayout';

import controls from './controls';
import DynamicFormComponent from './DynamicFormComponent';
import styles from './styles.module.css';

const DynamicFormEditor = dynamic(() => import('./FormEditor'), { ssr: false });

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
	} = formProps || {};

	const dynamicFormProps = useForm();

	const {
		control: dynamicControl,
		formState:{ errors: dynamicControlErrors },
		handleSubmit: dynamicHandleSubmit,
	} = dynamicFormProps || {};

	const formValues = watch();

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
							if (item.options_type === 'dynamic_data') {
								showElements.controls[i].dynamic_data_endpoint = true;
								showElements.controls[i].manual_options = false;
							} else if (item.options_type === 'manual_data') {
								showElements.controls[i].manual_options = true;
								showElements.controls[i].dynamic_data_endpoint = false;
							} else {
								showElements.controls[i].manual_options = false;
								showElements.controls[i].dynamic_data_endpoint = false;
							}
						} else {
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].manual_options = false;
							showElements.controls[i].options_type = false;
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

	const onSubmit = (value) => {
		const { controls: defaultControls, buttonText, heading } = value || {};

		const { parentId, id } = selectedRow || {};

		const data = components;

		const newControls = (defaultControls || []).map((item) => {
			const { type, options_type, manual_options, is_mandetory } = item || {};
			const isOptionsTrue = ['asyncSelect', 'select'].includes(type);
			let options = [];

			if (options_type === 'manual_data') {
				try {
					options = JSON.parse(manual_options)?.options;
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

		const buttonWigdet = {
			...CONTENT_MAPPING.button,
			id         : 2,
			content    : buttonText,
			parentId   : defaultParentId,
			attributes : {
				onClick: dynamicHandleSubmit(onDynamicFormSubmit),
			},
		};

		const childrenData = [textWigdet, formWidget, buttonWigdet];

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

	const onClose = () => {
		setShow(false);
	};

	const onDynamicFormSubmit = (values) => {
		console.log('sjdjisdijo', values);
	};

	if (!isEmpty(dynamicControls)) {
		return (
			<DynamicFormComponent
				errors={dynamicControlErrors || {}}
				formData={formData}
				control={dynamicControl}
			/>
		);
	}

	return (
		<div>
			<IcMPlusInCircle height="22px" width="22px" cursor="pointer" onClick={() => setShow(true)} />
			<div>Click here to start Customizing your form</div>

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
