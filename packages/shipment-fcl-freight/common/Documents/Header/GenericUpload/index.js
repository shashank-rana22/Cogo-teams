import { Select, Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../hooks/useCreateShipmentDocument';
import useListShipmentOrganizations from '../../../../hooks/useListShipmentOrganizations';
import DocumentForm from '../DocumentForm';

import getCreateDocumentParams from './getCreateDocumentParams';
import styles from './styles.module.css';

function GenericUpload({
	showModal,
	setShowModal,
	data,
	shipment_data,
	activeStakeholder,
	refetch = () => {},
}) {
	const [orgId, setOrgId] = useState();

	const { control, watch } = useForm();
	const formValues = watch();

	const {
		orgList,
		loading,
		filters,
		setFilters,
	} = useListShipmentOrganizations({ shipment_data });

	const afterCreateRefetch = () => {
		setShowModal(false);
		refetch();
	};

	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		documents: [
			{
				document_url : formValues?.upload_document?.finalUrl,
				file_name    : formValues?.upload_document?.fileName,
			},
		],
		refetch: afterCreateRefetch,
	});

	const onSubmit = () => {
		const params = getCreateDocumentParams({
			shipmentData: shipment_data,
			formValues,
			activeStakeholder,
			filters,
			orgId,
		});

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

				<Modal.Body className={styles.modal_container}>
					{['booking_desk', 'document_desk'].includes(activeStakeholder) ? (
						<Select
							size="sm"
							placeholder="Select Source"
							style={{ padding: '6px', marginRight: '6px', width: '200px' }}
							value={filters?.uploaded_by_org_id}
							options={SourceOptions || []}
							onChange={(e) => setFilters({ ...filters, uploaded_by_org_id: e })}
							isClearable
						/>
					) : null }
					{!loading ? (
						<DocumentForm
							shipment_data={shipment_data}
							orgList={orgList}
							control={control}
							activeStakeholder={activeStakeholder}
							uploaded_by_org_id={filters?.uploaded_by_org_id}
							formValues={formValues}
							orgId={orgId}
							setOrgId={setOrgId}
						/>
					) : null}

				</Modal.Body>

				<Modal.Footer>
					<Button
						className={styles.footer}
						themeType="secondary"
						onClick={() => setShowModal(false)}
					>
						cancel
					</Button>
					<Button
						onClick={() => onSubmit()}
						disabled={loading || docLoading}
					>
						Upload
					</Button>

				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default GenericUpload;
