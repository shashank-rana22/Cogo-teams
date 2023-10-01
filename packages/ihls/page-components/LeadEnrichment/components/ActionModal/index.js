import EnrichmentRequestModal from './EnrichmentRequestModal';
import PustToCrm from './PushToCrm';

function ActionModal(props) {
	const { showModal, ...rest } = props;

	if (showModal === 'enrichment') {
		return (
			<EnrichmentRequestModal
				showRequest={showModal === 'enrichment'}
				{...rest}
			/>
		);
	}

	if (showModal === 'ingestion') {
		return (
			<PustToCrm
				showRequest={showModal === 'ingestion'}
				{...rest}
			/>
		);
	}

	return null;
}

export default ActionModal;
