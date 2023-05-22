import {
	IcMFrupee,
	IcAWarehouse,
	IcMCfs,
	IcMAirport, IcMPort, IcMHaulage, IcMLocation,
} from '@cogoport/icons-react';

// import IcCargoYard from '@/public/images/cargo-yard.svg';
// import IcCity from '@/public/images/city.svg';
// import IcContinent from '@/public/images/continent.svg';
// import IcDistrict from '@/public/images/district.svg';
// import IcRegion from '@/public/images/region.svg';

export default {
	airport: {
		icon     : <IcMAirport />,
		showType : false,
	},
	cfs: {
		icon     : <IcMCfs />,
		showType : true,
	},
	city: {
		icon     : <IcMLocation />,
		showType : false,
	},
	pincode: {
		icon     : <IcMLocation />,
		showType : true,
	},
	railway_terminal: {
		icon     : <IcMHaulage />,
		showType : false,
	},
	seaport: {
		icon     : <IcMPort />,
		showType : false,
	},
	trade: {
		icon     : <IcMFrupee />,
		showType : true,
	},
	warehouse: {
		icon     : <IcAWarehouse />,
		showType : true,
	},
	region: {
		icon     : <IcMLocation />,
		showType : true,
	},
	continent: {
		icon     : <IcMLocation />,
		showType : false,
	},
	country: {
		icon     : <IcMLocation />,
		showType : false,
	},
	yard: {
		icon     : <IcMLocation />,
		showType : true,
	},
	subdistrict: {
		icon     : <IcMLocation />,
		showType : true,
	},
	district: {
		icon     : <IcMLocation />,
		showType : true,
	},
	cluster: {
		icon     : <IcMLocation />,
		showType : true,
	},
	zone: {
		icon     : <IcMLocation />,
		showType : true,
	},
	railway_station: {
		icon: <IcMHaulage />,
	},
};
