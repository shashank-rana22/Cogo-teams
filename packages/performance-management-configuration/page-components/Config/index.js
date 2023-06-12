import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

function Config() {
	const router = useRouter();

	return (
		<div>
			<Button themeType="tertiary" onClick={() => router.back()}>
				<IcMArrowBack />
				Back
			</Button>
		</div>
	);
}

export default Config;
