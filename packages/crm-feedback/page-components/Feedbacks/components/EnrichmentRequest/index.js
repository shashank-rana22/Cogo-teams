import { Button, Modal, MultiSelect } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useCreateBulkEnrichment from '../../../hooks/useCreateBulkEnrichment';

import styles from './styles.module.css';

function EnrichmentRequest({
	checkedRowsId = [],
	setActiveTab = () => {},
	selectedBulkData = [],
	onBulkDataPayload = () => {},
}) {
	const {
		onEnrichmentRequest,
		// loading,
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
		thirdParty = [],
		setThirdParty = () => {},
		thirdPartyOptions = [{}],
	} = useCreateBulkEnrichment({ setActiveTab, selectedBulkData });

	return (
		<>
			<Button
				size="lg"
				themeType="primary"
				className={styles.button}
				onClick={() => {
					setisOpenModal(true);
					onBulkDataPayload();
				}}
				disabled={isEmpty(checkedRowsId)}
			>
				Create Enrichment Request
			</Button>

			{isOpenModal ? (
				<Modal
					show={isOpenModal}
					size="md"
					closeOnOuterClick={false}
					onClose={onCloseModal}
					className={styles.modal_container}
					placement="top"
				>
					<Modal.Header title="Create Enrichment Request" />

					<Modal.Body className={styles.modal_body}>
						Please select the Data Enrichment Organisation(s) to send the enrichment request for the
						{' '}
						{checkedRowsId.length || 'these'}
						{' '}
						selected feedback(s):
						<MultiSelect
							value={thirdParty}
							onChange={setThirdParty}
							placeholder="Select 3rd Party Organisation(s)"
							options={thirdPartyOptions}
							isClearable
							className={styles.modal_select}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button
							type="submit"
							size="md"
							themeType="secondary"
							onClick={onCloseModal}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							size="md"
							themeType="primary"
							className={styles.submit_button}
							// disabled={loading}
							onClick={onEnrichmentRequest}
						>
							Send Request
						</Button>
					</Modal.Footer>

				</Modal>
			) : (
				null
			)}

		</>

	);
}
export default EnrichmentRequest;
