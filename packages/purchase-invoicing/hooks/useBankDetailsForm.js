import { Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useGetBankDetails from './useGetBankDetails';
import useSaveDocument from './useSaveDocument';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
const useBankDetailsDocumentForm = (props) => {
	const { source } = props;
	const { loading, saveDocument } = useSaveDocument(props);

	const formProps = useForm();

	const { fields, watch, setValues } = formProps;

	const { bankDetailsLoading, onBlurIfscControl } = useGetBankDetails({
		setValues,
	});

	const ifscCode = watch('ifsc_number');

	const newFields = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'ifsc_number') {
			newField = {
				...newField,
				onBlur: () => onBlurIfscControl({ code: ifscCode }),
				...(bankDetailsLoading && {
					suffix: (
						<Placeholder />
					),
				}),
			};
		}

		newFields[controlName] = newField;
	});

	const onSubmit = (values) => {
		const {
			image_url,
			organization_trade_party_id = '',
			...restValues
		} = values;

		const newValues = {
			name          : 'BankDetails',
			document_type : 'bank_account_details',
			image_url     : image_url?.finalUrl,
			data          : restValues,
			organization_trade_party_id,
			source,
		};

		saveDocument({
			values: newValues,
		});
	};

	return {
		loading,
		formProps: {
			...formProps,
			fields: newFields,
		},
		errors: formProps.formState.errors,
		onSubmit,
	};
};

export default useBankDetailsDocumentForm;
