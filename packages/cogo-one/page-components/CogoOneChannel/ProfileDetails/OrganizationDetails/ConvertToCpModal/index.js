import { Button, Modal } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsPartnerUsers } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import React from 'react';

import controls from '../../../../../configurations/convert-to-cp-form-controls';
import useConvertAccountToCp from '../../../../../hooks/useConvertAccountToCp';

import styles from './styles.module.css';

function ConvertToCpModal({
	showConvertModal,
	setShowConvertModal,
	organizationId,
	refetchOrgDetails,
}) {
	const listPartnerUsers = useGetAsyncOptions(
		merge(asyncFieldsPartnerUsers(), {
			params: {
				filters: {
					status               : 'active',
					role_sub_functions   : ['cp_portfolio'],
					partner_entity_types : ['cogoport'],
				},
				rm_mappings_data_required : false,
				partner_data_required     : false,
				pagination_data_required  : false,
			},
			valueKey: 'user_id',
		}),
	);
	const { key_account_manager, portfolio_manager } = controls;
	const {
		loading,
		convertToAccountCp,
		control,
		handleSubmit,
	} = useConvertAccountToCp({ organization_id: organizationId, setShowConvertModal, refetchOrgDetails });
	return (
		<Modal
			show={showConvertModal}
			onClose={() => setShowConvertModal(false)}
		>
			<Modal.Header title="Convert to Channel Partner" />
			<Modal.Body>
				<form className={styles.container} onSubmit={handleSubmit(convertToAccountCp)}>
					<div className={styles.select_label}>Choose Key Account Manager</div>
					<SelectController
						{...key_account_manager}
						{...listPartnerUsers}
						className={styles.select_controller}
						control={control}
						isClearable
					/>
					<div className={styles.select_label}>Choose Portfolio Manager</div>
					<SelectController
						{...portfolio_manager}
						{...listPartnerUsers}
						className={styles.select_controller}
						control={control}
						isClearable
					/>
					<div className={styles.footer_buttons}>
						<Button
							disabled={loading}
							size="md"
							themeType="tertiary"
							onClick={() => setShowConvertModal(false)}
						>
							Cancel
						</Button>
						<Button
							disabled={loading}
							type="submit"
						>
							Convert
						</Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}

export default ConvertToCpModal;
