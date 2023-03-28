import { Button, Modal, MultiSelect } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
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
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
		thirdParty = [],
		setThirdParty = () => {},
		onChangeThirdParty = () => {},
	} = useCreateBulkEnrichment({ setActiveTab, selectedBulkData });

	const thirdPartySelector = useGetAsyncOptions({
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_partner_users',
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
				// role_ids : ['38d20d88-e987-4b65-a9ad-c41dd134845b'],
			},
		},
	});

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
						Please select the Data Enrichment Agent(s) to send the enrichment request for the
						{' '}
						{checkedRowsId.length || 'these'}
						{' '}
						selected feedback(s):
						{/* <MultiSelect
							value={thirdParty}
							onChange={setThirdParty}
							placeholder="Select 3rd Party Organisation(s)"
							options={thirdPartyOptions}
							isClearable
							className={styles.modal_select}
						/> */}
						<MultiSelect
							placeholder="Select 3rd Party Agent(s)"
							className={styles.modal_select}
							value={thirdParty}
							// onChange={(val) => onChangeThirdParty(val)}
							onChange={setThirdParty}
							getSelectedOption={(obj) => onChangeThirdParty(obj)}
							isClearable
							{...thirdPartySelector}
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
