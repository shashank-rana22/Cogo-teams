import { Button, Modal } from '@cogoport/components';

import useCreateManualEntry from '../../../../hooks/useCreateManualEntry';
import { UploadFileInterface } from '../../interface';

import CreateRequest from './CreateRequest';
import styles from './styles.module.css';

function ManualEntry({
	showModal, setShowModal = () => {}, refetch, isEdit, show, setShow = () => {}, selectedItem, itemData,
}:UploadFileInterface) {
	const {
		controls,
		control,
		errors,
		onError,
		createManualEntry,
		handleSubmit,
		showBprNumber,
		loading,
	} = useCreateManualEntry({
		setShowModal,
		isEdit,
		selectedItem,
		refetch,
		itemData,
	});
	const handleCloseModal = () => {
		setShowModal({ manual_entry: false });
		setShow(false);
	};
	return (
		<div>
			<Modal
				show={show || showModal.manual_entry}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => handleCloseModal()}
			>
				<Modal.Header title={(
					<div className={styles.bpr_value}>
						<div>Manual Entry</div>
						{(showBprNumber || itemData?.sageOrganizationId) && (
							<div>
								BPR
								{' '}
								{' '}
								:
								{' '}
								{isEdit
									? itemData?.sageOrganizationId || '---'
									: showBprNumber?.sage_organization_id || '---'}
							</div>
						)}
					</div>

				)}
				/>

				<Modal.Body>
					<CreateRequest
						control={control}
						controls={controls}
						errors={errors}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={() => handleCloseModal()}
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={handleSubmit(createManualEntry, onError)}
						loading={loading}
					>
						Submit
					</Button>
				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default ManualEntry;
