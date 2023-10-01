import EnrichmentRequestModal from './EnrichmentRequestModal';
import PushToCrm from './PushToCrm';

function ActionModal(props) {
	const { showModal, setShowRequestModal, ...rest } = props;

	const onCloseModal = () => setShowRequestModal('');

	if (showModal === 'enrichment') {
		return (
			<EnrichmentRequestModal
				showRequest={showModal === 'enrichment'}
				onCloseModal={onCloseModal}
				{...rest}
			/>
		);
	}

	if (showModal === 'ingestion') {
		return (
			<PushToCrm
				showRequest={showModal === 'ingestion'}
				onCloseModal={onCloseModal}
				{...rest}
			/>
		);
	}

	return null;
}

export default ActionModal;
