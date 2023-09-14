import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getConfigurationOptions from '../../../../constants/configurations-options-mapping';
import useListAllocationPreferences from '../../../../hooks/useListAllocationPreferences';
import useUpdateAllocationPreferences from '../../../../hooks/useUpdateAllocationPreferences';

import PreferencesData from './PreferencesData';

function UpdatePreferences({ item = {}, setShow = () => {}, listRefetch = () => {} }) {
	const { t } = useTranslation(['allocation']);

	const {
		list, listLoading, paginationData, getNextPage,
	} = useListAllocationPreferences({ item });

	const configurationOptions = getConfigurationOptions({ t });

	const {
		radioValue,
		setRadioValue,
		loadingUpdatePreferences,
		onUpdatePreferences,
	} = useUpdateAllocationPreferences({ item, setShow, listRefetch, t });

	return (
		<>
			<Modal.Header title={t('allocation:update_preferences')} />

			<Modal.Body>
				<PreferencesData
					list={list}
					listLoading={listLoading}
					paginationData={paginationData}
					getNextPage={getNextPage}
					CONFIGURATION_OPTIONS={configurationOptions}
					radioValue={radioValue}
					setRadioValue={setRadioValue}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={!radioValue || loadingUpdatePreferences}
					onClick={onUpdatePreferences}
				>
					{t('allocation:update_button')}
				</Button>
			</Modal.Footer>
		</>
	);
}

export default UpdatePreferences;
