import { Button } from '@cogoport/components';

function OptionPopoverContent() {
	return (
		<div>
			<Button
				themeType="secondary"
				style={{ marginBottom: '4px', minWidth: '145px' }}
			>
				EDIT PREFERENCES
			</Button>
			<Button
				themeType="secondary"
				style={{ minWidth: '145px' }}
			>
				SEE PROFILE
			</Button>
		</div>
	);
}
export default OptionPopoverContent;
