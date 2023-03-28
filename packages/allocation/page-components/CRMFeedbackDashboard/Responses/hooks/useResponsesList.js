// import { useAllocationRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';

import { useState } from 'react';

const useResponsesList = ({ activeTab = '' }) => {
	// const {
	// 	profile = {},
	// } = useSelector((state) => state);

	let data;

	if (activeTab === 'user') {
		data = [
			{
				id                            : '1',
				name                          : 'Anmol Bansal',
				email                         : 'anmol.bansal@cogoport.com',
				alternate_email               : 'abanmolbansal5@gmail.com',
				mobile_number                 : '9899909357',
				alternate_mobile_number       : '9818999507',
				whatsapp_number               : '9899909357',
				mobile_country_code           : '+91',
				whatsapp_country_code         : '+91',
				alternate_mobile_country_code : '+91',
				work_scopes                   : ['Frontend Developer', 'UI Designer', 'UX Designer', 'Product Manager'],
			},
			{
				id                            : '2',
				name                          : 'Anmol Bansal',
				email                         : 'anmol.bansal@cogoport.com',
				alternate_email               : 'abanmolbansal5@gmail.com',
				mobile_number                 : '9899909357',
				alternate_mobile_number       : '9818999507',
				whatsapp_number               : '9899909357',
				mobile_country_code           : '+91',
				whatsapp_country_code         : '+91',
				alternate_mobile_country_code : '+91',
				work_scopes                   : ['Frontend Developer', 'UI Designer', 'UX Designer', 'Product Manager'],
			},
		];
	} if (activeTab === 'address') {
		data = [
			{
				address    : 'House No 3121, Sector 23, Gurugram, Haryana',
				city       : 'Gurugram',
				state      : 'Haryana',
				country    : 'India',
				pincode    : '122017',
				tax_number : 'ABPKJ345F',
			},
			{
				address    : 'House No 3121, Sector 23, Gurugram, Haryana',
				city       : 'Gurugram',
				state      : 'Haryana',
				country    : 'India',
				pincode    : '122017',
				tax_number : 'ABPKJ345F',
			},
		];
	}

	const loading = false;

	const paginationData = {
		page        : 1,
		page_limit  : 10,
		total       : 1,
		total_count : 2,
	};

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	// const [{ data, loading }] = useAllocationRequest({
	// 	url     : url,
	// 	method  : 'get',
	// 	authkey : authkey,
	// 	params,
	// }, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	return {
		loading,
		data,
		paginationData,
		getNextPage,
	};
};

export default useResponsesList;
