import { useForm } from '@cogoport/forms';

const useGetFields = ({
	data = [],
	containerDetails = [],
}) => {
	const options = containerDetails.map((obj) => ({
		label : obj.container_number,
		value : `${obj.container_number}:${obj.id}`,
	}));

	const mutatedFields = [];

	(data || []).forEach((bl) => {
		const obj = {
			bl_number : bl?.bl_number,
			bl_id     : bl?.id,
			options,
		};
		mutatedFields.push(obj);
	});

	const defaultValues = {
		bl_mappings: mutatedFields.map((field) => ({
			bl_number : field.bl_number,
			bl_id     : field.bl_id,
		})),
	};

	const { control, formState: { errors }, register, handleSubmit } = useForm({ defaultValues });

	return {
		control,
		errors,
		register,
		handleSubmit,
		mutatedFields,
	};
};

export default useGetFields;
