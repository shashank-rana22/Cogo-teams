import allocationRequests from './allocation-requests';
import disliked_rates from './disliked_rates';
import missingRates from './sales-missing-rates';
import salesQuotations from './sales-quotations.json';
import salesSpotSearches from './sales-spot-searches.json';
import salesShipments from './shipments.json';

const salesDashboard = [
	salesSpotSearches,
	salesQuotations,
	salesShipments,
	disliked_rates,
	missingRates,
	allocationRequests,
];

export default salesDashboard;
