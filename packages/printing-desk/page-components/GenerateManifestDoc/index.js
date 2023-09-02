import { Button, Loader } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import useCreateManifest from '../../hooks/useCreateManifest';
import useDownloadManifest from '../../hooks/useDownloadManifest';
import useGetManifest from '../../hooks/useGetManifest';

import styles from './styles.module.css';
import { stylesTHC } from './stylesTHC';

function GenerateManifestDoc({ setTriggerManifest, shipmentId }) {
	const { t } = useTranslation(['printingDesk']);
	const { data, getManifest, loading:manifestLoading } = useGetManifest();
	const { createManifest, loading:createManifestLoading } = useCreateManifest();

	let mawbData = {};
	const HAWB_DATA = [];

	(data.list || []).forEach((item) => {
		if (item.documentType === 'draft_airway_bill') {
			mawbData = {
				...item.documentData,
				uploadedByOrgId : item?.uploadedByOrgId,
				serviceId       : item?.serviceId,
			};
		} else {
			HAWB_DATA.push(item);
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

	const { handleView, loading } = useDownloadManifest(stylesTHC, handleSave, mawbData?.document_number);

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
					{t('printingDesk:generate_manifest_doc_download_button_text')}
				</Button>
				<div
					className={styles.container}
					id="manifest"
				>
					<div className="flex_column">
						<div className="manifest_heading">
							{t('printingDesk:generate_manifest_doc_heading_cargo_manifest')}
						</div>
						<div style={{ margin: '12px 40px' }}>
							<div className="flex_row">
								<div className="shipper">
									<p className="shipper_head">
										{t('printingDesk:generate_manifest_doc_shipper_header')}
									</p>
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
									<p className="consignee_head">
										{t('printingDesk:generate_manifest_doc_consignee_header')}
									</p>
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
										{t('printingDesk:generate_manifest_doc_mawb_header')}
										{' '}
										{mawbData.document_number || '-'}
									</td>
									<td className="font_style">
										{t('printingDesk:generate_manifest_doc_destination_header')}
										{' '}
										{mawbData.destinationPortCode || '-'}
									</td>
								</tr>
							</table>
						</div>
						<table>
							<tr className="font_style">
								<th>{t('printingDesk:generate_manifest_doc_table_hawb_number_label')}</th>
								<th>{t('printingDesk:generate_manifest_doc_table_pkgs_label')}</th>
								<th>{t('printingDesk:generate_manifest_doc_table_gross_weight_label')}</th>
								<th>{t('printingDesk:generate_manifest_doc_table_commodity_label')}</th>
								<th>{t('printingDesk:generate_manifest_doc_table_shipper_label')}</th>
								<th>{t('printingDesk:generate_manifest_doc_table_consignee_label')}</th>
							</tr>
							{HAWB_DATA.map((item) => {
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
