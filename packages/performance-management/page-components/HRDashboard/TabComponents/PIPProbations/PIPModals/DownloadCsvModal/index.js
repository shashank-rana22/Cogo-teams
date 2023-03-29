import { Toast, Button, Modal } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function DownloadCsvModal({ modal = '', setModal = () => {} }) {
	const [{ loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_download_log_csv',
		method : 'get',
	}, { manual: true });

	const downloadLogCSV = async (type) => {
		try {
			const response = await trigger({ data: { LogType: type } });
			// eslint-disable-next-line no-undef
			if (response?.data.url) { window.open(response?.data.url); }
		} catch (e) {
			Toast.error(e.response?.data.error.toString());
		}
	};

	return (
		<Modal show={modal === 'download'} onClose={() => setModal('')}>
			<Modal.Header title="Download PIP/Probations CSV" />
			<Modal.Body>
				<div>
					<div className={styles.download_info}>
						<p style={{ padding: '8px' }}>Which CSV do you want to download?</p>
						<div className={styles.pip_select}>
							{(['probation', 'pip']).map((downloadType) => (
								<Button
									key={downloadType}
									size="xl"
									className={styles.pip_select_btn}
									themeType="secondary"
									onClick={() => downloadLogCSV(downloadType)}
									style={{ width: '140px' }}
								>
									{startCase(downloadType)}
								</Button>
							))}
						</div>
					</div>

					<div className={styles.close}>
						<Button
							themeType="secondary"
							onClick={() => setModal('')}
							style={{ marginRight: '8px' }}
							loading={loading}
						>
							Close
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DownloadCsvModal;
