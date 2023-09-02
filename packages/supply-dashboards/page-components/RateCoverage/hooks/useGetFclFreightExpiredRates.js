/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
// import { useRequest } from '@cogoport/request';
// import axios from 'axios';
// import { useEffect, useCallback } from 'react';

// const apiName = {
// 	fcl_freight : 'get_fcl_freight_rate_coverage_stats',
// 	ltl_freight : 'get_ltl_freight_rate_stats',
// 	lcl_freight : 'get_lcl_freight_rate_stats',
// 	air_freight : 'get_air_freight_rate_dashboard_stats',
// };

const useGetFclFreightExpiredRates = () => {
	// console.log('hit');
	// const res = axios.get('https://9781-103-143-39-118.ngrok.io/fcl_freight_rate/get_fcl_freight_critical_ports_expired_rates?service=air_freight', { });
	// const dataPromise = res.then((promiseResult) => promiseResult.data);

	// const [{ loading, data }, trigger] = useRequest({
	// 	url    : '/fcl_freight_rate/get_fcl_freight_rate_coverage_stats',
	// 	method : 'GET',
	// }, { manual: true });

	// const getStats = useCallback(async (filter = {}) => {
	// 	const finalFilter = Object.fromEntries(
	// 		Object.entries(filter).filter(([, value]) => value !== ''),
	// 	);
	// 	try {
	// 		await trigger({
	// 			params: { filters: { ...finalFilter }, service },
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, [service, trigger]);

	// useEffect(() => {
	// 	getStats();
	// }, [getStats, service]);

	const expiredRatedataPromise = {
		list: [
		  {
				airline: {
			  id            : '05b60693-2f45-43cd-8771-85d0adbde5e2',
			  status        : 'active',
			  logo_url      : 'https://airline-images-cogoport.s3.ap-south-1.amazonaws.com/ethiopian-airlines-logo-1+1.svg',
			  short_name    : 'Ethiopian Airlines',
			  business_name : 'Ethiopian Airlines',
			  operator_type : 'airline',
				},
				origin_airport: {
			  id           : 'aeb6e88f-4379-4398-bf9e-18f91c78e1f3',
			  name         : 'Kempegowda International Airport - INBLR',
			  trade_id     : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
			  port_code    : 'BLR',
			  country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IN',
				},
				destination_airport: {
			  id           : '194b9342-65ba-4623-924b-94e459bb5e84',
			  name         : 'Baghdad International Airport - IQBGW',
			  trade_id     : '0cd3ac76-ee4e-4178-9511-8cf93caf045b',
			  port_code    : 'BGW',
			  country_id   : '2d8eaf27-13d8-4f89-9a99-82a2cb002d05',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IQ',
				},
				commodity: 'general',
		  },
		  {
				origin_airport: {
			  id           : 'aeb6e88f-4379-4398-bf9e-18f91c78e1f3',
			  name         : 'Kempegowda International Airport - INBLR',
			  trade_id     : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
			  port_code    : 'BLR',
			  country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IN',
				},
				destination_airport: {
			  id           : '194b9342-65ba-4623-924b-94e459bb5e84',
			  name         : 'Baghdad International Airport - IQBGW',
			  trade_id     : '0cd3ac76-ee4e-4178-9511-8cf93caf045b',
			  port_code    : 'BGW',
			  country_id   : '2d8eaf27-13d8-4f89-9a99-82a2cb002d05',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IQ',
				},
				commodity: 'general',
		  },
		  {
				origin_airport: {
			  id           : 'aeb6e88f-4379-4398-bf9e-18f91c78e1f3',
			  name         : 'Kempegowda International Airport - INBLR',
			  trade_id     : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
			  port_code    : 'BLR',
			  country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IN',
				},
				destination_airport: {
			  id           : '194b9342-65ba-4623-924b-94e459bb5e84',
			  name         : 'Baghdad International Airport - IQBGW',
			  trade_id     : '0cd3ac76-ee4e-4178-9511-8cf93caf045b',
			  port_code    : 'BGW',
			  country_id   : '2d8eaf27-13d8-4f89-9a99-82a2cb002d05',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IQ',
				},
				commodity: 'general',
		  },
		  {
				origin_airport: {
			  id           : 'aeb6e88f-4379-4398-bf9e-18f91c78e1f3',
			  name         : 'Kempegowda International Airport - INBLR',
			  trade_id     : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
			  port_code    : 'BLR',
			  country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IN',
				},
				destination_airport: {
			  id           : '194b9342-65ba-4623-924b-94e459bb5e84',
			  name         : 'Baghdad International Airport - IQBGW',
			  trade_id     : '0cd3ac76-ee4e-4178-9511-8cf93caf045b',
			  port_code    : 'BGW',
			  country_id   : '2d8eaf27-13d8-4f89-9a99-82a2cb002d05',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IQ',
				},
				commodity: 'general',
		  },
		  {
				origin_airport: {
			  id           : 'aeb6e88f-4379-4398-bf9e-18f91c78e1f3',
			  name         : 'Kempegowda International Airport - INBLR',
			  trade_id     : 'd1e7b3ca-7518-4706-a644-e99d3aa2e0a9',
			  port_code    : 'BLR',
			  country_id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IN',
				},
				destination_airport: {
			  id           : '194b9342-65ba-4623-924b-94e459bb5e84',
			  name         : 'Baghdad International Airport - IQBGW',
			  trade_id     : '0cd3ac76-ee4e-4178-9511-8cf93caf045b',
			  port_code    : 'BGW',
			  country_id   : '2d8eaf27-13d8-4f89-9a99-82a2cb002d05',
			  continent_id : 'a5fad8d7-ea33-4dab-82d6-e7097fbffee1',
			  country_code : 'IQ',
				},
				commodity: 'general',
		  },
		],
		csv_link : 'https://new-rpa-test.s3.ap-south-1.amazonaws.com/rate_sheets/air_freight_expired_rates_20230818182209.csv',
		count    : 5,
	  };

	return expiredRatedataPromise;
};
export default useGetFclFreightExpiredRates;
