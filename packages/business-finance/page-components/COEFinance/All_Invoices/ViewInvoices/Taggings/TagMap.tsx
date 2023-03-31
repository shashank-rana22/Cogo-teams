import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetTaggingBills from '../../../hook/useGetMappings';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({ billId }: { billId: string }) {
	const { mappingsData, loading } = useGetTaggingBills({
		billId,
	});

	return (
		<div>
			{!loading ? (
				<div className={`${styles.wrapper} ${styles.flex}`}>
					{!isEmpty(mappingsData)
						? (
							mappingsData || []
						).map((item) => (
							<div className={`${styles.flex} ${styles.bordernone}`}>
								<TagCard
									item={item}
									isfirst
								/>
							</div>
						))
						: null}
				</div>
			) : <Placeholder width="100%" height="200px" />}
		</div>
	);
}

export default TagMap;
