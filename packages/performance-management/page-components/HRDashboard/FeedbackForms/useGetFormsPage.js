import { useState, useEffect } from 'react';

import getFormResubmission from '../../../hooks/useGetFormResubmission';

const useGetFormsPage = () => {
	const [formId, setFormId] = useState('');
	const [openCreateForm, setOpenCreateForm] = useState(false);
	const [refetchedLists, setRefetchedLists] = useState(false);
	const [formStage, setFormStage] = useState('add_questions');
	const [formsParams, setFormsParams] = useState({});

	const { department = '', designation = '' } = formsParams;

	useEffect(() => {
		const newDesignationFormStatus = getFormResubmission(department, designation);
		setFormId('');
		setOpenCreateForm(false);

		const {
			stage: newFormStage = '', department: newFormDepartment = '',
			designation: newFormDesignation = '', bulkDesignations = [],
		} = newDesignationFormStatus;

		if (newFormStage) {
			if (!designation) {
				setFormsParams({
					department       : newFormDepartment || '',
					designation      : newFormDesignation || '',
					bulkDesignations : bulkDesignations || [],
				});
			}
			setOpenCreateForm(true);
			setFormStage(newFormStage);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [designation]);

	return {
		formId,
		setFormId,
		openCreateForm,
		setOpenCreateForm,
		refetchedLists,
		setRefetchedLists,
		formStage,
		setFormStage,
		formsParams,
		setFormsParams,
	};
};
export default useGetFormsPage;
