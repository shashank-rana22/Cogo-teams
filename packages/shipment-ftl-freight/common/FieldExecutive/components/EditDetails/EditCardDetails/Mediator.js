import React from 'react';

import DocumentComponent from '../../../commons/DocumentComponent';
import InputComponent from '../../../commons/InputComponent';
import { CUSTOM_TYPES } from '../../../utils/pageMappings';

const CUSTOM_COMPONENTS = {
	[CUSTOM_TYPES.DOCUMENT] : DocumentComponent,
	[CUSTOM_TYPES.INPUT]    : InputComponent,
};

const getComponent = (customType) => {
	if (customType in CUSTOM_COMPONENTS) {
		return CUSTOM_COMPONENTS[customType];
	}
	return null;
};

function Mediator(props) {
	const { item = {} } = props;
	const Component = getComponent(item.customType);
	if (!Component) {
		return null;
	}
	return <Component {...props} />;
}

export default Mediator;
