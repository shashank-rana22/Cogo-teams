import {
	IcMAir, IcMCfs, IcMCustoms, IcMFcl, IcMFtl, IcMHaulage, IcMLcl, IcMLtl, IcMTrailorFull,
} from '@cogoport/icons-react';

const iconMapping = {
	fcl_freight : <IcMFcl width="18px" height="18px" color="#034afd" />,
	lcl_freight : <IcMLcl width="18px" height="18px" color="#89cad1" />,
	air_freight : <IcMAir width="18px" height="18px" color="#ee3425" />,
	air_customs : (
		<IcMCustoms width="18px" height="18px" color="#ee3425" />
	),
	fcl_customs: (
		<IcMCustoms width="18px" height="18px" color="#034afd" />
	),
	lcl_customs: (
		<IcMCustoms width="18px" height="18px" color="#89cad1" />
	),
	haulage_freight: (
		<IcMHaulage width="18px" height="18px" color="#898fd1" />
	),
	trailer_freight: (
		<IcMTrailorFull width="18px" height="18px" color="#898fd1" />
	),
	ftl_freight : <IcMFtl width="18px" height="18px" color="#898fd1" />,
	ltl_freight : <IcMLtl width="18px" height="18px" color="#898fd1" />,
	fcl_cfs     : <IcMCfs width="18px" height="18px" color="#034afd" />,
};

export default iconMapping;
