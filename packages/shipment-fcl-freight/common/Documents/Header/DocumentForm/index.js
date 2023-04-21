import useListPossibelDocuments from '../../../../hooks/useListPossibleDocuments';
import UploadDocument from '../UploadDocument';

function DocumentForm({
	shipment_data,
	orgList,
	activeStakeholder,
	uploaded_by_org_id,
	formValues,
	control,
	orgId,
	setOrgId,
}) {
	let params = {};
	switch (activeStakeholder) {
		case 'superadmin':
		case 'admin':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : orgList?.list?.map((org) => org.id) || [],
				org_account_types : ['service_provider', 'importer_exporter'],
				action_name       : 'create',
			};
			break;

		case 'booking_agent':
		case 'consignee_shipper_booking_agent':
			params = {
				shipment_id       : shipment_data?.id,
				org_account_types : ['importer_exporter'],
				action_name       : 'create',
			};
			break;

		case 'booking_desk':
		case 'document_desk':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : [uploaded_by_org_id],
				org_account_types : ['service_provider'],
				action_name       : 'create',
			};
			break;
		default:
			params = {};
			break;
	}

	const {
		data,
		loading,
	} = useListPossibelDocuments({
		defaultParams: params,
	});

	return (
		<div>
			{!['booking_desk', 'document_desk'].includes(activeStakeholder) || uploaded_by_org_id ? (
				<UploadDocument
					document_data={data}
					loading={loading}
					control={control}
					shipment_data={shipment_data}
					activeStakeholder={activeStakeholder}
					formValues={formValues}
					orgId={orgId}
					setOrgId={setOrgId}
				/>
			) : null}
		</div>

	);
}
export default DocumentForm;
