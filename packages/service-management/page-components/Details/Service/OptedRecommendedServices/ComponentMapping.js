import { SingleLocation, MultipleLocation } from '../LocationComponents';

export default function ComponentMapping({
	service = '',
	item = {},
}) {
	if (
		[
			'fcl_customs',
			'lcl_customs',
			'air_customs',
			'fcl_freight_local_agent',
			'fcl_cfs',
		].includes(service)
	) {
		return <SingleLocation item={item} />;
	}

	return <MultipleLocation item={item} />;
}
