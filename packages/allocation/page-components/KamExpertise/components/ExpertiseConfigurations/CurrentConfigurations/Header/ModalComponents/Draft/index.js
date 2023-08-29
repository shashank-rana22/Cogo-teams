/* eslint-disable custom-eslint/function-name-check */
import { Toast } from '@cogoport/components';

const Draft = (props) => {
	const { setMode = () => {}, setShowModal = () => {}, scrollDraftRef = () => {}, t = () => {} } = props;

	setShowModal(false);
	setMode('initial-mode');
	scrollDraftRef();
	Toast.success(t('allocation:new_draft_loaded_toast'));
};

export default Draft;
