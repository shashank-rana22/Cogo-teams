import { Modal, Button } from '@cogoport/components';

import Form from '../../../../commons/Form';
import useCreateDynamicPage from '../../../../hooks/useCreateDynamicPage';

function CreateDndPage(props) {
	const { setShowCreatePage, refetch } = props;

	const {
		loading,
		controls,
		formProps,
		onSubmit,
		handleSubmit,
	} = useCreateDynamicPage({ setShowCreatePage, refetch });

	return (
		<>
			<Modal.Header title="Create Page" />

			<Modal.Body>
				<Form
					formProps={formProps}
					controls={controls}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					disabled={loading}
					style={{ marginRight: '12px' }}
					onClick={() => setShowCreatePage(false)}
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					type="submit"
					onClick={handleSubmit(onSubmit)}
					themeType="primary"
				>
					Create
				</Button>
			</Modal.Footer>
		</>
	);
}

export default CreateDndPage;
