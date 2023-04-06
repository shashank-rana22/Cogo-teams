import getCaseStudyPayload from './getCaseStudyPayload';
import getStandAlonePayload from './getStandAlonePayload';

const payloadMapping = {
	stand_alone : getStandAlonePayload,
	case_study  : getCaseStudyPayload,
};

function getPayload({
	values,
	type,
	questionSetId,
	action,
	testQuestionId,
	editType,
	caseStudyQuestionId,
	editDetails,
	index,
}) {
	const payloadPropsMapping = {
		stand_alone: {
			values, action, testQuestionId, questionSetId, editDetails,
		},
		case_study: {
			editType, values, action, caseStudyQuestionId, testQuestionId, questionSetId, editDetails, index,
		},
	};

	const getPayloadFunRef = payloadMapping[type];
	const payloadArg = payloadPropsMapping[type];

	return getPayloadFunRef(payloadArg);
}

export default getPayload;
