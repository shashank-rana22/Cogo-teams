import { Button, Modal, MultiSelect, Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useEditEnrichment from '../../hooks/useEditEnrichment';

import styles from './styles.module.css';

function EditEnrichment({ checkedRow = '' }) {
	const {
		orgList = [],
		onEditEnrichmentRequest = () => {},
		// loading,
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
		thirdParty = [],
		setThirdParty = () => {},
		thirdPartyOptions = [{}],
	} = useEditEnrichment({ checkedRow });

	return (
		<>
			<Button
				size="lg"
				themeType="primary"
				className={styles.button}
				onClick={() => setisOpenModal(true)}
				disabled={isEmpty(checkedRow)}
			>
				Edit Enrichment Request
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
					<Modal.Header title="Edit Enrichment Request" />

					<Modal.Body className={styles.modal_body}>
						Select the additional data enrichment organisations to assign the feedback request:
						<div className={styles.modal_info}>
							Selected Organizations
							<span className={styles.modal_pills}>
								{orgList.map((org) => (
									<Pill size="md" color="#F7FAEF">
										{' '}
										{org}
										{' '}
									</Pill>
								))}
							</span>

						</div>
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
							onClick={onEditEnrichmentRequest}
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
export default EditEnrichment;
