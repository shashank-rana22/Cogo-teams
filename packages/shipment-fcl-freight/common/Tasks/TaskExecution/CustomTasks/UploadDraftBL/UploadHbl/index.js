import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import Form from '../form';

import controls from './controls';
import styles from './styles.module.css';

const INDEX = 1;

function UploadHbl(props) {
	const { docs, bls_count, primaryService, task, refetchDocs } = props || {};

	const formRefs = useRef([]);
	const [urls, setUrls] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/create_document',
		method : 'POST',
	}, { manual: true });

	const uploadBills = async (values) => {
		const DOCUMENTS = [];

		values?.forEach((item) => {
			DOCUMENTS.push({
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
			document_type      : 'draft_house_bill_of_lading',
			documents          : DOCUMENTS,
		};

		await trigger({ data: body });

		refetchDocs();
	};

	const handleSubmit = async () => {
		const PAY_LOAD = [];
		const validationFlags = await Promise.all(formRefs.current.map(({ formTrigger }) => formTrigger()));
		const isFormValid = validationFlags.every((valid) => valid);

		if (isFormValid) {
			formRefs.current.forEach(({ getFormValues }) => {
				const val = getFormValues();
				PAY_LOAD.push(val);
			});
			uploadBills(PAY_LOAD);
		}
	};

	useEffect(() => {
		const NEW_URLS = [];

		docs?.forEach((item, i) => {
			NEW_URLS[i] = `${item?.document_url}`;
		});

		setUrls(NEW_URLS);
	}, [docs]);

	return (
		<main>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<form className={styles.view_and_form} key={uuid()}>
						{urls?.[i]?.length > GLOBAL_CONSTANTS.zeroth_index ? (
							<Button
								onClick={() => {
									window.open(urls[i], '_blank');
								}}
								size="sm"
								id={`bm_pt_bl_upload_view_bl_${i + INDEX}`}
							>
								View HBL
								&nbsp;
								{i + INDEX}
							</Button>
						) : (
							<Form
								ref={(r) => {
									formRefs.current[i] = r;
								}}
								id={i}
								key={uuid()}
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
