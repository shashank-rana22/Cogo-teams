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
		<main>
			{Array(bls_count)
				.fill(null)
				.map((n, i) => (
					<form className={styles.view_and_form}>
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
					</form>
				))}

			<form className={styles.button_wrapper}>
				{bls_count > urls?.length && (
					<Button
					// disabled={createShipmentDocAPI?.loading}
					// onClick={handleSubmit}
						id="bm_pt_bl_upload_hbl_submit"
					>
						Submit
					</Button>
				)}
			</form>
		</main>
	);
}
export default UploadHbl;
