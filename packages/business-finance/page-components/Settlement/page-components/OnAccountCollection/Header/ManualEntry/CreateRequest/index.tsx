import Layout from '../../../../../../commons/Layout';
import useCreateManualEntry from '../../../../../hooks/useCreateManualEntry';

interface CreateRequestInterface {
	onClose?: () => void
	show?:boolean
	isEdit?:boolean
	refetch?:() => void
	selectedItem?:any
}
function CreateRequest({
	show,
	onClose,
	isEdit = false,
	selectedItem = {},
	refetch,
}:CreateRequestInterface) {
	const {
		controls,
		control,
		formProps,
		errors,
		onError,
		createManualEntry,
		loading,
		disable_controls,
		exRate,
		handleSubmit,
		isVenderExists,
	} = useCreateManualEntry({
		onClose,
		isEdit,
		selectedItem,
		refetch,
		show,
	});
	const { fields } = formProps || {};

	return (
		<div>
			<Layout
				control={control}
				fields={controls}
				errors={errors}
			/>
		</div>
	);
}
export default CreateRequest;
