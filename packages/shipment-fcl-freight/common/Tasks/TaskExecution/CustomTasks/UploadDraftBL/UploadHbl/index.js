import { Button } from '@cogoport/components';
import { useState, useEffect, useRef } from 'react';

import Form from '../form';

import controls from './controls';
import styles from './styles.module.css';

function UploadHbl(props) {
	const { docs, bls_count, summary, data, refetchDocs } = props || {};

	const formRefs = useRef();
	const [urls, setUrls] = useState([]);

	useEffect(() => {
		const newUrls = [];
		docs?.forEach((item, i) => {
			newUrls[i] = `${item?.document_url}`;
		});
		setUrls(newUrls);
	}, [docs]);

	return (
		<div>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<div className={styles.flex_container}>
						{urls?.[i]?.length > 0 ? (
							<Button
								onClick={() => {
									window.open(urls[i], '_blank');
								}}
								size="sm"
								id={`bm_pt_bl_upload_view_bl_${i + 1}`}
							>
								View HBL
								&nbsp;
								{i + 1}
							</Button>
						) : (
							<Form
								ref={(r) => {
									formRefs.current[i] = r;
								}}
								id={i}
								url={urls[i]}
								bl_type="HBL"
								controls={controls}
								{...props}
							/>
						)}
					</div>
				))}
			{bls_count > urls?.length && (
				<Button
					// disabled={createShipmentDocAPI?.loading}
					// onClick={handleSubmit}
					size="sm"
					id="bm_pt_bl_upload_hbl_submit"
				>
					Submit
				</Button>
			)}
		</div>
	);
}
export default UploadHbl;
