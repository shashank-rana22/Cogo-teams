import { Toast } from '@cogoport/components';

function Draft({ setMode = () => {}, setShowModal = () => {}, setSelectedVersion = () => {} }) {
	setSelectedVersion('saved-draft');
	setShowModal(false);
	setMode('initial-mode');
	Toast.success('New Draft Loaded');
}

export default Draft;
