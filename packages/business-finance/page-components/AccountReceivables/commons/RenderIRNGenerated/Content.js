import React from 'react';

function Content({ statusComponentMap = [], itemData = {}, refetch = () => {} }) {
	const components = statusComponentMap.filter((item) => item.status.includes(itemData?.invoiceStatus));

	return components.map((item) => {
		const Element = item.component;
		return (
			<React.Fragment key={itemData}>
				<Element itemData={itemData} refetch={refetch} />
			</React.Fragment>
		);
	});
}

export default Content;
