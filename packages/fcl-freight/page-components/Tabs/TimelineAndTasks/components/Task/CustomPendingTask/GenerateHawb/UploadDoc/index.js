import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/front/components/admin';
import controls from './controls';
import { Container, ButtonDiv } from './styles.js';
import useUploadDocument from './useUploadDoc';

const UploadDoc = ({
	task = {},
	shipment_data = {},
	refetch = () => {},
	clearTask,
}) => {
	const {
		fields,
		handleSubmit,
		formState: { errors },
	} = useFormCogo(controls);

	const { uploadDocument, loading } = useUploadDocument({
		task,
		shipment_data,
		refetch,
		clearTask,
	});

	const handleFormSubmit = async (values) => {
		uploadDocument(values);
	};

	return (
		<Container>
			<Layout
				fields={fields}
				controls={controls}
				themeType="admin"
				errors={errors}
			/>
			<ButtonDiv>
				<Button onClick={handleSubmit(handleFormSubmit)} disabled={loading}>
					Submit
				</Button>
			</ButtonDiv>
		</Container>
	);
};

export default UploadDoc;
