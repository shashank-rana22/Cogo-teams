import { Button } from '@cogoport/components';

interface StateInterface {
	state: React.Dispatch<React.SetStateAction<boolean>>
}
function ViewButton({ state }:StateInterface) {
	return 	(
		<Button
			themeType="secondary"
			onClick={() => {
				state(true);
			}}
		>
			View
		</Button>
	);
}
export default ViewButton;
