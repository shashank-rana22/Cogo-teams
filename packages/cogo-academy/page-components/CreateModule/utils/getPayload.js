import getCaseStudyPayload from './getCaseStudyPayload';
import getStandAlonePayload from './getStandAlonePayload';
import getSubjectivePayload from './getSubjectivePayload';

const payloadMapping = {
	stand_alone : getStandAlonePayload,
	case_study  : getCaseStudyPayload,
	subjective  : getSubjectivePayload,
};

function getPayload({
	type,
	editType,
	caseStudyQuestionId,
	index,
	subjectiveEditorValue,
	uploadable,
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
		subjective: {
			subjectiveEditorValue,
			uploadable,
			...commonProps,
		},
	};

	const getPayloadFunRef = payloadMapping[type];
	const payloadArg = payloadPropsMapping[type];

	return getPayloadFunRef(payloadArg);
}

export default getPayload;
