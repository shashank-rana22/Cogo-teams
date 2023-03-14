import React from 'react';
import { Flex, Button } from '@cogoport/front/components';

const incoTermMapping = {
	cif: 'export',
	cfr: 'export',
	cpt: 'export',
	cip: 'export',
	dat: 'export',
	dap: 'export',
	ddp: 'export',
	fob: 'import',
	exw: 'import',
	fca: 'import',
	fas: 'import',
};

const PaymentTermConfirmationModal = ({
	setShow = () => {},
	setValues = () => {},
	val = '',
	shipment_data = {},
}) => {
	return (
		<div>
			<h3>
				{incoTermMapping[shipment_data?.inco_term] === 'export'
					? 'Are you sure, you want to proceed with Collect for Export shipment?'
					: 'Are you sure, you want to proceed with Prepaid for Import shipment?'}
			</h3>

			<Flex justifyContent="flex-end" marginTop="40px">
				<Button
					style={{
						width: '70px',
						height: '32px',
						fontSize: '12px',
						marginRight: '10px',
					}}
					onClick={() => setShow(false)}
				>
					No
				</Button>
				<Button
					style={{
						width: '70px',
						height: '32px',
						fontSize: '12px',
						background: '#ffffff',
						color: '#000000',
					}}
					onClick={() => {
						setValues({ payment_term: val });
						setShow(false);
					}}
				>
					Yes
				</Button>
			</Flex>
		</div>
	);
};

export default PaymentTermConfirmationModal;
