import { handleError, RadioGroupController, SelectController, UploadController } from '@cogoport/forms';
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
	document_data = {},
	loading = false,
	shipment_data = {},
	activeStakeholder = '',
	formValues = {},
	control,
	errors = {},
	orgId = '',
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
							isClearable
							rules={{
								required:
								{
									value   : true,
									message : 'Document is Required',
								},
							}}
						/>

						{errors?.document_type ? (
							<div style={{ fontSize: '12px', color: '#cb6464' }}>
								{handleError({ error: errors?.document_type })}
							</div>
						) : null}
					</div>

					<div>
						<UploadController
							control={control}
							name="upload_document"
							rules={{
								required:
								{
									value   : true,
									message : 'File is required',
								},
							}}
						/>

						{errors?.upload_document ? (
							<div style={{ fontSize: '12px', color: '#cb6464' }}>
								{handleError({ error: errors?.upload_document })}
							</div>
						) : null}
					</div>

					{['superadmin', 'admin'].includes(activeStakeholder)
					&& shipment_data?.consignee_shipper_id
					&& formValues.upload_document ? (
						<div style={{ marginTop: '16px' }}>
							<span style={{ fontWeight: '700' }}>Choose organization</span>

							<RadioGroupController
								options={getConsigneeShipperId(shipment_data)}
								control={control}
								name="organizations"
								onChange={(val) => setOrgId(val)}
								value={orgId}
								rules={{
									required:
									{
										value   : true,
										message : 'organization is required',
									},
								}}
							/>

							{errors?.organizations ? (
								<div style={{ fontSize: '12px', color: '#cb6464' }}>
									{handleError({ error: errors?.organizations })}
								</div>
							) : null}
						</div>
						) : null}
				</div>
			) : null}
		</div>
	);
}

export default UploadDocument;
