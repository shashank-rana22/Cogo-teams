import useListPossibelDocuments from '../../../../hooks/useListPossibleDocuments';
import UploadDocument from '../UploadDocument';

function DocumentForm({
	shipment_data,
	orgList,
	activeStakeholder,
	uploaded_by_org_id,
	formValues,
	control,
	errors,
	orgId,
	setOrgId = () => {},
}) {
	let params = {};
	switch (activeStakeholder) {
		case 'superadmin':
		case 'admin':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : orgList?.map((org) => org.id) || [],
				org_account_types : ['service_provider', 'importer_exporter'],
				actions           : ['create'],
			};
			break;

		case 'booking_agent':
		case 'consignee_shipper_booking_agent':
			params = {
				shipment_id       : shipment_data?.id,
				org_account_types : ['importer_exporter'],
				actions           : ['create'],
			};
			break;

		case 'booking_desk':
		case 'booking_desk_manager':
		case 'document_desk':
		case 'document_desk_manager':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : [uploaded_by_org_id],
				org_account_types : ['service_provider'],
				actions           : ['create'],
			};
			break;
		case 'costbooking_ops':
		case 'costbooking_manager':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : [uploaded_by_org_id],
				org_account_types : ['service_provider'],
				actions           : ['create'],
			};
			break;
		case 'lastmile_ops':
		case 'lastmile_ops_manager':
			params = {
				shipment_id       : shipment_data?.id,
				organization_ids  : [uploaded_by_org_id],
				org_account_types : ['service_provider'],
				actions           : ['create'],
			};
			break;
		default:
			params = {};
			break;
	}

	const { data, loading } = useListPossibelDocuments({ defaultParams: params });

	return (
		<div>
			<UploadDocument
				document_data={data}
				loading={loading}
				control={control}
				shipment_data={shipment_data}
				activeStakeholder={activeStakeholder}
				formValues={formValues}
				orgId={orgId}
				errors={errors}
				setOrgId={setOrgId}
			/>
		</div>

	);
}
export default DocumentForm;
