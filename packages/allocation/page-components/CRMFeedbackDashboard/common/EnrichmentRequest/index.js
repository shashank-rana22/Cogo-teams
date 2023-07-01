import { Select, Button, Modal } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import useCreateBulkEnrichment from '../../hooks/useCreateBulkEnrichment';

import styles from './styles.module.css';

function EnrichmentRequest({
	checkedRowsId = [],
	setActiveTab = () => {},
}) {
	const {
		onEnrichmentRequest = () => {},
		loading = false,
		isOpenModal = false,
		setisOpenModal = () => {},
		onCloseModal = () => {},
		thirdParty = '',
		setThirdParty = () => {},
		setThirdPartyPayload = () => {},
	} = useCreateBulkEnrichment({ setActiveTab, checkedRowsId });

	const thirdPartyOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status   : 'active',
				role_ids : GLOBAL_CONSTANTS.uuid.third_party_enrichment_agencies_role_ids,
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
				placement="top"
			>
				<Modal.Header title="Create Enrichment Request" />

				<Modal.Body className={styles.modal_body}>
					Please select the Data Enrichment Agent(s) to send the enrichment request for the
					{' '}
					{checkedRowsId.length || 'these'}
					{' '}
					selected feedback(s):
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
						type="button"
						size="md"
						themeType="secondary"
						onClick={onCloseModal}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						type="button"
						size="md"
						themeType="primary"
						className={styles.submit_button}
						disabled={isEmpty(thirdParty) || loading}
						onClick={onEnrichmentRequest}
						loading={loading}
					>
						Send Request
					</Button>
				</Modal.Footer>
			</Modal>
		</>

	);
}
export default EnrichmentRequest;
