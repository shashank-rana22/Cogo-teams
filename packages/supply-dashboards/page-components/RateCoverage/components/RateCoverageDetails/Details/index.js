import CriticalRates from './CriticalRates';
import DislikeRates from './DislikeRates';
import ExpiringRates from './ExpiringRates';
import SpotSearchesDetails from './SpotSearches';

const CONSTANT_ZERO = 0;
const CONSTANT_ONE = 1;
const CONSTANT_TWO = 2;
const CONSTANT_THREE = 3;
const CONSTANT_FOUR = 4;

function Details({ setIndex, index, value, filter }) {
	if (index === CONSTANT_ZERO) {
		return (
			<CriticalRates
				setIndex={setIndex}
				value={value?.count || CONSTANT_ZERO}
				filter={filter}
				data={value}
			/>
		);
	}
	if (index === CONSTANT_ONE) {
		return (
			<ExpiringRates
				setIndex={setIndex}
				value={value?.count || CONSTANT_ZERO}
				filter={filter}
				data={value}
			/>

		);
	}
	if (index === CONSTANT_TWO) {
		return (

			<SpotSearchesDetails setIndex={setIndex} value={value?.count || CONSTANT_ZERO} data={value} />
		);
	}
	if (index === CONSTANT_THREE) {
		return (
			<DislikeRates
				setIndex={setIndex}
				value={Intl.NumberFormat().format(value?.dislike_rates_count)}
				filter={filter}
			/>
		);
	}
	if (index === CONSTANT_FOUR) {
		return (
			<DislikeRates
				setIndex={setIndex}
				value={Intl.NumberFormat().format(value?.dislike_rates_count)}
				filter={filter}
			/>
		);
	}
}

export default Details;
