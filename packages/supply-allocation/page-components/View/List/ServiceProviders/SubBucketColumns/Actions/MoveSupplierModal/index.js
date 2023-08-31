import { Button, Modal } from '@cogoport/components';
import { InputNumberController, SelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateFclFreightAllocation from '../../../../../../../hooks/useUpdateFclFreightAllocation';

import styles from './styles.module.css';

const LENGTH_TO_PREFILL = 1;

const WARNING_SUB_TEXT = 'You are about to move a supplier to a new bucket.'
	+ ' This will affect the general allocation decided for each bucket.';

const POSSIBLE_BUCKETS = ['strategic', 'tactical', 'hopeful'];

function Header({ short_name = '' }) {
	return (
		<>
			<div style={{ fontSize: '18px' }}>
				Move Service Provider :
				{' '}
				{ short_name}
			</div>
			<div style={{ fontSize: '12px', color: '#ee3425' }}>{ WARNING_SUB_TEXT}</div>
		</>
	);
}

function MoveSupplierModal({
	showMoveSupplierModal = false,
	setShowMoveSupplierModal = () => {},
	item = {},
	bucket_type = '',
	current_allocated_containers = '',
	rollingFclFreightSearchId = '',
	refetchBucketsData = () => { },
	refetchServiceProvidersData = () => {},
}) {
	const { control, handleSubmit } = useForm({});

	const { service_provider = {} } = item || {};
	const { id: service_provider_id, short_name = '' } = service_provider || {};

	const { updateFclFreightAllocation, loading } = useUpdateFclFreightAllocation({
		refetchBucketsData,
		setShowMoveSupplierModal,
		refetchServiceProvidersData,
	});

	const onClickSubmit = (values) => {
		const payload = {
			service_provider_id,
			bucket_type,
			rolling_fcl_freight_search_id: rollingFclFreightSearchId,
			...values,
		};
		updateFclFreightAllocation({ payload });
	};

	const bucketOptions = POSSIBLE_BUCKETS.reduce((acc, bucket) => {
		if (bucket === bucket_type) return acc;
		return [...acc, { value: bucket, label: startCase(bucket) }];
	}, []);

	return (
		<Modal
			size="lg"
			show={showMoveSupplierModal}
			onClose={() => setShowMoveSupplierModal(false)}
		>
			<Modal.Header title={<Header short_name={short_name} />} />

			<Modal.Body>
				<div className={styles.container}>
					<div>
						<div style={{ marginBottom: '20px' }}>
							Current Bucket :
							<div style={{ height: '32px' }}>{startCase(bucket_type)}</div>
						</div>

						<div>
							Current Promised:
							<div style={{ height: '32px' }}>
								{current_allocated_containers}
								{' '}
								TEU
							</div>
						</div>
					</div>

					<div style={{ alignItems: 'center', display: 'flex' }}>
						Move To
						<IcMArrowNext style={{ marginLeft: '4px' }} />
					</div>

					<div>
						<div style={{ marginBottom: '20px' }}>
							<div> New Bucket </div>
							<SelectController
								name="new_bucket_type"
								isClearable
								control={control}
								placeholder="Select Below"
								size="sm"
								options={bucketOptions}
								{...(bucketOptions.length === LENGTH_TO_PREFILL
									? { value: bucketOptions[GLOBAL_CONSTANTS.zeroth_index].value } : {})}
							/>
						</div>

						<div>
							<div>New Promised</div>
							<InputNumberController
								name="promised_containers"
								isClearable
								size="sm"
								control={control}
								arrow={false}
								suffix={<span style={{ paddingRight: '8px' }}>TEU</span>}
								placeholder="Type Here"
								value={current_allocated_containers}
							/>
						</div>
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
						Cancel
					</Button>

					<Button
						type="button"
						themeType="accent"
						className={styles.extend_button}
						loading={loading}
						onClick={handleSubmit(onClickSubmit)}
					>
						Confirm
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default MoveSupplierModal;
