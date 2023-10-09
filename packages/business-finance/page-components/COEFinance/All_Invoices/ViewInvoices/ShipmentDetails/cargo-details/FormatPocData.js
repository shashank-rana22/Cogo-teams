import React from 'react';

function FormatPocData({ pocDetails = {} }) {
	const { name = '', mobile_country_code = '', mobile_number = '', email = '' } = pocDetails || {};
	return (
		<div>
			<div>{name}</div>
			<div>
				{mobile_country_code}
				-
				{mobile_number}
			</div>
			<div>{email}</div>
		</div>
	);
}

export default FormatPocData;
