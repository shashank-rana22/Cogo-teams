import { Button } from '@cogoport/components';

export function ChooseFooter(props) {
	const { setShow = () => {} } = props;
	return (
		<Button
			themeType="secondary"
			onClick={() => {
				setShow((pv) => ({
					...pv,
					open: false,
				}));
			}}
		>
			Close
		</Button>
	);
}
