import { Toast } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState, useMemo, useEffect } from 'react';

import useUpdateTest from '../../../../hooks/useUpdateTest';

function useHandleReviewAndCriteria({ guidelines = [] }) {
	const router = useRouter();

	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const { control, formState: { errors }, handleSubmit, setValue, getValues, watch } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'guidelines',
	});

	const { updateTest } = useUpdateTest();

	const onNavigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	const checkError = useMemo(() => {
		if (error) {
			Toast.error('Total questions and cases cannot be 0');
		} else {
			setShowModal(true);
		}
	}, [error]);

	useEffect(() => {
		setValue('guidelines', guidelines?.map((guideline) => ({ instruction: guideline })));
	}, [guidelines, setValue]);

	return {
		checkError,
		onNavigate,
		updateTest,
		errors,
		handleSubmit,
		getValues,
		watch,
		fields,
		append,
		remove,
		setError,
		showModal,
		control,
		setShowModal,
		setValue,
	};
}

export default useHandleReviewAndCriteria;
