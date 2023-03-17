import { Toast } from '@cogoport/components';

function Draft({ setMode = () => {}, setShowModal = () => {} }) {
	setShowModal(false);
	setMode('');
	Toast.success('New Draft Loaded');
}

export default Draft;
