// import { FormLayout } from '@cogo/app-common';
// import { useForm } from '@cogo/deprecated_legacy/forms';
import { Text } from '@cogoport/components';
import React, { useImperativeHandle, forwardRef } from 'react';

function Form(props, ref) {
	const { id, bl_type = '', controls = [] } = props || {};
	// const { fields, getValues } = useForm(controls);
	// const { scope } = useScope();

	// const createShipmentDocAPI = useRequest('post', false, scope)('/create_shipment_document');
	// const handleSubmit = async () => {
	// 	const values = getValues();
	// 	if (!values) {
	// 		cogoToast.error('Fill all values in form');
	// 	} else {
	// 		// call api and check response then refresh the form
	// 		const body = {
	// 			shipment_id        : props?.data?.shipment_id,
	// 			uploaded_by_org_id : props?.data?.organization_id,
	// 			document_type      : 'draft_house_bill_of_lading',
	// 			documents          : [{
	// 				file_name    : values?.url?.name,
	// 				document_url : values?.url?.url,
	// 				data         : {
	// 					description      : values?.description,
	// 					document_number  : values?.document_number,
	// 					containers_count : values?.containers_count,
	// 				},
	// 			}],
	// 		};
	// 		await createShipmentDocAPI.trigger({ data: body });

	// 		props?.handleSubmit();
	// 	}
	// };
	// const submitForm = () => {
	// 	const formValues = getValues();
	// 	if (formValues) {
	// 		return formValues;
	// 	}
	// 	return null;
	// };

	// useImperativeHandle(ref, () => ({ submitForm }));

	return (
		<div style={{ marginBottom: 10 }}>
			<Text size={12} marginBottom={8} bold>
				{bl_type}
				{' '}
				{id + 1}
			</Text>
			{/* <FormLayout
				controls={controls}
				fields={fields}
				themeType="new new-isolated"
				id_prefix="bm_pt_upload_bl"
			/> */}
			{/* <Button onClick={handleSubmit} disabled={createShipmentDocAPI?.loading} size="sm">
				Submit
			</Button> */}
			<br />
		</div>
	);
}

export default forwardRef(Form);
