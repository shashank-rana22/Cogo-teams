import { Toast } from '@cogoport/components';

const Draft = (props) => {
	const { setMode = () => {}, setShowModal = () => {}, scrollDraftRef = () => {} } = props;

	setShowModal(false);
	setMode('initial-mode');
	scrollDraftRef();
	Toast.success('New Draft Loaded');
};

export default Draft;
