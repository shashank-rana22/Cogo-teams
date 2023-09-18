import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload, IcMDownload } from '@cogoport/icons-react';
import { useState } from 'react';

import Layout from '../../../common/Layout';
import useCreateRatesheet from '../../../hooks/useCreateRatesheet';

import controls from './controls';
import styles from './styles.module.css';

function UploadRatesheet({ refetch = () => {} }) {
	const [show, setShow] = useState(false);

	const { control, formState:{ errors = {} } = {}, handleSubmit } = useForm();

	const { apiTrigger = () => {}, loading } = useCreateRatesheet({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const onSubmit = (values) => apiTrigger(values);

	const downloadSample = () => {
		window.open(GLOBAL_CONSTANTS.sample_ratesheet_url.sample_file_url, '_blank');
	};

	return (
		<div>
			<div className={styles.button_section}>
				<Button
					size="lg"
					themeType="primary"
					onClick={() => setShow(true)}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					UPLOAD RATE SHEET

				</Button>
			</div>

			{show ? (
				<Modal onClose={() => setShow(false)} show={show} placement="top" size="lg">
					<Modal.Header title="UPLOAD RATE SHEET" />
					<Modal.Body>
						<div className={styles.sample_download}>
							<IcMDownload
								color="#ee3425"
								onClick={() => downloadSample()}
								className="icon"
							/>
							<Button className={styles.text_button} onClick={() => downloadSample()}>DOWNLOAD</Button>
							Sample Rate Sheet
						</div>

						<Layout
							controls={controls}
							errors={errors}
							control={control}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 8 }}
							disabled={loading}
							onClick={() => setShow(false)}
						>
							Cancel
						</Button>

						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={loading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default UploadRatesheet;
