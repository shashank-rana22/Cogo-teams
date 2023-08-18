import { Button, Modal } from '@cogoport/components';
import { AsyncSelectController, InputController, useForm } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';

import styles from './styles.module.css';

function MoveSupplierModal({
	showMoveSupplierModal = false,
	setShowMoveSupplierModal = () => { },
	item = {},
}) {
	const [{ loading },
	] = useRequest(
		{
			method : 'POST',
			url    : '/update_supplier',
		},
		{ manual: true },
	);
	const { control } = useForm({});

	return (
		<Modal
			size="md"
			show={showMoveSupplierModal}
			onClose={() => setShowMoveSupplierModal(false)}
			placement="top"
			className={styles.modal_container}
		>
			<Modal.Header title={item?.service_provider?.short_name} />

			<Modal.Body>
				<div className={styles.container}>
					<div>
						<div>
							Current Bucket :
							<div style={{ height: '32px' }}>Alaska </div>
						</div>

						<div>
							Current Promised:
							<div style={{ height: '32px' }}>Alaska </div>
						</div>
					</div>

					<div style={{ alignItems: 'center', display: 'flex' }}>
						Move To
						{' '}
						<IcMArrowNext style={{ marginLeft: '4px' }} />
					</div>

					<div>
						<div> New Bucket </div>
						<AsyncSelectController
							name="new_bucket"
							isClearable
							label="Select Origin SeaPort"
							control={control}
							placeholder="Select Below"
							size="sm"
						/>

						<div>New Promised</div>
						<InputController
							name="new_promised"
							isClearable
							label="Select Origin SeaPort"
							size="sm"
							control={control}
							placeholder="Type Here"
						/>
					</div>

				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						disabled={loading}
						onClick={() => setShowMoveSupplierModal(false)}
					>
						No, Don&apos;t
					</Button>

					<Button
						type="button"
						className={styles.extend_button}
						loading={loading}
					>
						Yes, Change
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default MoveSupplierModal;
