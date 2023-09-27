/* eslint-disable max-len */
import { dynamic } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateEmployeeSignedDocuments from '../../hooks/useCreateEmployeeSignedDocuments';
import useUpdateEmployeeDeatils from '../../hooks/useUpdateEmployeeDetails';

import getColumns from './getColumns';

const BodyTextEditor = dynamic(() => import('../../Day1Download/BodyTextEditor'), { ssr: true });

// eslint-disable-next-line custom-eslint/variable-name-check
let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

const SOURCE = 'save';

const useReleaseDocuments = ({
	profileData,
	getEmployeeDetails,
}) => {
	const profile = useSelector((state) => state.profile);
	const defaultEditorValue = RichTextEditor?.createValueFromString((profile?.additional_clause?.[profileData?.detail?.id] || ''), 'html');

	const [editorValue, setEditorValue] = useState(defaultEditorValue || RichTextEditor.createEmptyValue());
	const [selectedItems, setSelectedItems] = useState([]);
	const [additionalClause, setAdditionalClause] = useState('');

	const { detail, signed_documents, signed_documents_names } = profileData || {};
	const { id, employee_status, share_company_policies } = detail || {};
	const [companyPolicyValue, setCompanyPolicyValue] = useState(share_company_policies);
	const signedDocumentList = (signed_documents_names || []).map((name) => ({ name }));

	const { createEmployeeSignedDocumentsStatus, btnloading } = useCreateEmployeeSignedDocuments(
		{ id, selectedItems, setSelectedItems, getEmployeeDetails },
	);

	const { updateEmployeeStatus, btnloading: loading } = useUpdateEmployeeDeatils({
		id,
		employee_status,
		companyPolicyValue,
		getEmployeeDetails,
		SOURCE,
	});

	const signedDocumentsList = (signed_documents || []).map((item) => item.name);

	const handleCheckboxChange = (item, event) => {
		if (event === true) {
			setSelectedItems((prev) => [...prev, item]);
		} else {
			const prevSelectedItems = selectedItems.filter((selectedItem) => selectedItem.name !== item.name);
			setSelectedItems(prevSelectedItems);
		}
	};

	const showSaveButton = !isEmpty(selectedItems || []);

	const columns = getColumns({
		showSaveButton,
		btnloading,
		createEmployeeSignedDocumentsStatus,
		handleCheckboxChange,
		signedDocumentsList,
		setAdditionalClause,
	});

	return {
		columns,
		signedDocumentList,
		setCompanyPolicyValue,
		companyPolicyValue,
		share_company_policies,
		loading,
		updateEmployeeStatus,
		additionalClause,
		setAdditionalClause,
		BodyTextEditor,
		editorValue,
		setEditorValue,
		RichTextEditor,
	};
};

export default useReleaseDocuments;
