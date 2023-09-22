import { Select, Button, Modal } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useCreateBulkEnrichment from '../../hooks/useCreateBulkEnrichment';

import styles from './styles.module.css';

function EnrichmentRequest({
	checkedRowsId = [],
	setActiveTab = () => {},
	currentModalName = '',
	onCloseModal = () => {},
	setCurrentModalName = () => {},
}) {
	const { t } = useTranslation(['allocation']);

	const {
		onEnrichmentRequest = () => {},
		loading = false,
		thirdParty = '',
		setThirdParty = () => {},
		setThirdPartyPayload = () => {},
	} = useCreateBulkEnrichment({ setActiveTab, checkedRowsId, t, setCurrentModalName });

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

		setThirdPartyPayload(
			[{ user_id, partner_id }],
		);

		setThirdParty(id);
	};

	return (
		<Modal
			show={!!currentModalName}
			size="md"
			closeOnOuterClick={false}
			onClose={onCloseModal}
			placement="top"
		>
			<Modal.Header title={t('allocation:create_enrichment_request')} />

			<Modal.Body className={styles.modal_body}>
				{t('allocation:create_enrichment_request_phrase')}
				{' '}
				{checkedRowsId.length || 'these'}
				{' '}
				{t('allocation:selected_feedbacks')}
				<Select
					className={styles.modal_select}
					placeholder={t('allocation:select_third_party_agents')}
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
					{t('allocation:cancel_button')}
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
					{t('allocation:send_request')}
				</Button>
			</Modal.Footer>
		</Modal>

	);
}
export default EnrichmentRequest;
