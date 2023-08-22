import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const C = 100;
const DEF = GLOBAL_CONSTANTS.zeroth_index;
const SUB = 20;
const ANO_SUB = 10;

function GetOrdinalNumber({ number = 0 }) {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % C;
	const ordinal =		suffix[(quotient - SUB) % ANO_SUB] || suffix[quotient] || suffix[DEF];
	return (
		<>
			<span className="black">{number}</span>
			<sup>{ordinal}</sup>
		</>
	);
}

export default GetOrdinalNumber;
