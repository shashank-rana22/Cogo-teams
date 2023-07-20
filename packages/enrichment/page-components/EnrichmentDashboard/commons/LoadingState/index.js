import { Placeholder } from '@cogoport/components';

const ARRAY_LENGTH = 5;

function LoadingState() {
	return [...Array(ARRAY_LENGTH).keys()].map((index) => (
		<Placeholder key={index} height="50px" width="100%" margin="0px 0px 20px 0px" />));
}

export default LoadingState;
