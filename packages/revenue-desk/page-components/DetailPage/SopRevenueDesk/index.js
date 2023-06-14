import { useState } from 'react';

// import Sop from '../../../PocSop/Sop/components';
// import SopNew from '../../../PocSop/SOP_Re';

// import { SopContainer, Container, Heading } from './styles';

function SopRevenueDesk({ data }) {
	const [open, setOpen] = useState(false);

	const { shipment_type } = data;
	const dataToSend = {
		shipment_id     : data?.id,
		shipment_data   : { ...data },
		primary_service : { ...data },
		permissions     : {
			add: false,
		},
	};

	return (
		<div>
			{/* <div>
					 {['fcl_freight', 'lcl_freight'].includes(shipment_type) ? (
						<>
							<Heading>SOP</Heading>
							<SopNew shipment_data_formatted={data} />
						</>
					) : (
						<Sop dataFromOtherSource={dataToSend} />
					)}
				</div> */}
		</div>
	);
}
export default SopRevenueDesk;
