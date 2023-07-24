const INCREMENT = 1;

export function isPointInsidePoly(coords, poly) {
	let isInside = false;
	const x = coords.lat;
	const y = coords.lng;

	for (let ii = 0; ii < poly.getLatLngs().length; ii += INCREMENT) {
		const polyPoints = poly.getLatLngs()[ii];
		for (let i = 0, j = polyPoints.length - INCREMENT; i < polyPoints.length; j = i, i += INCREMENT) {
			const { lat: xi, lng: yi } = polyPoints[i];
			const { lat: xj, lng: yj } = polyPoints[j];

			const intersect = (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi));
			if (intersect) isInside = !isInside;
		}
	}

	return isInside;
}

function isPointInsideRegion(coords, region) {
	let flag = false;

	if (region.getBounds().contains(coords)) {
		region.eachLayer((memberLayer) => {
			if (memberLayer.getBounds().contains(coords)) {
				if (isPointInsidePoly(coords, memberLayer)) {
					flag = true;
				}
			}
		});
	}
	return flag;
}

export default isPointInsideRegion;
