import { Button } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useRef } from 'react';

import Form from '../form';

import controls from './controls';
import styles from './styles.module.css';

function UploadHbl(props) {
	const { docs, bls_count, primaryService, task, refetchDocs } = props || {};

	const formRefs = useRef([]);
	const [urls, setUrls] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const uploadBills = async (values) => {
		const documents = [];

		values?.forEach((item) => {
			documents.push({
				file_name    : item?.url?.fileName,
				document_url : item?.url?.finalUrl,
				data         : {
					description      : item?.description,
					document_number  : item?.document_number,
					containers_count : item?.containers_count,
					service_id       : primaryService?.id,
					service_type     : primaryService?.service_type,
				},
			});
		});

		const body = {
			shipment_id        : task?.shipment_id,
			uploaded_by_org_id : task?.organization_id,
			service_id         : task?.service_id,
			service_type       : task.service_type,
			pending_task_id:
			task?.service_type === 'lcl_freight_service' ? task?.id : undefined,
			document_type: 'draft_house_bill_of_lading',
			documents,
		};

		await trigger({ data: body });

		refetchDocs();
	};

	const handleSubmit = async () => {
		const payload = [];
		const validationFlags = await Promise.all(formRefs.current.map(({ formTrigger }) => formTrigger()));
		const isFormValid = validationFlags.every((valid) => valid);

		if (isFormValid) {
			formRefs.current.forEach(({ getFormValues }) => {
				const val = getFormValues();
				payload.push(val);
			});
			uploadBills(payload);
		}
	};

	useEffect(() => {
		const newUrls = [];

		docs?.forEach((item, i) => {
			newUrls[i] = `${item?.document_url}`;
		});

		setUrls(newUrls);
	}, [docs]);

	return (
		<main>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<form className={styles.view_and_form}>
						{urls?.[i]?.length > 0 ? (
							<Button
								onClick={() => {
									window.open(urls[i], '_blank');
								}}
								size="sm"
								id={`bm_pt_bl_upload_view_bl_${i + 1}`}
							>
								View HBL
								&nbsp;
								{i + 1}
							</Button>
						) : (
							<Form
								ref={(r) => {
									formRefs.current[i] = r;
								}}
								id={i}
								url={urls[i]}
								bl_type="HBL"
								controls={controls}
								{...props}
							/>
						)}
					</form>
				))}

			{bls_count > urls?.length && (
				<form className={styles.button_wrapper}>
					<Button
						disabled={loading}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</form>
			)}
		</main>
	);
}
export default UploadHbl;
