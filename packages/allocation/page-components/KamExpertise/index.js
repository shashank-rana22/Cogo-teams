import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

function KamExpertise() {
	const router = useRouter();

	return (
		<Button
			onClick={() => router.push('/allocation/kam-expertise/view-badges')}
			themeType="primary"
		>
			View Badges
		</Button>
	);
}

export default KamExpertise;
