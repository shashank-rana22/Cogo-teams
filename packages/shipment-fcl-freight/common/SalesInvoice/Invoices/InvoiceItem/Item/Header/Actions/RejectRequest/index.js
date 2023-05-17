// import Layout from '@cogo/bookings/commons/Layout';
import { Button, Modal } from '@cogoport/components';
// import { useFormCogo } from '@cogoport/front/hooks';
import React from 'react';

import useUpdateInvoiceStatus from '../../../../../../../../hooks/useUpdateInvoiceStatus';

import controls from './controls';
import useTranslatePorforma from './useTranslateProforma';

function RejectRequest({
	bfInvoice,
	rejectInvoice,
	setRejectInvoice = () => {},
	refetch = () => {},
	invoice,
}) {
	// const {
	// 	fields,
	// 	handleSubmit,
	// 	watch,
	// 	formState: { errors },
	// } = useFormCogo(controls);

	// const formvalues = watch();

	// const showElement = {
	// 	reject_remarks: formvalues?.reason === 'translated_issue',
	// };
	const onClose = () => {
		setRejectInvoice(false);
	};

	const { onSubmit, rejectInvoiceLoading } = useTranslatePorforma({
		bfInvoice,
		// formvalues,
		refetch,
		onClose,
	});

	const { updateInvoiceStatus, loading } = useUpdateInvoiceStatus({
		invoice,
		onClose,
		refetch,
		status: 'amendment_requested',
	});

	return (
		<Modal onClose={onClose} show={rejectInvoice} width={600}>
			<Modal.Header title="Rejection Request" />
			{/* <Layout
					controls={controls}
					fields={fields}
					themeType="custom-layout"
					errors={errors}
					showElements={showElement}
				/> */}

			<Modal.Footer>
				{formvalues?.reason === 'line_item_edit' ? (
					<Button
						className="primary md"
						onClick={updateInvoiceStatus}
						disabled={loading}
					>
						Edit
					</Button>
				) : (
					<Button
						className="primary md"
						disabled={rejectInvoiceLoading}
					>
						Reject
					</Button>
				)}

			</Modal.Footer>
		</Modal>
	);
}

export default RejectRequest;
