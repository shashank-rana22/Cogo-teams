import React from 'react';
import { Button } from '@cogoport/front/components/admin';
import Layout from '@cogo/bookings/commons/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import controls from './controls';
import useTranslatePorforma from './useTranslateProforma';
import useUpdateInvoiceStatus from '../../../../../../../../hooks/useUpdateInvoiceStatus';
import { Container, Heading, StyledModal, ButtonContainer } from './styles';

const RejectRequest = ({
	bfInvoice,
	rejectInvoice,
	setRejectInvoice = () => {},
	refetch = () => {},
	invoice,
}) => {
	const {
		fields,
		handleSubmit,
		watch,
		formState: { errors },
	} = useFormCogo(controls);

	const formvalues = watch();

	const showElement = {
		reject_remarks: formvalues?.reason === 'translated_issue',
	};
	const onClose = () => {
		setRejectInvoice(false);
	};

	const { onSubmit, rejectInvoiceLoading } = useTranslatePorforma({
		bfInvoice,
		formvalues,
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
		<Container>
			<StyledModal onClose={onClose} show={rejectInvoice} width={600}>
				<Heading>Rejection Request</Heading>
				<Layout
					controls={controls}
					fields={fields}
					themeType="custom-layout"
					errors={errors}
					showElements={showElement}
				/>

				<ButtonContainer>
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
							onClick={handleSubmit(onSubmit)}
						>
							Reject
						</Button>
					)}
				</ButtonContainer>
			</StyledModal>
		</Container>
	);
};

export default RejectRequest;
