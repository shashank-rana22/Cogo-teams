import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RadioGroupIN from './CancellationMapping/RadioGroupIN';
import TextAreaVN from './CancellationMapping/TextAreaVN';

type Item = {
	entityCode?: string;
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

	const RADIO_GROUP = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('radio_mapping');

	const TEXT_AREA = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode]?.feature_supported?.includes('text_mapping');

	return (
		<div>
			{ RADIO_GROUP
			&& (
				<RadioGroupIN
					itemData={itemData}
					showCancellationModal={showCancellationModal}
					setShowCancellationModal={setShowCancellationModal}
					refetch={refetch}
					entityCode={entityCode}
				/>
			)}
			{ TEXT_AREA
			&& (
				<TextAreaVN
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
