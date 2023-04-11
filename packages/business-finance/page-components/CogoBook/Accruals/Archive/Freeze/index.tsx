import { Button, Modal, Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

interface FreezeInterface {
	item?:{ period?:Date, periodName?:string, isLocked?:boolean }
	refetch?:Function
}

function Freeze({ item, refetch }:FreezeInterface) {
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const { period, periodName, isLocked } = item || {};

	const [
		{ loading:freezeTriggerLoading },
		freezeTrigger,
	] = useRequestBf(
		{
			url     : 'pnl/accrual/freeze-period',
			method  : 'put',
			authKey : 'put_pnl_accrual_freeze_period',
		},
		{ manual: true },
	);

	const freeze = async () => {
		try {
			const resp = await freezeTrigger({
				data: {
					period: format(period, 'yyyy-MM-dd'),
					periodName,
				},
			});
			if (resp?.error?.message) {
				Toast.info(resp?.error?.message);
				return;
			}
			Toast.success('Freezed Successfully');
			setShowConfirmationModal(false);
			refetch();
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};
	const showModal = () => {
		setShowConfirmationModal(true);
	};
	return 	(
		<>
			{showConfirmationModal && (
				<Modal
					show={showConfirmationModal}
					onClose={() => setShowConfirmationModal(false)}
				>
					<Modal.Body>
						<div>
							<div className={styles.sub_container}>
								<div>
									<h4>Are you sure you want to Freeze?</h4>
								</div>
								<div>
									<div className={styles.flex}>
										<Button
											themeType="secondary"
											style={{ marginRight: '16px' }}
											disabled={freezeTriggerLoading}
											onClick={() => setShowConfirmationModal(false)}
										>
											Cancel
										</Button>
										<Button disabled={freezeTriggerLoading} onClick={freeze}>
											Confirm
										</Button>
									</div>
								</div>
							</div>
						</div>

					</Modal.Body>

				</Modal>
			)}
			{!isLocked
				? (
					<div className={styles.container}>
						<Button onClick={showModal}>
							Freeze
						</Button>
					</div>
				) :		(
					<div className={styles.container}>
						<Button disabled themeType="secondary">
							Freezed
						</Button>
					</div>
				)}

		</>
	);
}
export default Freeze;
