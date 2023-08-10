import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyState';
import Spinner from '../../../../common/Spinner';
import useGetHistory from '../../../../hooks/useGetHistory';

import styles from './styles.module.css';

function ModificationHistory({ openHistory, handleClose, ratingCycle }) {
	const { data : modificationHistory = [], loading } = useGetHistory(ratingCycle);

	return (
		<Modal size="md" show={openHistory} onClose={handleClose} placement="top">
			{loading ? (
				<div className={styles.spinner_container}>
					<Spinner />
				</div>
			) : (
				<>
					<Modal.Header title="Modification History" />
					<Modal.Body>
						{isEmpty(modificationHistory) ? <EmptyState />
							: (modificationHistory || []).map((val) => (
								<div className={styles.modification_history} key={val.id}>
									<div className={styles.history_text}>
										Modified by :
										{' '}
										{val.manager_name}
										{' '}
										from
										{' '}
										{val.old_rating}
										{' '}
										<IcMArrowNext />
										{' '}
										{val.new_rating}
									</div>
									<div className={styles.history_text}>
										Comment :
										{' '}
										{val.comment || '-'}
									</div>
									<div className={styles.history_text}>
										Modified on :
										{' '}
										{formatDate({
											date       : val.updated_at,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
											formatType : 'dateTime',
										})}
									</div>
								</div>
							))}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={handleClose}>OK</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default ModificationHistory;
