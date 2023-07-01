import { string } from 'prop-types';
import React from 'react';

function Icon(props, ref) {
	const { type, ...rest } = props;

	const { style = {} } = rest || {};

	const CurrentIcon = type;

	return CurrentIcon ? (
		<CurrentIcon style={style} className="fade-in" ref={ref} {...rest} />
	) : null;
}

Icon.propTypes = { type: string.isRequired };

export default Icon;
