import { RadioGroup } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

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
	selectedFile,
	setSelectedFile,
	control,
	orgId,
	setOrgId,
}) {
	const Documents = document_data?.list?.map((e) => (
		{ label: startCase(e?.document_type), value: e?.document_type })) || [];

	return (
		<div>
			{!loading ? (
				<div className={styles.conatiner}>
					<div className={styles.select_container}>
						<SelectController
							size="sm"
							control={control}
							placeholder="Select Document..."
							name="document_type"
							options={Documents}
							rules={{ required: { value: true, message: 'Document is Required' } }}
						/>
					</div>
					<div>
						<FileUploader
							value={selectedFile}
							onChange={setSelectedFile}
							showProgress
							draggable
							multiple
						/>
					</div>
					{['Superadmin', 'Admin'].includes(activeStakeholder) && shipment_data?.consignee_shipper_id
					&& selectedFile.length ? (
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
