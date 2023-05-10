import { Select, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../hooks/useCreateShipmentDocument';
import DocumentForm from '../DocumentForm';

import getCreateDocumentParams from './getCreateDocumentParams';

const SUPPLIER_STAKEHOLDERS = ['booking_desk', 'document_desk',
	'booking_desk_manager', 'lastmile_ops', 'lastmile_ops_manager'];

function GenericUpload({
	showModal,
	setShowModal,
	data,
	shipment_data,
	activeStakeholder,
	refetch = () => {},
}) {
	const [orgId, setOrgId] = useState();
	const [selectSource, setSelectSource] = useState('');

	const { control, watch, formState : { errors }, handleSubmit } = useForm();
	const formValues = watch();

	const afterCreateRefetch = () => {
		setShowModal(false);
		refetch();
	};

	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		refetch: afterCreateRefetch,
	});

	const onSubmit = () => {
		const documents = [
			{
				document_url : formValues?.upload_document?.finalUrl,
				file_name    : formValues?.upload_document?.fileName,
			},
		];
		const params = [...getCreateDocumentParams({
			shipmentData: shipment_data,
			formValues,
			activeStakeholder,
			selectSource,
			orgId,
		}), documents];

		apiTrigger(params);
	};

	const SourceOptions = Array.isArray(data)
		? (data || [])?.map((e) => ({ label: e?.business_name, value: e?.id }))
		: [];

	return (
		<div>
			<Modal
				show={showModal}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header title="Upload Document" />

				<Modal.Body style={{ minHeight: '200px' }}>
					{SUPPLIER_STAKEHOLDERS.includes(activeStakeholder) ? (
						<Select
							size="sm"
							placeholder="Select Source"
							style={{ padding: '6px 0px', width: '50%' }}
							value={selectSource}
							options={SourceOptions || []}
							onChange={(e) => setSelectSource(e)}
							isClearable
						/>
					) : null }

					{!SUPPLIER_STAKEHOLDERS.includes(activeStakeholder) || selectSource ? (
						<DocumentForm
							shipment_data={shipment_data}
							orgList={data}
							control={control}
							activeStakeholder={activeStakeholder}
							uploaded_by_org_id={selectSource}
							formValues={formValues}
							orgId={orgId}
							errors={errors}
							setOrgId={setOrgId}
						/>
					) : null}

				</Modal.Body>

				<Modal.Footer>
					<Button
						style={{ marginRight: '16px' }}
						themeType="secondary"
						onClick={() => setShowModal(false)}
					>
						cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={docLoading}
					>
						Upload
					</Button>

				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default GenericUpload;
