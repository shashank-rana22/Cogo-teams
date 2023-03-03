import { Pagination } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyQuestionListState from '../../../../../../commons/EmptyQuestionListState';
import Spinner from '../../../../../../commons/Spinner';
import useListFaqQuestions from '../../../../hooks/useListFaqQuestion';
import Questions from '../../QuestionsList/Questions';
import SearchFound from '../../SearchFound';

import styles from './styles.module.css';

function MostReadFaqResults({ searchState }) {
	const sort = true;

	const {
		page,
		setPage = () => {},
		paginationData,
		data,
		loading = false,
	} = useListFaqQuestions({ searchState, sort });

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="7px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	if (isEmpty(data?.list)) {
		return (<EmptyQuestionListState />);
	}

	return (
		<div>
			<h1 className={styles.title}>
				{startCase('Most Read FAQS')}
			</h1>

			{!searchState
				? (

					<>
						{data?.list.map((question) => (
							<div className={styles.border}><Questions questions={question} /></div>
						))}

						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={paginationData?.total_count}
								pageSize={paginationData?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					</>

				) : <SearchFound searchState={searchState} />}
		</div>
	);
}

export default MostReadFaqResults;
