import { Button } from '@cogoport/components';

export function OrgDetailsFooter(props) {
	const { setShow = () => {}, formProps = {} } = props;
	const { handleSubmit } = formProps;
	const onOrgSubmit = () => {
		setShow((pv) => ({
			...pv,
			screen: 'uploadModal',
		}));
	};
	return (
		<>
			<Button
				themeType="secondary"
				style={{ marginRight: '8px' }}
				onClick={() => {
					setShow((pv) => ({
						...pv,
						screen: 'providerSelect',
					}));
				}}
			>
				Back

			</Button>
			<Button onClick={handleSubmit(onOrgSubmit)}>
				Next

			</Button>
		</>

	);
}
