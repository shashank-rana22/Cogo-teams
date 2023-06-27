import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import CancelEinvoice from './CancellationMapping/CancelEinvoice';
import CancelIrn from './CancellationMapping/CancelIrn';

type Item = {
	entityCode?: number;
};
interface CancelModal {
	itemData?: Item;
	showCancellationModal?: boolean;
	setShowCancellationModal?: Function;
	IRNLabel?: string;
	refetch?: Function;
}

function CancellationModal({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	IRNLabel,
	refetch,
}: CancelModal) {
	const { entityCode } = itemData || {};

	const CANCEL_IRN = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('cancel_irn');

	const CANCEL_EINVOICE =	 GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]
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
					IRNLabel={IRNLabel}
					refetch={refetch}
					entityCode={entityCode}
				/>
			)}
		</div>
	);
}
export default CancellationModal;
