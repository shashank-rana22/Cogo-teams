import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import Form from '../../../../../../common/Form';
import useUpdateAllocationDetails from '../../../../hooks/useUpdateAllocationDetails';

function UpdateStakeholderDetails({
	stakeholderDetail,
	setStakeholderDetail,
	listRefetch,
}) {
	const { t } = useTranslation(['allocation']);

	const {
		onSave,
		formProps,
		controls,
		loading,
	} = useUpdateAllocationDetails({
		stakeholderDetail,
		setStakeholderDetail,
		listRefetch,
		t,
	});

	const { handleSubmit } = formProps;

	return (
		<Modal
			size="md"
			placement="top"
			show={!isEmpty(stakeholderDetail)}
			closeOnOuterClick
			showCloseIcon
			onClose={() => setStakeholderDetail({})}
		>
			<Modal.Header title={t('allocation:change_stakeholder')} />

			<form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<Form formProps={formProps} controls={controls} />
				</Modal.Body>

				<Modal.Footer>
					<Button
						size="md"
						themeType="primary"
						disabled={loading}
						type="submit"
					>
						{t('allocation:save_button')}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default UpdateStakeholderDetails;
