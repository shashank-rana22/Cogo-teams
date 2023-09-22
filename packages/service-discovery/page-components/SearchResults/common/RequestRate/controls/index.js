import getAirCustomsFeedbackControls from './air-customs-feedback-controls';
import getAirFeedbackControls from './air-feedback-controls';
import getFclCfsFeedbackControls from './fcl-cfs-feedback-controls';
import getFclCustomsFeedbackControls from './fcl-customs-feedback-controls';
import getFclFeedbackControls from './fcl-feedback-controls';
import getFclLocalFeedbackControls from './fcl-local-feedback-controls';
import getFtlFeedbackControls from './ftl-feedback-controls';
import getHaulageFeedbackControls from './haulage-feedback-controls';
import getLclCustomsFeedbackControls from './lcl-customs-feedback-controls';
import getLclFeedbackControls from './lcl-feedback-controls';
import getLtlFeedbackControls from './ltl-feedback-controls';
import getSubsidiaryFeedbackControls from './subsidiary-feedback-controls';
import getTrailerFeedbackControls from './trailer-feedback-controls';

const CONTROLS_MAPPING = {
	fcl_freight       : getFclFeedbackControls,
	lcl_freight       : getLclFeedbackControls,
	air_freight       : getAirFeedbackControls,
	ftl_freight       : getFtlFeedbackControls,
	ltl_freight       : getLtlFeedbackControls,
	haulage_freight   : getHaulageFeedbackControls,
	trailer_freight   : getTrailerFeedbackControls,
	fcl_customs       : getFclCustomsFeedbackControls,
	lcl_customs       : getLclCustomsFeedbackControls,
	air_customs       : getAirCustomsFeedbackControls,
	fcl_cfs           : getFclCfsFeedbackControls,
	fcl_freight_local : getFclLocalFeedbackControls,
	subsidiary        : getSubsidiaryFeedbackControls,
};

const getControls = ({
	service = 'fcl_freight',
	rates_excludes_ids = [],
	airlineOptions = [],
}) => {
	const controlProps = {
		rates_excludes_ids,
		airlineOptions,
	};

	const getControlsFunction = CONTROLS_MAPPING[service];

	return getControlsFunction?.(controlProps) || [];
};

export default getControls;
