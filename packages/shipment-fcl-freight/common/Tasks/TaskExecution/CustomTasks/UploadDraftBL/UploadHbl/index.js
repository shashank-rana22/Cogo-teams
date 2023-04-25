// import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';
import { Toast, Button } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useScope } from '@cogoport/scope-select';
import { useState, useEffect, useRef } from 'react';

import controls from './controls';
import Form from './form';
import styles from './styles.module.css';

function UploadHbl(props) {
	const { docs, bls_count, summary, data, refetchDocs } = props || {};
	const [urls, setUrls] = useState([]);
	// const { submitShipmentMapping } = useCreateShipmentMapping();
	const formRefs = useRef([]);
	const { scope } = useScope();

	const createShipmentDocAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');
	const uploadBills = async (values) => {
		const documents = [];
		values.forEach((item) => {
			documents.push({
				file_name    : item?.url?.name,
				document_url : item?.url?.url,
				data         : {
					description      : item?.description,
					document_number  : item?.document_number,
					containers_count : item?.containers_count,
					service_id       : summary?.id,
					service_type     : summary?.service_type,
				},
			});
		});
		const body = {
			shipment_id        : data?.shipment_id,
			uploaded_by_org_id : data?.organization_id,
			service_id         : data?.service_id,
			service_type       : data.service_type,
			pending_task_id:
				data?.service_type === 'lcl_freight_service' ? data?.id : undefined,
			document_type: 'draft_house_bill_of_lading',
			documents,
		};
		await createShipmentDocAPI.trigger({ data: body });
		// feedbacks to cogolens starts
		try {
			// const rpaMappings = {
			// 	cogo_shipment_id: data?.shipment_id,
			// 	cogo_shipment_serial_no:
			// 		summary?.shipment_serial_id || summary.serial_id,
			// 	bill_of_lading: values?.document_number,
			// };
			// await submitShipmentMapping(rpaMappings);
		} catch (err) {
			toastApiError(err);
		}
		// feedbacks to cogolens ends
		refetchDocs();
	};

	const handleSubmit = () => {
		let isAllFormsValid = true;
		const invoice_details = [];

		(formRefs?.current || []).forEach((item) => {
			if (!item?.submitForm()) {
				isAllFormsValid = false;
			} else if (item?.submitForm()?.e) {
				Toast.error(item?.submitForm()?.e);
			} else {
				invoice_details.push(item?.submitForm());
			}
		});
		if (isAllFormsValid) {
			uploadBills(invoice_details);
		} else {
			Toast.error('Fill all forms');
		}
		// props.refetchDocs();
	};

	useEffect(() => {
		const newUrls = [...urls];
		docs?.forEach((item, i) => {
			newUrls[i] = `${item?.document_url}`;
		});
		setUrls(newUrls);
	}, [docs, urls]);

	return (
		<div>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<div className={styles.flex_container}>
						{urls?.[i]?.length > 0 ? (
							<Button
								ghost
								onClick={() => {
									window.open(urls[i], '_blank');
								}}
								size="sm"
								id={`bm_pt_bl_upload_view_bl_${i + 1}`}
							>
								View HBL
								{' '}
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
					</div>
				))}
			{bls_count > urls?.length && (
				<Button
					disabled={createShipmentDocAPI?.loading}
					onClick={handleSubmit}
					size="sm"
					id="bm_pt_bl_upload_hbl_submit"
				>
					Submit
				</Button>
			)}
		</div>
	);
}
export default UploadHbl;
