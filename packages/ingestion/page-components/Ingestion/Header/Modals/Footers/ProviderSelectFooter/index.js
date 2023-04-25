import { Button } from '@cogoport/components';

export function ProviderSelectFooter(props) {
	const { setShow = () => {} } = props;

	return 	(
		<Button
			themeType="secondary"
			onClick={() => setShow((pv) => ({
				...pv,
				screen: 'chooseModal',
			}))}
		>
			Back
		</Button>
	);
}
