import { Modal } from '@cogoport/components';
import { useForm, asyncTicketsCategory } from '@cogoport/forms';
import useGetAsyncTicketOptions from '@cogoport/forms/hooks/useGetAsyncTicketOptions';
import { useState } from 'react';

import Layout from '../../../../../commons/Layout/index.tsx';
import controls from '../../../../configurations/raise-ticket-controls';

import styles from './styles.module.css';

function RaiseTicketModal({
	setShowTicketModal = () => {},
	showTicketModal = false,
}) {
	const [subCategories, setSubCategories] = useState([]);

	const { control, watch, setValue, formState:{ errors = {} } = {} } = useForm();

	const formValues = watch();

	const { service, request_type, trade_type } = formValues;

	const categoryDeskOptions = useGetAsyncTicketOptions({
		...asyncTicketsCategory(),
		params: {
			Service          : service || undefined,
			TradeType        : trade_type || undefined,
			RequestType      : request_type || undefined,
			CategoryDeskType : 'by_desk',
		},
		valueKey : 'raised_by_desk',
		labelKey : 'raised_by_desk',
	});

	const formattedSubCategories = (subCategories || []).map((item) => ({
		label : item?.name,
		value : item?.name,
	}));

	const fields = controls({ setSubCategories, setValue, formattedSubCategories, formValues, categoryDeskOptions });
	return (
		<Modal
			size="sm"
			placement="right"
			onClose={() => setShowTicketModal(false)}
			show={showTicketModal}
			closeOnOuterClick={() => setShowTicketModal(false)}
			className={styles.styled_ui_modal_dialog}
		>
			{/* <form onSubmit={handleSubmit(raiseTickets)}> */}
			<Modal.Header title="Raise Ticket" style={{ padding: 8 }} />

			<Modal.Body>
				{/* <RaiseTicketsForm
						{...formProps}
						additionalInfo={additionalInfo}
						setAdditionalInfo={setAdditionalInfo}
					/> */}
				<Layout
					fields={fields}
					control={control}
					errors={errors}
				/>
			</Modal.Body>

			<Modal.Footer style={{ padding: 12 }}>
				{/* <Button size="md" type="submit" loading={loading}>
						{t('myTickets:submit')}
					</Button> */}
				<h1>footer</h1>
			</Modal.Footer>
			{/* </form> */}
		</Modal>
	);
}

export default RaiseTicketModal;
