import { Button, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetTaggingBills from '../../../hook/useGetMappings';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({ billId }: { billId: string }) {
	const { mappingsData, loading } = useGetTaggingBills({
		billId,
	});

	const classname = !isEmpty(mappingsData?.merge) ? 'merge' : '';

	return (
		<>
			<div>
				{!loading ? (
					<div className={`${styles.flex} ${classname === 'merge' ? styles.merge : ''}`}>
						{!isEmpty(mappingsData)
							? (
								mappingsData?.merge || mappingsData?.split || []
							).map((item) => (
								<div className={`${styles.flex} ${styles.bordernone} ${styles.wrapper}`}>
									<TagCard
										item={item}
										classname={classname}
										isfirst
									/>
								</div>
							))
							: <div className={styles.empty}>No Taggings Found</div>}
					</div>
				) : <Placeholder width="100%" height="200px" />}
			</div>
			{!isEmpty(mappingsData) && (
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
					>
						Approve
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ border: '1px solid #ed3726', marginLeft: '10px' }}
					>
						Reject
					</Button>
				</div>
			)}
		</>

	);
}

export default TagMap;
