import { useEffect } from 'react';

import GetLocation from './GetLocation';
import GetOperator from './GetOperator';
import GetOrganization from './GetOrganization';

const GetFinalList = ({ list, data, loading }) => {
	const { shipmentPendingTasks = [], airportIds = [], importerExporterIds = [], airlineIds = [] } = list;

	const { data: airportData = {}, listAirport } = GetLocation({ airportIds });
	const { list: airportList = [] } = airportData;

	const { data: organizationData = {}, listOrganization } = GetOrganization({ importerExporterIds });
	const { list: organizationList = [] } = organizationData;

	const { data: operatorData = {}, listOperator } = GetOperator({ airlineIds });
	const { list: operatorList = [] } = operatorData;

	useEffect(() => {
		if (!loading) {
			listAirport();
		}
	}, [data]);

	useEffect(() => {
		if (!loading) {
			listOrganization();
		}
	}, [data]);

	useEffect(() => {
		if (!loading) {
			listOperator();
		}
	}, [data]);

	const originData = [];
	(airportList || []).forEach((item) => {
		(shipmentPendingTasks || []).map((itm) => {
			if (item.id === itm.originAirportId) {
				const pushData = {
					...itm,
					origin: item.name,
				};
				originData.push(pushData);
			}
			return originData;
		});
	});

	const destinationData = [];
	(airportList || []).forEach((item) => {
		(originData || []).map((itm) => {
			if (item.id === itm.destinationAirportId) {
				const pushData = {
					...itm,
					destination: item.name,
				};
				destinationData.push(pushData);
			}
			return destinationData;
		});
	});

	const orgData = [];
	(organizationList || []).forEach((item) => {
		(destinationData || []).map((itm) => {
			if (item.id === itm.importerExporterId) {
				const pushData = {
					...itm,
					customer_name: item.business_name,
				};
				orgData.push(pushData);
			}
			return orgData;
		});
	});

	const airlineData = [];
	(operatorList || []).forEach((item) => {
		(orgData || []).map((itm) => {
			if (item.id === itm.airlineId) {
				const pushData = {
					...itm,
					airline: item.business_name,
				};
				airlineData.push(pushData);
			}
			return airlineData;
		});
	});

	return { finalData: airlineData };
};

export default GetFinalList;
