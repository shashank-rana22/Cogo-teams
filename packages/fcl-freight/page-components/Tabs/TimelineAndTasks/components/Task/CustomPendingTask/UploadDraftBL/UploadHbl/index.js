import { useState, useEffect, useRef } from 'react';
import { Button, Flex } from '@cogo/commons/components';
import { useRequest, useScope } from '@cogo/commons/hooks';
import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';
import { cogoToast } from '@cogo/deprecated_legacy/ui';
import Form from './form';
import controls from './controls';

const UploadHbl = (props) => {
	const { docs, bls_count, summary, data, refetchDocs } = props || {};
	const [urls, setUrls] = useState([]);
	const { submitShipmentMapping } = useCreateShipmentMapping();
	const formRefs = useRef([]);
	const { scope } = useScope();
	const handleSubmit = () => {
		let isAllFormsValid = true;
		const invoice_details = [];

		(formRefs?.current || []).forEach((item) => {
			if (!item?.submitForm()) {
				isAllFormsValid = false;
			} else if (item?.submitForm()?.e) {
				cogoToast.error(item?.submitForm()?.e);
			} else {
				invoice_details.push(item?.submitForm());
			}
		});
		if (isAllFormsValid) {
			uploadBills(invoice_details);
		} else {
			cogoToast.error('Fill all forms');
		}
		// props.refetchDocs();
	};
	const createShipmentDocAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');
	const uploadBills = async (values) => {
		const documents = [];
		values.forEach((item) => {
			documents.push({
				file_name: item?.url?.name,
				document_url: item?.url?.url,
				data: {
					description: item?.description,
					document_number: item?.document_number,
					containers_count: item?.containers_count,
					service_id: summary?.id,
					service_type: summary?.service_type,
				},
			});
		});
		const body = {
			shipment_id: data?.shipment_id,
			uploaded_by_org_id: data?.organization_id,
			service_id: data?.service_id,
			service_type: data.service_type,
			pending_task_id:
				data?.service_type === 'lcl_freight_service' ? data?.id : undefined,
			document_type: 'draft_house_bill_of_lading',
			documents,
		};
		await createShipmentDocAPI.trigger({ data: body });
		// feedbacks to cogolens starts
		try {
			const rpaMappings = {
				cogo_shipment_id: data?.shipment_id,
				cogo_shipment_serial_no:
					summary?.shipment_serial_id || summary.serial_id,
				bill_of_lading: values?.document_number,
			};
			await submitShipmentMapping(rpaMappings);
		} catch (err) {
			console.log(err);
		}
		// feedbacks to cogolens ends
		refetchDocs();
	};

	useEffect(() => {
		const newUrls = [...urls];
		docs?.forEach((item, i) => {
			newUrls[i] = `${item?.document_url}`;
		});
		setUrls(newUrls);
	}, [docs]);

	return (
		<div>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<Flex
						display="block"
						border="1px solid #EDEDED"
						padding={16}
						borderRadius={8}
						marginBottom={8}
					>
						{urls?.[i]?.length > 0 ? (
							<Button
								ghost
								onClick={() => {
									window.open(urls[i], '_blank');
								}}
								size="sm"
								id={`bm_pt_bl_upload_view_bl_${i + 1}`}
							>
								View HBL {i + 1}
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
					</Flex>
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
};
export default UploadHbl;
