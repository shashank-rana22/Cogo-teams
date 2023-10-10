import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

function OptionPopoverContent({ item = {} }) {
	const router = useRouter();
	const { business_name = '', id = '' } = item || {};
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
					router.push(
						'/details/demand/[id]',
						`/details/demand/${id}`,
					);
				}}
			>
				SEE PROFILE
			</Button>
		</div>
	);
}
export default OptionPopoverContent;
