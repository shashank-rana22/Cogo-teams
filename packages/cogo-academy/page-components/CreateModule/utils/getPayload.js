import getCaseStudyPayload from './getCaseStudyPayload';
import getStandAlonePayload from './getStandAlonePayload';

const payloadMapping = {
	stand_alone : getStandAlonePayload,
	case_study  : getCaseStudyPayload,
};

function getPayload({
	type,
	editType,
	caseStudyQuestionId,
	index,
	...commonProps
}) {
	const payloadPropsMapping = {
		stand_alone: {
			...commonProps,
		},
		case_study: {
			editType,
			caseStudyQuestionId,
			index,
			...commonProps,
		},
	};

	const getPayloadFunRef = payloadMapping[type];
	const payloadArg = payloadPropsMapping[type];

	return getPayloadFunRef(payloadArg);
}

export default getPayload;
