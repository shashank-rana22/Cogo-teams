import { Breadcrumb } from '@cogoport/components';
import { Link } from '@cogoport/next';
import React from 'react';

function BackButton() {
	return (
		<Breadcrumb>
			<Breadcrumb.Item
				label={(
					<Link href="/enrichment">
						Enrichment
					</Link>
				)}
			/>
			<Breadcrumb.Item label="Organization Details" />
		</Breadcrumb>
	);
}

export default BackButton;
