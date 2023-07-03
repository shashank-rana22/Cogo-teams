import airFeedBackControls from './air/feedback';
import fclFeedBackControls from './fcl/feedback';
import ftlFeedBackControls from './ftl/feedback';
import haulageFreightFeedBackControls from './haulage-freight/feedback';
import lclFeedBackControls from './lcl/feedback';
import ltlFeedBackControls from './ltl/feedback';
import trailerFreightFeedBackControls from './trailer/feedback';

export const FEEBACK_CONTROLS_MAPPING = {
	fcl_freight     : fclFeedBackControls,
	lcl_freight     : lclFeedBackControls,
	air_freight     : airFeedBackControls,
	ftl_freight     : ftlFeedBackControls,
	ltl_freight     : ltlFeedBackControls,
	haulage_freight : haulageFreightFeedBackControls,
	trailer_freight : trailerFreightFeedBackControls,
	// fcl_customs     : fclFeedBackControls,
	// lcl_customs     : fclFeedBackControls,
	// air_customs     : fclFeedBackControls,

};

const getFeedbackConfig = (service = 'fcl_freight') => FEEBACK_CONTROLS_MAPPING[service] || [];

export default getFeedbackConfig;
