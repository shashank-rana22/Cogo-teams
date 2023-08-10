import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import CommonLoader from '../../../common/Loader';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

function OfferLetter({ offerLetter, offerLetterApiLoading, profileData }) {
	const [viewCtcBreakupModal, setViewCtcBreakupModal] = useState(false);

	const { is_offer_letter_applicable } = profileData?.detail || {};

	const columns = getColumns({ setViewCtcBreakupModal, viewCtcBreakupModal, is_offer_letter_applicable });

	if (offerLetterApiLoading) return <CommonLoader />;

	if (isEmpty(offerLetter)) {
		return (
			<div className={styles.container}>
				<EmptyState />
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
