import DeleteRule from '../components/Dashboard/SegmentControl/DeleteRule';

const renderModals = ({
	operationType = '',
}) => {
	switch (operationType) {
		case 'add': {
			return (
				<div>ADD RULE</div>
			);
		}
		case 'edit': {
			return (
				<div>EDIT RULE</div>
			);
		}
		case 'deactivate': {
			return (
				<DeleteRule />
			);
		}
		default:
			return null;
	}
};
export default renderModals;
