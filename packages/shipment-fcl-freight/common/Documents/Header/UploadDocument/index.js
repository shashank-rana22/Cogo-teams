import { RadioGroup } from '@cogoport/components';
import { SelectController, UploadController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

const getConsigneeShipperId = (shipment_data) => {
	const options = [
		{
			label : shipment_data?.consignee_shipper?.business_name,
			value : shipment_data?.consignee_shipper?.id,
		},
		{
			label : shipment_data?.importer_exporter?.business_name,
			value : shipment_data?.importer_exporter?.id,
		},
	];
	return options;
};

function UploadDocument({
	document_data,
	loading,
	shipment_data,
	activeStakeholder,
	formValues,
	control,
	orgId,
	setOrgId = () => {},
}) {
	const documents = document_data?.list?.map((e) => (
		{ label: startCase(e?.document_type), value: e?.document_type })) || [];

	return (
		<div>
			{!loading ? (
				<div>
					<div>
						<SelectController
							size="sm"
							control={control}
							placeholder="Select Document Type"
							style={{ padding: '32px 0px' }}
							name="document_type"
							options={documents}
							rules={{ required: { value: true, message: 'Document is Required' } }}
						/>
					</div>
					<div>
						<UploadController
							control={control}
							name="upload_document"
							rules={{ required: 'File is required.' }}
						/>
					</div>
					{['superadmin', 'admin'].includes(activeStakeholder) && shipment_data?.consignee_shipper_id
					&& formValues.upload_document ? (
						<div style={{ marginTop: '16px' }}>
							<span style={{ fontWeight: '700' }}>choose organization </span>
							<RadioGroup
								options={getConsigneeShipperId(shipment_data)}
								control={control}
								onChange={(val) => setOrgId(val)}
								value={orgId}
							/>
						</div>
						) : null}

				</div>
			) : null}
		</div>
	);
}
export default UploadDocument;
