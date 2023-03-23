import { InputController, UploadController, SelectController, MultiselectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function UploadForm(props) {
	const {
		utility_bill_document_url,
		control,
		errors,
		country_id,
		registration_number,
		preferred_languages,
		documentUrl,
		fileType = '',
	} = props;

	return (
		<div className={styles.container}>
			<div className={styles.input_container}>
				<div className={styles.label}>
					{fileType === 'pan'
						? 'PAN Document'
						: 'Business Address Proof'}
				</div>
				<div className={styles.input_field}>
					<UploadController
						{...utility_bill_document_url}
						control={control}
						defaultValues={documentUrl}
						id="utility_bill_document_url"
						disabled
					/>
					<div
						className={styles.error_text}
					>
						{errors?.utility_bill_document_url?.message}
					</div>
				</div>
			</div>

			{fileType !== 'pan' && (
				<div className={styles.input_container}>
					<div className={styles.label}>
						Organization’s registration country
					</div>
					<div className={styles.input_field}>
						<SelectController
							{...country_id}
							control={control}
							id="registration_country"
						/>
						<div
							className={styles.error_text}
						>
							{errors?.country_id?.message}
						</div>
					</div>
				</div>
			)}

			<div className={styles.input_container}>
				<div className={styles.label}>
					Organization’s
					{' '}
					{fileType === 'pan' ? 'PAN' : 'GST'}
					{' '}
					Number
				</div>
				<div className={styles.input_field}>
					<InputController
						{...registration_number}
						control={control}
						id="registration_number"
					/>
					<div
						className={styles.error_text}
					>
						{errors?.registration_number?.message}
					</div>
				</div>
			</div>

			{fileType !== 'pan' && (
				<div className={styles.input_container}>
					<div className={styles.label}>
						Preferred Languages
					</div>
					<div className={styles.input_field}>
						<MultiselectController
							{...preferred_languages}
							control={control}
							id="preferred_languages"
						/>
						<div
							className={styles.error_text}
						>
							{errors?.preferred_languages?.message}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default UploadForm;
