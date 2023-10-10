import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

function OptionPopoverContent({ item = {} }) {
	const router = useRouter();
	const { business_name = '', id = '' } = item || {};
	const { partner_id } = router?.query || {};
	const redirectUrl = `${window.location.origin}/${partner_id}/details/demand/${id}`;
	return (
		<div>
			<Button
				themeType="secondary"
				style={{ marginBottom: '4px', minWidth: '145px' }}
				onClick={() => {
					router.push(
						`/marketing/communication-control/[company_id]?org_name=${business_name}`,
						`/marketing/communication-control/${id}?org_name=${business_name}`,
					);
				}}
			>
				EDIT PREFERENCES
			</Button>
			<Button
				themeType="secondary"
				style={{ minWidth: '145px' }}
				onClick={() => {
					window.location.replace(redirectUrl);
				}}
			>
				SEE PROFILE
			</Button>
		</div>
	);
}
export default OptionPopoverContent;
