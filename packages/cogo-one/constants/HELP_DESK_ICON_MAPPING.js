import {
	IcMServices,
	IcMDocument,
	IcMSearchdark,
	IcAOperationalExcellence,
	IcMFinance,
	IcAFreeOnBoard,
} from '@cogoport/icons-react';

const IconMapping = {
	air: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 6.svg"
				alt="logo cogoport"
				width="20px"
				height="20px"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	document: {
		icon  : IcMDocument,
		style : '#1b842c',
	},
	search: {
		icon  : IcMSearchdark,
		style : '#ffa701',
	},
	booking: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 8.svg"
				alt="logo cogoport"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	transaction: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 8.svg"
				alt="logo cogoport"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	operation: {
		icon  : IcAOperationalExcellence,
		style : '#303b67',
	},
	finance: {
		icon  : IcMFinance,
		style : '#303b67',
	},
	shipment: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/red_container.svg"
				alt="logo cogoport"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	service: {
		icon  : IcMServices,
		style : '#303b67',
	},
	topic: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 7.svg"
				alt="logo cogoport"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	platform: {
		icon: (
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image 9.svg"
				alt="logo cogoport"
			/>
		),
		style : '#303b67',
		isSvg : true,
	},
	boarding: {
		icon  : IcAFreeOnBoard,
		style : '#303b67',
	},
};
export default IconMapping;
