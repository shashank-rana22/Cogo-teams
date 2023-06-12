import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDocument from '../../../../hooks/useCreateEmployeeDocument';

import controls from './controls';
import styles from './styles.module.css';

const DOC_ARRAY = [
	'aadhaar_card_number',
	'aadhaar_card',
	'pan_card_number',
	'pan_card',
];

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

function IdentificationDocuments({ data: info, getEmployeeDetails }) {
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
		const doc = Object.keys(component).map((item) => {
			const docNumber = `${item}_number`;

			const checkDocument = (documents || []).find((element) => (element.document_type === item));

			if (checkDocument?.status === 'approved' || !values?.[item]?.finalUrl || !values?.[docNumber]) {
				return null;
			}

			return {
				document_type   : item,
				id              : component[item]?.id,
				document_number : values?.[docNumber].toUpperCase() || undefined,
				document_url    : values?.[item]?.finalUrl || undefined,
				status          : 'active',
			};
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
					const Element = getElementController(type);

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}

								{status ? (
									<Pill size="md" color={COLOR_MAPPING[status] || 'green'}>
										{MAPPING[status]}
									</Pill>
								) : null}

								{DOC_ARRAY.includes(controlName) && status !== 'approved' ? (
									<sup className={styles.sup}>*</sup>
								) : null}
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

export default IdentificationDocuments;
