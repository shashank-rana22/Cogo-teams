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

const BACK_PAGE_MAPPING = {
	organization : 'chooseModal',
	partner      : 'providerSelect',
	lead         : 'providerSelect',
};

export function OrgDetailsFooter(props) {
	const { setShow = () => {}, uploadData = {}, formProps = {} } = props;
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
						screen: BACK_PAGE_MAPPING[uploadData?.ingestion_type],
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
						screen: 'orgDetails',
					}));
				}}
			>
				Back
			</Button>
			<Button loading={loading} onClick={handleSubmit(onSubmit)}>Submit</Button>
		</>
	);
}
