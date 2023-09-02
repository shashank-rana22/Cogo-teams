import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDocument from '../../../hooks/useCreateEmployeeDocument';

import controls from './controls';
import styles from './styles.module.css';

const DOC_TYPE_MAPPING = ['aadhaar_card', 'pan_card', 'driving_license', 'passport'];

const getDocType = ({ documents }) => {
	let component = {};
	(documents || []).forEach((element) => {
		if (DOC_TYPE_MAPPING.includes(element.document_type)) {
			component = { ...component, [element.document_type]: element };
		}
	});

	return component;
};

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

const getUpdatedKeysInPayload = (newValue, oldValue) => {
	if (newValue === oldValue) return undefined;
	return newValue;
};

const COLOR_MAPPING = {
	approved : 'green',
	rejected : 'red',
	active   : 'orange',
};

const MAPPING = {
	approved : 'Approved',
	rejected : 'Rejected',
	active   : 'Waiting for Approval',
};

function EditIdentificationDocuments({ data: info = {}, getEmployeeDetails = () => {} }) {
	const { documents = [] } = info || {};

	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { loading, createEmployeeDocument } = useCreateEmployeeDocument({ documents, getEmployeeDetails });

	const id = info?.detail?.id;
	const component = getDocType({ documents });

	const { aadhaar_card, pan_card, driving_license, passport } = component || {};

	useEffect(() => {
		setValue('aadhaar_card', aadhaar_card?.document_url);
		setValue('pan_card', pan_card?.document_url);
		setValue('driving_license', driving_license?.document_url);
		setValue('passport', passport?.document_url);
		setValue('aadhaar_card_number', aadhaar_card?.document_number);
		setValue('pan_card_number', pan_card?.document_number);
		setValue('passport_number', passport?.document_number);
		setValue('driving_license_number', driving_license?.document_number);
	}, [documents,
		setValue, aadhaar_card, pan_card, driving_license, passport?.document_url, passport?.document_number]);

	const finalControls = controls.map((singleControl) => {
		const { verification_key } = singleControl;

		if (component?.[verification_key]?.status === 'approved') {
			return { ...singleControl, disabled: true, status: component?.[verification_key]?.status || '' };
		}

		return { ...singleControl, status: component?.[verification_key]?.status || '' };
	});

	const onSubmit = (values) => {
		const doc = Object.keys(values).map((item) => {
			const docNumber = !item.includes('number') ? `${item}_number` : undefined;

			if ((values?.[item]?.finalUrl || values?.[item]) && values?.[docNumber]) {
				const apiObject = component[item];

				const documentNumberToBeUpdated = getUpdatedKeysInPayload(
					values?.[docNumber].toUpperCase(),
					apiObject?.document_number,
				);
				const documentUrlToBeUpdated = getUpdatedKeysInPayload(
					values?.[item]?.finalUrl || values?.[item],
					apiObject?.document_url,
				);

				if (!documentNumberToBeUpdated && !documentUrlToBeUpdated) {
					return null;
				}

				return {
					document_type   : item,
					id              : apiObject?.id,
					document_number : documentNumberToBeUpdated,
					document_url    : documentUrlToBeUpdated,
					status          : 'active',
				};
			}

			return null;
		});

		const newDoc = doc.filter((i) => i !== null);

		createEmployeeDocument({ data: values, id, newDoc });
	};

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				Please upload the identification documents and enter the corresponding details,
				<span style={{ color: 'red', paddingLeft: 4 }}>Documents once approved cannot be changed.</span>
			</div>
			<div className={styles.container}>
				{finalControls?.map((controlItem) => {
					const { type, label, name: controlName, status = '' } = controlItem || {};
					if (!type) { return null; }
					const Element = getElementController(type);

					if (!Element) { return null; }

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}

								<span className={styles.span}>
									{status ? (
										<Pill size="md" color={COLOR_MAPPING[status] || 'green'}>
											{MAPPING[status]}
										</Pill>
									) : null}
								</span>

							</div>

							<div className={styles.control}>
								<Element
									{...(type === 'fileUpload'
										? removeTypeField(controlItem) : { ...controlItem })}
									control={control}
									key={controlName}
									className={styles[`element_${controlName}`]}

								/>

								{errors[controlName]?.message
									? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
							</div>
						</div>
					);
				})}

				<div className={styles.button}>

					<Button
						size="md"
						type="button"
						onClick={handleSubmit(onSubmit)}
						loading={loading}
					>
						Save
					</Button>
				</div>

			</div>
		</div>
	);
}

export default EditIdentificationDocuments;
