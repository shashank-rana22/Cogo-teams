import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const DEFAULT_COST_OF_DIESEL = 90;
const DEFAULT_MILEAGE = 20;
const TRIP_TYPE_WEIGHTAGE = {
	one_way : 1,
	two_way : 2,
};
const DISTANCE_BUFFER = 10; // in Kms

const MIN_DEFAULT_VALUE = 0;
const FRACTION_VALUE = 0.9;
const PRECISION_VALUE = 2;
const MIN_WEIGHTAGE_VALUE = 1;

export const isATHAmountValid = ({
	validATHAmount = {},
	fuelCostResp = {},
	singleServiceProvider = {},
	services = [],
	formValues = {},
	truckDetailsList = [],
	isFleetContractBooking = false,
	tripDistance = 1,
}) => {
	const {
		line_items = [],
		updated_advance_amount = MIN_DEFAULT_VALUE,
		price = MIN_DEFAULT_VALUE,
		advance_amount = MIN_DEFAULT_VALUE,
	} = singleServiceProvider || {};
	const tempValidATHAmount = validATHAmount;

	/**
     * cost of fuel sample response looks like
     * costOfFuel = {
     * 	cng: 23.19,
     *  diesel: 13.45,
     *  electric: 0.08.,
     *  hydrogen: 34.82,
     *  petrol: 15.37
     * }
     */
	const costOfFuel = fuelCostResp?.list?.[GLOBAL_CONSTANTS.zeroth_index]
		?.platform_config_constant_mappings?.[GLOBAL_CONSTANTS.zeroth_index]?.value
        || {};

	/**
     *  maxValidATHAmount can be either on of them
     *  1. ((dist * trip_type(1 for one_way or 2 for two_way) + dist_buffer) / mileage ) * fuel_cost
     * 		this applies for only Fleet Contract Bookings (FTL)
     *  2. 0.9% of cost per truck
     * 		this applies for all other types of bookings
     */
	let tempFinalAmount = Number(price);
	const basLineItem = line_items?.find(
		(lineItem) => lineItem?.code === 'BAS',
	) || {};

	if (basLineItem?.unit !== 'per_truck' && !isEmpty(basLineItem)) {
		tempFinalAmount *= Number(basLineItem?.quantity);
	}

	let maxValidATHAmount = tempFinalAmount * FRACTION_VALUE;

	tempValidATHAmount.withoutContract = maxValidATHAmount;
	const chosenTrucks = formValues?.truck_detail?.map(
		(truck) => truckDetailsList?.find((item) => truck?.truck_number === item?.name),
	);
	if (isFleetContractBooking && !isEmpty(chosenTrucks)) {
		const { trip_type = '' } = services?.[GLOBAL_CONSTANTS.zeroth_index] || {}; // one_way or two_way

		let averageATHPerTruck = chosenTrucks.reduce((a, truck) => {
			let mileage = truck?.data?.mileage;
			mileage = +mileage || DEFAULT_MILEAGE;
			const fuel_type = truck?.data?.fuel_type;
			const truckFuelCostPerLitre = +costOfFuel[fuel_type] || DEFAULT_COST_OF_DIESEL;
			let totalATH = a;

			totalATH += +Number.parseFloat(
				((+tripDistance.toFixed(PRECISION_VALUE) * (TRIP_TYPE_WEIGHTAGE[trip_type] || MIN_WEIGHTAGE_VALUE)
                    + DISTANCE_BUFFER)
                    / (+mileage || DEFAULT_MILEAGE))
                    * truckFuelCostPerLitre,
			).toFixed(PRECISION_VALUE);

			return totalATH;
		}, MIN_DEFAULT_VALUE);

		averageATHPerTruck /= chosenTrucks.length;

		// formulae = ((dist * trip_type[1/2] + dist_buffer) / avgMileage ) * fuel_cost
		const contractMaxValidATHAmountPerTruck = averageATHPerTruck;
		tempValidATHAmount.withContract = Math.min(
			contractMaxValidATHAmountPerTruck,
			+(price),
		);
		maxValidATHAmount =	contractMaxValidATHAmountPerTruck > MIN_DEFAULT_VALUE
        && tripDistance > MIN_DEFAULT_VALUE
			? Math.min(
				contractMaxValidATHAmountPerTruck,
				+(price),
			)
			: maxValidATHAmount;
	}

	if (
		+maxValidATHAmount
        < (+(updated_advance_amount)
            || +(advance_amount))
	) {
		return false;
	}

	return true;
};
