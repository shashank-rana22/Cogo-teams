import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import CommonLoader from '../../../common/Loader';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

function OfferLetter({ offerLetter, setShowCtcBreakupModal, offerLetterApiLoading }) {
	const [viewCtcBreakupModal, setViewCtcBreakupModal] = useState(false);

	const columns = getColumns({ setViewCtcBreakupModal, viewCtcBreakupModal });

	const showAddCtcButton = (offerLetter || []).every((item) => item?.status === 'rejected');

	if (offerLetterApiLoading) return <CommonLoader />;

	if (isEmpty(offerLetter)) {
		return (
			<div className={styles.container}>
				
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={offerLetter} loading={offerLetterApiLoading} />
		</div>
	);
}

export default OfferLetter;
