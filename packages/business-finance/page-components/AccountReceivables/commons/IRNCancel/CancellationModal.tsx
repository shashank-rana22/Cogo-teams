import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';

import CancelEinvoice from './CancellationMapping/CancelEinvoice';
import CancelIrn from './CancellationMapping/CancelIrn';

type Item = {
	entityCode?: number;
};
interface CancelModal {
	itemData?: Item;
	showCancellationModal?: boolean;
	setShowCancellationModal?: Function;
	irnLabel?: string;
	refetch?: Function;
}

function CancellationModal({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	irnLabel,
	refetch,
}: CancelModal) {
	const { entityCode } = itemData || {};

	const CANCEL_IRN = ENTITY_FEATURE_MAPPING[entityCode]?.feature_supported?.includes('cancel_irn');

	const CANCEL_EINVOICE =	 ENTITY_FEATURE_MAPPING[entityCode]
		?.feature_supported?.includes('cancel_e_invoice');

	return (
		<div>
			{ CANCEL_IRN
			&& (
				<CancelIrn
					itemData={itemData}
					showCancellationModal={showCancellationModal}
					setShowCancellationModal={setShowCancellationModal}
					refetch={refetch}
					entityCode={entityCode}
				/>
			)}
			{ CANCEL_EINVOICE
			&& (
				<CancelEinvoice
					itemData={itemData}
					showCancellationModal={showCancellationModal}
					setShowCancellationModal={setShowCancellationModal}
					irnLabel={irnLabel}
					refetch={refetch}
					entityCode={entityCode}
				/>
			)}
		</div>
	);
}
export default CancellationModal;
