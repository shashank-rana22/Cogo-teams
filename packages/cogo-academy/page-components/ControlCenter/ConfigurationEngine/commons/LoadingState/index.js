import { Placeholder } from '@cogoport/components';

function LoadingState() {
	return [...Array(4)].map(() => (
		<Placeholder height="50px" width="100%" margin="0px 0px 20px 0px" />));
}

export default LoadingState;
