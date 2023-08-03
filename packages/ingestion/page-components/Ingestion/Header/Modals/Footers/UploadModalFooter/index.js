import { Button } from '@cogoport/components';

export function UploadModalFooter(props) {
	const { loading = false, formProps = {}, setShow = () => {}, onSubmit = () => {} } = props;
	const { handleSubmit } = formProps;

	return (
		<>
			<Button
				themeType="secondary"
				style={{ marginRight: '8px' }}
				onClick={() => {
					setShow((pv) => ({
						...pv,
						activeMode: 'orgDetails',
					}));
				}}
			>
				Back
			</Button>
			<Button loading={loading} onClick={handleSubmit(onSubmit)}>Submit</Button>
		</>
	);
}
