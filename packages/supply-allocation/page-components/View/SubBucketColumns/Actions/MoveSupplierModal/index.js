import { Button, Modal } from '@cogoport/components';
import { InputController, SelectController, useForm } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateRollingForecastFclFreightAllocation from '../../../../../hooks/useUpdateRollingForecastFclFreightAllocation';

import styles from './styles.module.css';

function MoveSupplierModal({
	showMoveSupplierModal = false,
	setShowMoveSupplierModal = () => { },
	item = {},
	bucketOptions = [],
	bucket_type = '', current_allocated_containers = '',
}) {
	const { control, handleSubmit } = useForm({});

	const { updateRollingForecastFclFreightAllocation, loading } = useUpdateRollingForecastFclFreightAllocation();
	const onClickSubmit = (values) => { console.log('ff', values); };
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
							<div style={{ height: '32px' }}>
								{startCase(bucket_type)}
								{' '}
							</div>
						</div>

						<div>
							Current Promised:
							<div style={{ height: '32px' }}>
								{ current_allocated_containers}
								{' '}
							</div>
						</div>
					</div>

					<div style={{ alignItems: 'center', display: 'flex' }}>
						Move To
						{' '}
						<IcMArrowNext style={{ marginLeft: '4px' }} />
					</div>

					<div>
						<div> New Bucket </div>
						<SelectController
							name="new_bucket"
							isClearable
							label="Select Origin SeaPort"
							control={control}
							placeholder="Select Below"
							size="sm"
							options={bucketOptions}
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
						onClick={handleSubmit(onClickSubmit)}
					>
						Yes, Change
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default MoveSupplierModal;
