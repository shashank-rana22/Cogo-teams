import { Placeholder } from '@cogoport/components';

const NUMBER_OF_ROWS = 7;

function LoadingState() {
	return (
		<div>
			{[...Array(NUMBER_OF_ROWS).keys()].map((key) => (
				<Placeholder
					key={key}
					height="40px"
					width="300px"
					margin="0px 0px 20px 0px"
				/>
			))}
		</div>
	);
}

export default LoadingState;
