import { Placeholder } from '@cogoport/components';

const LOADING_ROWS = 3;

function LoadingState() {
	return (
		<div>
			<Placeholder height="60px" margin="16px 0px" />

			{[...Array(LOADING_ROWS).keys()].map((item) => (
				<Placeholder
					key={item}
					height="40px"
					margin="12px 0"
				/>
			))}
		</div>
	);
}

export default LoadingState;
