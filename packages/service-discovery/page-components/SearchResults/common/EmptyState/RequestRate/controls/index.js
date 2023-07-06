import fclFeedbackControls from './fcl-feedback-controls';

const CONTROLS_MAPPING = {
	fcl_freight : fclFeedbackControls,
	lcl_freight : fclFeedbackControls,
	air_freight : fclFeedbackControls,
	ftl_freight : fclFeedbackControls,
	ltl_freight : fclFeedbackControls,
};
const getControls = (service) => CONTROLS_MAPPING[service] || [];

export default getControls;
