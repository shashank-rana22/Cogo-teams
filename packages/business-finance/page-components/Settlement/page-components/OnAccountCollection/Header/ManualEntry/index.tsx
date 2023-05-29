import { Button, Modal } from '@cogoport/components';

import useCreateManualEntry from '../../../../hooks/useCreateManualEntry';
import { UploadFileInterface } from '../../interface';

import CreateRequest from './CreateRequest';
import styles from './styles.module.css';

function ManualEntry({ showModal, setShowModal, refetch, isEdit, selectedItem, show, itemData }:UploadFileInterface) {
	const onClose = () => setShowModal({ manual_entry: false });
	const {
		controls,
		control,
		formProps,
		errors,
		onError,
		createManualEntry,
		loading,
		disable_controls,
		exRate,
		handleSubmit,
		showBprNumber,
	} = useCreateManualEntry({
		onClose,
		isEdit,
		selectedItem,
		refetch,
		show,
		itemData,
	});
	return (
		<div>
			<Modal
				show={showModal.manual_entry}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal({ manual_entry: false })}
			>
				<Modal.Header title="Manual Entry" />

				<Modal.Body>
					{(showBprNumber || itemData?.sageOrganizationId) && (
						<div className={styles.bpr_value}>
							BPR:
							{' '}
							{isEdit
								? itemData?.sageOrganizationId || ''
								: showBprNumber?.sage_organization_id || ''}
						</div>
					)}
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
					>
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						onClick={handleSubmit(createManualEntry, onError)}
					>
						Submit
					</Button>
				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default ManualEntry;
