import { Breadcrumb } from '@cogoport/components';
import { useRouter, Link } from '@cogoport/next';
import React from 'react';

function BackButton() {
	const { query = {} } = useRouter();

	return (
		<Breadcrumb>
			<Breadcrumb.Item
				label={(
					<Link href={`/enrichment?tab=${query.tab}`}>
						Enrichment
					</Link>
				)}
			/>
			<Breadcrumb.Item label="Organization Details" />
		</Breadcrumb>
	);
}

export default BackButton;
