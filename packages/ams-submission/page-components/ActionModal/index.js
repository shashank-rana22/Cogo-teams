import { Modal, Button } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getContentMapping from '../../configurations/get-content-mapping';

import styles from './styles.module.css';

function ActionModal({
	modalData = {},
	setModalData = () => {},
	lmsApiTrigger = () => {},
	lmsLoading = false,
}) {
	const { t } = useTranslation(['amsSubmission']);
	const contentMapping = getContentMapping({ t });

	const handleClick = () => {
		const { data = {}, type = '' } = modalData || {};
		if (type === 'submit_lms_data') {
			const { master_airway_bill_number = '', airportId = '', airlineId = '' } = data || {};
			const payload = {
				masterAirwayBillNumber: master_airway_bill_number,
				airportId,
				airlineId,
			};
			lmsApiTrigger({ payload, setModalData });
		}
	};

	return (
		<div className={styles.container}>
			<Modal
				className={styles.modal_container}
				show={!isEmpty(modalData?.data)}
			>
				<IcCError width={40} height={50} />
				<div className={styles.content}>
					{contentMapping[modalData?.type]}
				</div>
				<div className={styles.button_container}>
					<Button
						themeType="secondary"
						disabled={lmsLoading}
						onClick={() => setModalData({})}
					>
						{t('amsSubmission:button_cancel')}

					</Button>
					<Button
						disabled={lmsLoading}
						onClick={handleClick}
					>
						{t('amsSubmission:button_confirm')}

					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default ActionModal;
