import { Button } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';

import styles from './styles.module.css';
import { stylesTHC } from './stylesTHC';

function GenerateManifestDoc({
	taskItem, formData, setTriggerManifest,
}) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
		method : 'POST',
	});

	const handleView = async () => {
		const html = `<html><head><style>${stylesTHC}</style></head><body>${
			document.getElementById('manifest').innerHTML
		}</body></html>`;

		await trigger({
			data: {
				html,
				configs: {
					landscape : false,
					format    : 'A4',
					scale     : 1,
				},
			},
		}).then(() => {
			setTriggerManifest(false);
		});
	};

	return (
		<div>
			<Button
				className="primary md"
				onClick={() => {
					handleView();
				}}
				disabled={loading}
			>
				Download
			</Button>
			<div
				className={styles.container}
				id="manifest"
				style={{
					flex       : '1',
					width      : '100%',
					height     : '100%',
					padding    : '12px 12px',
					opacity    : 1,
					background : '#fff',
				}}
			>
				<div className="flex_column">
					<div className="manifest_heading">CARGO MANIFEST</div>
					<div style={{ margin: '12px 40px' }}>
						<div className="flex_row">
							<div className="shipper">
								<p className="shipper_head">SHIPPER:</p>
								<p className="shipper_info">
									{formData.shipperName}
									<br />
									{formData.shipperAddress}
								</p>
							</div>
							<div className="extra_space" />
						</div>
						<div className="flex_row">
							<div className="consignee font_style">
								<p className="consignee_head">CONSIGNEE:</p>
								<p className="consignee_info">
									{formData.consigneeName}
									<br />
									{formData.consigneeAddress}
								</p>
							</div>
							<div className="extra_space" />
						</div>
						<table>
							<tr>
								<td className="font_style">
									MAWB:
									{' '}
									{taskItem.awbNumber}
								</td>
								<td className="font_style">
									DESTINATION:
									{' '}
									{taskItem.destination}
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
						<tr style={{ fontSize: '11px' }}>
							<td>HAWB NO</td>
							<td>PKGS</td>
							<td>GROSS WEIGHT</td>
							<td>COMMODITY</td>
							<td>SHIPPER</td>
							<td>CONSIGNEE</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
}

export default GenerateManifestDoc;
