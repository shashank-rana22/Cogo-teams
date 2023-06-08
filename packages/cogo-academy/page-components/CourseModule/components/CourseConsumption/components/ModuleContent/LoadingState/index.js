import { Placeholder } from '@cogoport/components';
import { Image } from '@cogoport/next';

function LoadingState() {
	return (
		<Placeholder height="400px" width="100%" margin="0px 0px 20px 80px">
			<Image
				width={60}
				height={60}
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/PlaceholderMedia.svg"
				alt="loading_media.png"
			/>
		</Placeholder>
	);
}

export default LoadingState;
