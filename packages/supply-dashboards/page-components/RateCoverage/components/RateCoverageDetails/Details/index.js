import DislikeRates from './DislikeRates';
import ExpiringRates from './ExpiringRates';
import MissingRates from './MissingRates';
import RateDensity from './RateDenisty';

function Details({ setIndex, index, value, filter }) {
	if (index === 0) {
		return (
			<RateDensity setIndex={setIndex} value={Intl.NumberFormat().format(value?.rate_density)} />
		);
	}
	if (index === 1) {
		return (
			<MissingRates
				setIndex={setIndex}
				value={Intl.NumberFormat().format(value?.missing_rates_count)}
				filter={filter}
			/>
		);
	}
	if (index === 2) {
		return (
			<ExpiringRates
				setIndex={setIndex}
				value={Intl.NumberFormat().format(value?.expiring_rates_count)}
				filter={filter}
			/>
		);
	}
	if (index === 3) {
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
