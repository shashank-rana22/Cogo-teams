import { Button } from '@cogoport/components';
import { useForm, InputController, UploadController } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function CompanyPolicyModal({ showModal, setShowModal, refetchList }) {
	const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm();

	const isUpdate = !isEmpty(showModal);
	const url = isUpdate ? '/update_document_template' : '/create_document_template';
	const [{ loading }, trigger] = useHarbourRequest({
		url,
		method: 'post',
	}, { manual: true });

	const onSubmit = async (values) => {
		try {
			const payload = {
				id                : isUpdate ? showModal?.id : undefined,
				performed_by_id   : '123',
				performed_by_type : 'agent',
				name              : values?.company_policy_name,
				template_type     : 'company_policy',
				document_url      : values?.company_policy_document?.finalUrl,
			};

			await trigger({
				data: payload,
			});

			refetchList();
			reset();
			setShowModal(false);
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		if (!isEmpty(showModal)) {
			setValue('company_policy_name', showModal?.name);
			setValue('company_policy_document', showModal?.document_url);
		}
	}, [setValue, showModal]);

	return (
		<form>
			<div>
				<div className={styles.title}>Policy Name</div>
				<div className={styles.input_container}>
					<InputController
						control={control}
						name="company_policy_name"
						type="text"
						placeholder="Enter policy name"
						className="input_container"
						value={showModal?.name}
						rules={{ required: 'required' }}
					/>

					{errors?.company_policy_name
						? <div className={styles.error}>Company Policy Name is required</div>
						: null}
				</div>
			</div>

			<div>
				<div className={styles.title}>Upload Document</div>
				<UploadController
					name="company_policy_document"
					control={control}
					accept=".pdf"
					rules={{ required: 'required' }}
				/>

				{errors?.company_policy_document
					? <div className={styles.error}>Company Policy Document is required</div>
					: null}
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					style={{ marginRight: 12 }}
					onClick={() => setShowModal(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Create
				</Button>
			</div>
		</form>
	);
}

export default CompanyPolicyModal;
