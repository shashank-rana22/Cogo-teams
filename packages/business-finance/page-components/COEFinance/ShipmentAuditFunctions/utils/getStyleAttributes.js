export const getTimelineClassNames = (quotationStatus, accordionState, currentAccordion, styles) => {
	const currentAccordionState = accordionState?.[currentAccordion];

	if (currentAccordionState && !quotationStatus) {
		return styles.black;
	}

	if (quotationStatus) {
		return styles.red;
	}

	return styles.grey;
};

export const getCircleColor = (quotationStatus, accordionState, currentAccordion) => {
	const currentAccordionState = accordionState?.[currentAccordion];

	if (currentAccordionState && !quotationStatus) {
		return '#000';
	}

	if (quotationStatus) {
		return '#ee3425';
	}

	return '#808080';
};
