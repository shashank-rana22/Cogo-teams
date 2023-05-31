import { IcCFfcl, IcAOceanLcl, IcCFclLocals } from '@cogoport/icons-react';

const serviceIconMapping = {
	fcl_freight_service       : { icon: <IcCFfcl />, text: 'FCL' },
	lcl_freight_service       : { icon: <IcAOceanLcl />, text: 'LCL' },
	fcl_freight_local_service : { icon: <IcCFclLocals />, text: 'FCL Locals' },
};

function Icons({ service_type = '' }) {
	return service_type in serviceIconMapping ? (
		<>
			{serviceIconMapping[service_type].icon}
			<span>{serviceIconMapping[service_type].text}</span>
		</>
	) : null;
}

export default Icons;
