import { Button, Loader } from '@cogoport/components';
import { useEffect } from 'react';

import useCreateManifest from '../../hooks/useCreateManifest';
import useDownloadManifest from '../../hooks/useDownloadManifest';
import useGetManifest from '../../hooks/useGetManifest';

import styles from './styles.module.css';
import { stylesTHC } from './stylesTHC';

interface NestedObj {
	[key: string]: string;
}

function GenerateManifestDoc({ setTriggerManifest, shipmentId }) {
	const { data, getManifest, loading:manifestLoading } = useGetManifest();
	const { createManifest, loading:createManifestLoading } = useCreateManifest();

	let mawbData:NestedObj = {};
	const hawbData = [];

	(data.list || []).forEach((item) => {
		if (item.documentType === 'draft_airway_bill') {
			mawbData = {
				...item.documentData,
				uploadedByOrgId : item?.uploadedByOrgId,
				serviceId       : item?.serviceId,
			};
		} else {
			hawbData.push(item);
		}
	});

	const handleSave = (url) => {
		const payload = {
			shipmentId,
			uploadedByOrgId : mawbData?.uploadedByOrgId,
			serviceId       : mawbData?.serviceId,
			documentUrl     : url || undefined,
			documentType    : 'manifest_copy',
			fileName:
			`Manifest_${new Date().getTime()}`,
		};
		createManifest(payload, setTriggerManifest);
	};

	const { handleView, loading } = useDownloadManifest(stylesTHC, handleSave, mawbData.document_number);

	useEffect(() => {
		getManifest(shipmentId);
	}, [getManifest, shipmentId]);

	return (
		manifestLoading ? <div style={{ textAlign: 'center' }}><Loader /></div> : (
			<div>
				<Button
					className="primary md"
					onClick={() => {
						handleView();
					}}
					disabled={loading || createManifestLoading}
					style={{ marginLeft: 'auto' }}
				>
					Download
				</Button>
				<div
					className={styles.container}
					id="manifest"
				>
					<div className="flex_column">
						<div className="manifest_heading">CARGO MANIFEST</div>
						<div style={{ margin: '12px 40px' }}>
							<div className="flex_row">
								<div className="shipper">
									<p className="shipper_head">SHIPPER:</p>
									<p className="shipper_info">
										{mawbData.shipperName || '-'}
										<br />
										{mawbData.shipperAddress || '-'}
									</p>
								</div>
								<div className="extra_space" />
							</div>
							<div className="flex_row">
								<div className="consignee font_style">
									<p className="consignee_head">CONSIGNEE:</p>
									<p className="consignee_info">
										{mawbData.consigneeName || '-'}
										<br />
										{mawbData.consigneeAddress || '-'}
									</p>
								</div>
								<div className="extra_space" />
							</div>
							<table>
								<tr>
									<td className="font_style">
										MAWB:
										{' '}
										{mawbData.document_number || '-'}
									</td>
									<td className="font_style">
										DESTINATION:
										{' '}
										{mawbData.destinationPortCode || '-'}
									</td>
								</tr>
							</table>
						</div>
						<table>
							<tr className="font_style">
								<th>HAWB NO</th>
								<th>PKGS</th>
								<th>GROSS WEIGHT</th>
								<th>COMMODITY</th>
								<th>SHIPPER</th>
								<th>CONSIGNEE</th>
							</tr>
							{hawbData.map((item) => {
								const {
									document_number:documentNumber,
									totalPackagesCount,
									weight,
									commodity,
									shipperName,
									shipperAddress,
									consigneeName,
									consigneeAddress,
									destinationPortCode,
								} = item.documentData || {};

								return (
									<tr key={`${documentNumber}-${destinationPortCode}`} className="data_font_style">
										<td>{documentNumber || '-'}</td>
										<td>{totalPackagesCount || '-'}</td>
										<td>{weight || '-'}</td>
										<td>{commodity || '-'}</td>
										<td>
											{shipperName || '-'}
											<br />
											{shipperAddress || '-'}
										</td>
										<td>
											{consigneeName || '-'}
											<br />
											{consigneeAddress || '-'}
										</td>
									</tr>
								);
							})}
						</table>
					</div>
				</div>
			</div>
		)
	);
}

export default GenerateManifestDoc;
