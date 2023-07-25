import { Placeholder } from '@cogoport/components';

const LoadingState = ({ loadingRows = 3 }) => (
	[...Array(loadingRows).keys()].map((item) => (
		<Placeholder
			key={item}
			height="40px"
			margin="12px 0"
		/>
	))
);

export default LoadingState;
