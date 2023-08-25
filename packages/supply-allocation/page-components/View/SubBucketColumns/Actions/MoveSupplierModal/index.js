import { Button, Modal } from '@cogoport/components';
import { InputNumberController, SelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateFclFreightAllocation from '../../../../../hooks/useUpdateFclFreightAllocation';

import styles from './styles.module.css';

const LENGTH_TO_PREFILL = 1;

function MoveSupplierModal({
	showMoveSupplierModal = false,
	setShowMoveSupplierModal = () => {},
	item = {},
	bucketOptions = [],
	bucket_type = '',
	current_allocated_containers = '',
	rollingFclFreightSearchId = '',
}) {
	const { control, handleSubmit } = useForm({});

	const { service_provider = {} } = item || {};
	const { id: service_provider_id, short_name = '' } = service_provider || {};

	const { updateFclFreightAllocation, loading } = useUpdateFclFreightAllocation();

	const onClickSubmit = (values) => {
		const payload = {
			service_provider_id,
			bucket_type,
			rolling_fcl_freight_search_id: rollingFclFreightSearchId,
			...values,
		};
		updateFclFreightAllocation({ payload });
	};

	return (
		<Modal
			size="md"
			show={showMoveSupplierModal}
			onClose={() => setShowMoveSupplierModal(false)}
			placement="top"
			className={styles.modal_container}
		>
			<Modal.Header title={short_name} />

			<Modal.Body>
				<div className={styles.container}>
					<div>
						<div>
							Current Bucket :
							<div style={{ height: '32px' }}>{startCase(bucket_type)}</div>
						</div>

						<div>
							Current Promised:
							<div style={{ height: '32px' }}>
								{current_allocated_containers}
							</div>
						</div>
					</div>

					<div style={{ alignItems: 'center', display: 'flex' }}>
						Move To
						<IcMArrowNext style={{ marginLeft: '4px' }} />
					</div>

					<div>
						<div> New Bucket </div>
						<SelectController
							name="new_bucket_type"
							isClearable
							label="Select Origin SeaPort"
							control={control}
							placeholder="Select Below"
							size="sm"
							options={bucketOptions}
							{...(bucketOptions.length === LENGTH_TO_PREFILL
								? { value: bucketOptions[GLOBAL_CONSTANTS.zeroth_index].value } : {})}
						/>

						<div>New Promised</div>
						<InputNumberController
							name="promised_containers"
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
						No
					</Button>

					<Button
						type="button"
						className={styles.extend_button}
						loading={loading}
						onClick={handleSubmit(onClickSubmit)}
					>
						Yes
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default MoveSupplierModal;
