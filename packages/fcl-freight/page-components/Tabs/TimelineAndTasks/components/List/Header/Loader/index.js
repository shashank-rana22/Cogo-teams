import { SkeletonV1 } from '@cogoport/front/components';

const Loader = () => {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<SkeletonV1 />
				</div>

				<div style={{ display: 'flex' }}>
					<SkeletonV1 />
					<SkeletonV1 />
				</div>
			</div>
		</>
	);
};

export default Loader;
