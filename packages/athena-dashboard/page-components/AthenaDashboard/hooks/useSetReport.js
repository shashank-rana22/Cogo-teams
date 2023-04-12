import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useSetReport = () => {
	const {
		general:{
			query:{
				hscodes,
				shipment_type,
			},
		},
	} = useSelector((state) => state);
	const [answer, setAnswer] = useState([]);
	const [hsdesc, setHsdesc] = useState([]);
	const [share, setShare] = useState([]);
	const [marketshare, setMarketshare] = useState([]);
	const [globalsupply, setGlobalsupply] = useState([]);

	const [{ loading = false, data: responseData = {} }] = useAthenaRequest({
		url    : 'commodity_trend_report',
		method : 'post',
		data   : {
			filters: {
				hs_code       : !isEmpty(hscodes) ? hscodes.split(',') : '',
				shipment_type : !isEmpty(shipment_type) ? shipment_type : '',
			},
		},
	}, { manual: false });

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnswer(responseData.list);
			setHsdesc(responseData.description);
			setShare(responseData.share);
			setMarketshare(responseData.market_share);
			setGlobalsupply(responseData.global_supply);
		}
	}, [responseData]);

	const linegraphdata = [
		{
			id    : 'India',
			color : 'hsl(1, 100%, 50%)',
			data  : (answer || []).map((item) => ({
				x : item.month_name,
				y : item.total,
			})),
		},
	];
	const shipmentValueMapData = (share || []).map((item) => ({
		id    : item.country_code,
		value : item.total,
	}));

	const marketShareChangeMapData = (marketshare || []).map((item) => ({
		id    : item.country_code,
		value : item.percent_share.toFixed(2),
	}));
	return {
		hsdesc,
		share,
		marketshare,
		globalsupply,
		linegraphdata,
		shipmentValueMapData,
		marketShareChangeMapData,
		responseData,
		shipment_type,
		loading,
	};
};
export default useSetReport;
