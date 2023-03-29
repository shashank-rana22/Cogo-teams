import { Select, Button, Modal } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import { isEmpty } from '@cogoport/utils';

import useCreateBulkEnrichment from '../../hooks/useCreateBulkEnrichment';

import styles from './styles.module.css';

function EnrichmentRequest({
	checkedRowsId = [],
	setActiveTab = () => {},
	selectedBulkData = [],
	onBulkDataPayload = () => {},
}) {
	const {
		onEnrichmentRequest,
		loading,
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
		thirdParty = [],
		setThirdParty = () => {},
		setThirdPartyPayload = () => {},
	} = useCreateBulkEnrichment({ setActiveTab, selectedBulkData });

	const thirdPartyOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status   : 'active',
				role_ids : ['38d20d88-e987-4b65-a9ad-c41dd134845b'],
			},
		},
	});

	const handleChange = (id) => {
		const { options } = thirdPartyOptions;

		const selectedOption = options.filter((option) => option.id === id);

		const { user_id, partner_id } = selectedOption[0] || {};

		setThirdPartyPayload(
			[{ user_id, partner_id }],
		);

		setThirdParty(id);
	};

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
					<Select
						className={styles.modal_select}
						placeholder="Select 3rd Party Agent(s)"
						value={thirdParty}
						onChange={handleChange}
						isClearable
						{...thirdPartyOptions}
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
						disabled={isEmpty(thirdParty) || loading}
						onClick={onEnrichmentRequest}
					>
						Send Request
					</Button>
				</Modal.Footer>
			</Modal>
		</>

	);
}
export default EnrichmentRequest;
