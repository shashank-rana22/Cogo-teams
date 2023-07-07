import airCustomsFeedbackControls from './air-customs-feedback-controls';
import airFeedbackControls from './air-feedback-controls';
import fclCfsFeedbackControls from './fcl-cfs-feedback-controls';
import fclCustomsFeedbackControls from './fcl-customs-feedback-controls';
import fclFeedbackControls from './fcl-feedback-controls';
import fclLocalFeedbackControls from './fcl-local-feedback-controls';
import ftlFeedbackControls from './ftl-feedback-controls';
import haulageFeedbackControls from './haulage-feedback-controls';
import lclCustomsFeedbackControls from './lcl-customs-feedback-controls';
import lclFeedbackControls from './lcl-feedback-controls';
import ltlFeedbackControls from './ltl-feedback-controls';
import trailerFeedbackControls from './trailer-feedback-controls';

const CONTROLS_MAPPING = {
	fcl_freight       : fclFeedbackControls,
	lcl_freight       : lclFeedbackControls,
	air_freight       : airFeedbackControls,
	ftl_freight       : ftlFeedbackControls,
	ltl_freight       : ltlFeedbackControls,
	haulage_freight   : haulageFeedbackControls,
	trailer_freight   : trailerFeedbackControls,
	fcl_customs       : fclCustomsFeedbackControls,
	lcl_customs       : lclCustomsFeedbackControls,
	air_customs       : airCustomsFeedbackControls,
	fcl_cfs           : fclCfsFeedbackControls,
	fcl_freight_local : fclLocalFeedbackControls,
};

const getControls = (service) => CONTROLS_MAPPING[service] || [];

export default getControls;
