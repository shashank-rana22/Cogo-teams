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
const BlConfirmationModal = ({
	setShow = () => {},
	setValues = () => {},
	val = '',
	shipment_data = {},
}) => {
	return (
		<div>
			<h3>
				{incoTermMapping[shipment_data?.inco_term] === 'export'
					? 'Are you sure, you want to proceed with HBL for Export shipment?'
					: 'Are you sure, you want to proceed with MBL for Import shipment?'}
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
						setValues({ bl_category: val });
						setShow(false);
					}}
				>
					Yes
				</Button>
			</Flex>
		</div>
	);
};

export default BlConfirmationModal;
