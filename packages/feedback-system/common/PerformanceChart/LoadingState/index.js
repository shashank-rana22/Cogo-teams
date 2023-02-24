import { Placeholder } from '@cogoport/components';

function LoadingState() {
	return (
		<div style={{ margin: '16px', display: 'flex', flexDirection: 'row' }}>

			<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
				<Placeholder margin="0 0 16px" width="80%" height="80px" />
				<Placeholder margin="0 0 16px" width="80%" height="80px" />
			</div>
		</div>
	);
}

export default LoadingState;
