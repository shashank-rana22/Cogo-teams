import React, { useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import { Button, Loader, toast } from '@cogoport/front/components/admin';
import FormLayout from '../../../../../commons/Layout';
import controls from './configs/controlsPaymentInfo';
import useGetInvoiceInfo from './hooks/useGetInvoiceInfo';
import useBulkUpdate from './hooks/useBulkUpdate';
import { validateData } from './utils/formatData';
import { Container, ButtonWrap, LoadingContainer } from './styles';

const LTLAddPaymentInfo = ({
	shipment_data,
	onCancel = () => {},
	task,
	refetch = () => {},
}) => {
	const { loading, data } = useGetInvoiceInfo({ shipment_data });
	const { loading: taskLoading, updateTask } = useBulkUpdate({
		shipment_data,
		refetch,
		onCancel,
	});

	const {
		fields,
		handleSubmit,
		formState: { errors },
		setValues,
	} = useFormCogo(controls);

	useEffect(() => {
		if (data) {
			const { invoicing_parties = [] } = data;
			const invoicingParties = invoicing_parties.map((invoicing_party) => {
				return {
					invoice_number: invoicing_party?.live_invoice_number || '',
					amount: {
						currency: invoicing_party?.invoice_total_currency,
						price: invoicing_party?.invoicing_party_total_discounted,
					},
				};
			});

			setValues({
				documents: invoicingParties,
			});
		}
	}, [data]);

	const submitForm = async (val) => {
		if (validateData({ val })) {
			updateTask({ task, val });
		} else {
			toast.error('Some Fields are empty');
		}
	};

	return (
		<Container>
			{loading ? (
				<LoadingContainer>
					<Loader />
				</LoadingContainer>
			) : null}

			<FormLayout fields={fields} controls={controls} errors={errors} />
			<ButtonWrap>
				<Button className="secondary md" onClick={() => onCancel()}>
					Cancel
				</Button>

				<Button
					className="primary md"
					onClick={handleSubmit(submitForm)}
					disabled={loading || taskLoading}
				>
					Submit
				</Button>
			</ButtonWrap>
		</Container>
	);
};

export default LTLAddPaymentInfo;
