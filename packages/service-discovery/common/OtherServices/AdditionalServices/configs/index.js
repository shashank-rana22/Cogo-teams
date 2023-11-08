import getAirPayload from './air/getPayload';
import airIncoTerms from './air/list.json';
import getFclPayload from './fcl/getPayload';
import fclIncoTerms from './fcl/list.json';

export const getServiceIncoTerms = ({ primary_service = '' }) => {
	const MAPPING = {
		fcl_freight : fclIncoTerms,
		air_freight : airIncoTerms,
	};

	return MAPPING[primary_service] || [];
};

export const getServiceWisePayload = ({ primary_service = '' }) => {
	const MAPPING = {
		fcl_freight : getFclPayload,
		air_freight : getAirPayload,
	};

	return MAPPING[primary_service] || [];
};
