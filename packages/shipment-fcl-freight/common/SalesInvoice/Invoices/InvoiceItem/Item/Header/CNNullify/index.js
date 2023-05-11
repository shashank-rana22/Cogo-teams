// import Layout from '@cogo/bookings/commons/Layout';
import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

// import useCreditNoteNullify from '../../../../../../../hooks/useCreditNoteNullify';
import RequestCN from '../RequestCN';

function CNNullify({
	askNullify,
	setAskNullify = () => {},
	shipment_serial_id,
	invoice,
	refetchCN = () => {},
	invoiceData,
	refetch = () => {},
}) {
	const [isRequestCN, setIsRequestCN] = useState(false);
	// const {
	// 	controls,
	// 	fields,
	// 	errors,
	// 	onError,
	// 	handleSubmit,
	// 	onCreate,
	// 	loading,
	// 	reset,
	// } = useCreditNoteNullify({
	// 	invoice,
	// 	setAskNullify,
	// 	refetchCN,
	// 	refetch,
	// });

	const handleNo = () => {
		setIsRequestCN(true);
		setAskNullify(false);
	};

	const handleOnClose = () => {
		// reset();
		setAskNullify(false);
	};

	return (
		<>
			<Modal
				className="primary md"
				show={askNullify}
				onClose={handleOnClose}
			>
				<Modal.Header title="Do you want to revoke this invoice ?" />
				{/* <Layout
					controls={controls}
					fields={fields}
					errors={errors}
					themeType="custom-layout"
				/> */}

				<Modal.Footer>
					<Button className="secondary md" onClick={handleNo}>
						Create Partial CN
					</Button>
					<Button
						// onClick={handleSubmit(onCreate, onError)}
						// disabled={loading}
						className="primary md"
					>
						Revoke Invoice
					</Button>

				</Modal.Footer>
			</Modal>

			{isRequestCN ? (
				<RequestCN
					shipment_serial_id={shipment_serial_id}
					invoice={invoice}
					show={isRequestCN}
					setShow={setIsRequestCN}
					refetchCN={refetchCN}
					invoiceData={invoiceData}
				/>
			) : null}
		</>
	);
}

export default CNNullify;
