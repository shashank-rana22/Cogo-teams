import { Placeholder } from '@cogoport/components';

function LoadingState() {
	return (
		<div>
			{[...Array(7).keys()].map((key) => (
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
