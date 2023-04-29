import { Button, Modal } from '@cogoport/components';

import CONFIGURATION_OPTIONS from '../../../../constants/configurations-options-mapping';
import useListAllocationPreferences from '../../../../hooks/useListAllocationPreferences';
import useUpdateAllocationPreferences from '../../../../hooks/useUpdateAllocationPreferences';

import PreferencesData from './PreferencesData';

function UpdatePreferences({ item = {}, setShow = () => {}, listRefetch = () => {} }) {
	const {
		list, listLoading, paginationData, getNextPage,
	} = useListAllocationPreferences({ item });

	const {
		radioValue,
		setRadioValue,
		loadingUpdatePreferences,
		onUpdatePreferences,
	} = useUpdateAllocationPreferences({ item, setShow, listRefetch });

	return (
		<>
			<Modal.Header title="Update Preferences" />

			<Modal.Body>
				<PreferencesData
					list={list}
					listLoading={listLoading}
					paginationData={paginationData}
					getNextPage={getNextPage}
					CONFIGURATION_OPTIONS={CONFIGURATION_OPTIONS}
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
					Update
				</Button>
			</Modal.Footer>
		</>
	);
}

export default UpdatePreferences;
