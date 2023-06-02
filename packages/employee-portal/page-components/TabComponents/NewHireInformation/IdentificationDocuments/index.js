import { Button, Pill } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDocument from '../../../../hooks/useCreateEmployeeDocument';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

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

function IdentificationDocuments({ data, getEmployeeDetails }) {
	const { documents = [] } = data || {};

	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { loading, createEmployeeDocument } = useCreateEmployeeDocument({ documents, getEmployeeDetails });

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const aadhaar_card = (documents || []).find((element) => (element.document_type === 'aadhaar_card'));
	const pan_card = (documents || []).find((element) => (element.document_type === 'pan_card'));
	const driving_license = (documents || []).find((element) => (element.document_type === 'driving_license'));
	const passport = (documents || []).find((element) => (element.document_type === 'passport'));

	const component = { aadhaar_card, driving_license, pan_card, passport };

	useEffect(() => {
		setValue('aadhaar_card', aadhaar_card?.document_url);
		setValue('pan_card', pan_card?.document_url);
		setValue('driving_license', driving_license?.document_url);
		setValue('passport', passport?.document_url);
		setValue('aadhaar_card_number', aadhaar_card?.document_number);
		setValue('pan_card_number', pan_card?.document_number);
		setValue('passport_number', passport?.document_number);
		setValue('driving_license_number', driving_license?.document_number);
	}, [documents, aadhaar_card, driving_license, pan_card, passport, setValue]);

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

			if (!values?.[item]?.finalUrl || !values?.[docNumber]) {
				return null;
			}

			return {
				document_type   : item,
				id              : component[item]?.id,
				document_number : values?.[docNumber] || undefined,
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
				Please upload the identification documents and enter the corresponding details !
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

								{[
									'aadhaar_card_number',
									'aadhaar_card',
									'pan_card_number',
									'pan_card',
								].includes(controlName) && status !== 'approved' ? (
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
				<Button
					size="md"
					type="button"
					className={styles.button}
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default IdentificationDocuments;
