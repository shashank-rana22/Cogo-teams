import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { snakeCase, isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import FormLayout from '../FormLayout';

import controls from './controls';
import DynamicFormComponent from './DynamicFormComponent';
import styles from './styles.module.css';

const DynamicFormEditor = dynamic(() => import('./FormEditor'), { ssr: false });

function FormComponent({
	components,
	setComponents,
	selectedRow,
	childId,
	widget,
}) {
	const [show, setShow] = useState(false);

	const { formData } = widget || {};

	const {
		control,
		watch,
		formState:{ errors = {} },
		handleSubmit,
	} = useForm();

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
						if (item.type === 'select') {
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

	const onClose = () => {
		setShow(false);
	};

	const onSubmit = (value) => {
		const { controls: defaultControls } = value || {};

		const { parentId, id } = selectedRow || {};

		const data = components;

		const newControls = (defaultControls || []).map((item) => ({ ...item, name: snakeCase(item?.label) }));

		const newValue = { ...value, controls: newControls };

		setShow(false);

		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

		if (parentId) {
			data.layouts[selectedComponentIndex].children[childId].formData = newValue;
		} else {
			data.layouts[selectedComponentIndex].formData = newValue;
		}

		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const onDynamicFormSubmit = (values) => {
		console.log('sjdjisdijo', values);
	};

	if (!isEmpty(dynamicControls)) {
		return (
			<DynamicFormComponent formData={formData} onDynamicFormSubmit={onDynamicFormSubmit} />
		);
	}

	return (
		<div className={styles.container}>
			<IcMPlusInCircle height="22px" width="22px" cursor="pointer" onClick={() => setShow(true)} />
			<div>Click here to start Customizing your form</div>

			<Modal size="xl" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Customize Form" />
				<Modal.Body style={{ maxHeight: '600px' }}>
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
