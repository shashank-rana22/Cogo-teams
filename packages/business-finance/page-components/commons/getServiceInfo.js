import { IcCFclLocals, IcMFtrailorFull, IcMFcfs,
	IcMFcl,
	IcMAirport,
	IcMFairport,
	IcMFlcl,
	IcMFfcl,
	IcMLcl,
	IcMFair,
	IcMFhaulage,
	IcMFftl,
	IcMLtl
} from '@cogoport/icons-react';
// import Fcl from '../icons/ic-fcl.svg';
// import Air from '../icons/ic-air.svg';
// import AirDomestic from '../icons/ic-air-domestic.svg';
// import Lcl from '../icons/ic-lcl.svg';
// import FclCustom from '../icons/ic-fcl-custom.svg';
// import LclCustom from '../icons/ic-lcl-custom.svg';
// import AirCustom from '../icons/ic-air-custom.svg';
// import Haulage from '../icons/ic-haulage.svg';
// import Ftl from '../icons/ic-ftl.svg';
// import  from '../icons/ic-ltl.svg';

 const getServiceInfo = (service) => {
	let serviceIcon = null;

	if (service === 'fcl_freight') serviceIcon = <IcMFcl size={3} />;
	if (service === 'lcl_freight') serviceIcon = <IcMFlcl size={3} />;
	if (service === 'air_freight') serviceIcon = <IcMAirport size={3} />;
	if (service === 'domestic_air_freight')
		serviceIcon = <IcMFairport size={3} />;

	if (service === 'fcl_customs') serviceIcon = <IcMFfcl size={4} />;
	if (service === 'fcl_cfs')
		serviceIcon = (
			<div className="icon">
				<IcMFcfs width={26} height={26} fill="#356EFD" />
				<div
					style={{
						fontSize: '9px',
						color: '#356EFD',
						fontWeight: 500,
						width: 'max-content',
					}}
				>
					FCL CFS
				</div>
			</div>
		);
	if (service === 'lcl_customs') serviceIcon = <IcMLcl size={4} />;
	if (service === 'air_customs') serviceIcon = <IcMFair size={4} />;

	if (service === 'haulage_freight') serviceIcon = <IcMFhaulage size={3} />;

	if (service === 'trailer_freight')
		serviceIcon = (
			<div className="icon">
				<IcMFtrailorFull width={26} height={26} fill="#81C0AF" />
				<div style={{ fontSize: '10px', color: '#81C0AF', fontWeight: 400 }}>
					Trailer
				</div>
			</div>
		);
	if (service === 'ftl_freight') serviceIcon = <IcMFftl size={3} />;
	if (service === 'ltl_freight') serviceIcon = <IcMLtl size={3} />;
	if (service === 'fcl_freight_local_service')
		serviceIcon = <IcCFclLocals style={{ width: '2em', height: '2em' }} />;

	return { serviceIcon };
};
export default getServiceInfo