import { Button, Modal, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import { OPTIONS } from '../../configurations/bulk-create-feedback-options';
import useCreateBulkEnrichmentRequests from '../../hooks/useCreateBulkEnrichmentRequests';

import styles from './styles.module.css';

function CreateBulkFeedbackRequest({ refetch = () => {}, refetchStats = () => {} }) {
	const {
		onCreateFeedback,
		showModal,
		setShowModal,
		loading = false,
		selectedCount,
		onCloseModal,
		setSelectedCount,
		thirdParty,
		setThirdParty,
		setThirdPartyPayload = () => {},
	} = useCreateBulkEnrichmentRequests({ refetch, refetchStats });

	const geo = getGeoConstants();

	const thirdPartyOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status   : 'active',
				role_ids : geo.uuid.third_party_enrichment_agencies_role_ids,
			},
		},
	});

	const handleChange = (id) => {
		const { options } = thirdPartyOptions;

		const selectedOption = options.filter((option) => option.id === id);

		const { user_id, partner_id } = selectedOption[GLOBAL_CONSTANTS.zeroth_index] || {};

		setThirdPartyPayload({ user_id, partner_id });

		setThirdParty(id);
	};

	return (
		<>
			<Button
				size="lg"
				type="button"
				themeType="primary"
				className={styles.button}
				onClick={() => setShowModal(true)}
			>
				Assign Accounts
			</Button>

			<Modal
				show={showModal}
				size="md"
				closeOnOuterClick={false}
				onClose={onCloseModal}
				placement="top"
			>
				<Modal.Header title="Assign Accounts" />

				<Modal.Body className={styles.modal_body}>

					<div className={styles.control}>
						Select Agent for Enrichment
						<Select
							className={styles.modal_select}
							placeholder="Select 3rd Party Agent"
							value={thirdParty}
							onChange={handleChange}
							isClearable
							{...thirdPartyOptions}
						/>
					</div>

					<div className={styles.control}>

						Number of Accounts

						<Select
							className={styles.modal_select}
							placeholder="Choose the number of accounts."
							value={selectedCount}
							onChange={(val) => setSelectedCount(val)}
							isClearable
							options={OPTIONS}
						/>
					</div>

				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						size="md"
						themeType="secondary"
						onClick={() => onCloseModal()}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						type="button"
						size="md"
						themeType="primary"
						className={styles.submit_button}
						disabled={isEmpty(selectedCount) || loading}
						onClick={onCreateFeedback}
					>
						Assign
					</Button>
				</Modal.Footer>

			</Modal>

		</>
	);
}

export default CreateBulkFeedbackRequest;
