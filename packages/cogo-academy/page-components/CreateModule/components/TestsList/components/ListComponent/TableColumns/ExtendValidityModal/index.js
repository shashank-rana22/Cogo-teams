import { Button, Modal, Datepicker, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function ExtendValidityModal({
	showExtendValidityModal,
	setShowExtendValidityModal,
	validity_start,
	validity_end,
	id,
	fetchList,
}) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test',
	}, { manual: true });

	const [dateRange, setDateRange] = useState({
		validity_start,
		validity_end,
	});

	const handleSubmitValidity = async () => {
		try {
			await trigger({ data: { ...dateRange, id } });

			setShowExtendValidityModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return (
		<Modal
			size="sm"
			show={showExtendValidityModal}
			onClose={() => setShowExtendValidityModal(false)}
			placement="top"
			showCloseIcon={false}
			className={styles.modal_container}
		>
			<Modal.Header title="Extend Validity" />

			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.date_container}>
						<div className={styles.text}>Extend Validity: </div>

						<div style={{ display: 'flex' }}>
							<Datepicker
								showTimeSelect
								value={new Date(format(dateRange?.validity_start))}
								maxDate={new Date(format(dateRange?.validity_end))}
								isPreviousDaysAllowed
								onChange={(val) => setDateRange((prev) => ({ ...prev, validity_start: val }))}
								date
							/>

							<Datepicker
								showTimeSelect
								value={new Date(format(dateRange?.validity_end))}
								isPreviousDaysAllowed
								onChange={(val) => setDateRange((prev) => ({ ...prev, validity_end: val }))}
							/>
						</div>
					</div>

					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setShowExtendValidityModal(false)}
							disabled={loading}
						>
							Cancel
						</Button>

						<Button
							type="button"
							className={styles.extend_button}
							onClick={() => handleSubmitValidity()}
							loading={loading}
						>
							Extend
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ExtendValidityModal;
