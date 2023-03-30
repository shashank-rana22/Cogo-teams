import getAlphabets from '../../../utils/getAlphabets';

const alphabets = getAlphabets('A', 'Z');

const getCorrectAnswersCombined = ({ correctOptions }) => (correctOptions || []).map(
	(item) => `${alphabets[item.sequence_number]}) ${item.answer_text}`,
);

export default getCorrectAnswersCombined;
