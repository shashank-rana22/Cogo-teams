import SuggestionModal from './SuggestionModal';
import WarningModal from './WarningModal';

function AdditionalModals({
	show = '', // suggestion,warning
	setShow = () => {},
	setActiveTab = () => {},
	handleApply = () => {},
	handleSubmit = () => {},
}) {
	const MODAL_MAPPING = {
		suggestion: {
			component : SuggestionModal,
			props     : {
				show,
				setShow,
				setActiveTab,
			},
		},
		warning: {
			component : WarningModal,
			props     : {
				show,
				setShow,
				handleSubmit,
				handleApply,
			},
		},
	};
	const { component: ActiveModal, props = {} } = MODAL_MAPPING[show] || {};

	if (!ActiveModal) return null;

	return (
		<ActiveModal {...props} />
	);
}

export default AdditionalModals;
