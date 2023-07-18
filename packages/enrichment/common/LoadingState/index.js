import { Placeholder } from '@cogoport/components';

const ARRAY_LENGTH = 5;

function LoadingState({ height = '50px', arrayLength = ARRAY_LENGTH }) {
	return [...Array(arrayLength).keys()].map((index) => (
		<Placeholder key={index} height={height} width="100%" margin="0px 0px 20px 0px" />));
}

export default LoadingState;
