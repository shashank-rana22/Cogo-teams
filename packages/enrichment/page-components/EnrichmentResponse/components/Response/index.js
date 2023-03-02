import { Placeholder, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useSubmitResponses from '../../hooks/useSubmitResponses';

import CreateResponse from './CreateResponse';
import List from './List';
import styles from './styles.module.css';

function Response(props) {
	const {
		list,
		loading,
		activeTab,
		showAddPoc,
		setShowAddPoc,
		refetch,

	} = props;

	const [responses, setResponses] = useState([]);

	useEffect(() => {
		setResponses([...list]);
	}, [list]);

	// eslint-disable-next-line max-len
	const { handleResponseSubmit, loadingSubmit }	 = 	useSubmitResponses({ responses, setResponses, refetch, activeTab });

	if (loading) {
		return (
			<div className={styles.loading}>
				<Placeholder height="320px" width="100%" />
			</div>
		);
	}

	if (isEmpty(responses)) {
		return (
			<CreateResponse
				loading={loading}
				activeTab={activeTab}
				responses={responses}
				setResponses={setResponses}
				type="create"
			/>
		);
	}

	return (
		<section>

			<section>
				{(responses).map((user, index) => (
					<List
						key={user.id}
						user={user}
						index={index}
						loading={loading}
						activeTab={activeTab}
						responses={responses}
						setResponses={setResponses}
					/>
				))}

			</section>
			<section>
				{showAddPoc && (
					<CreateResponse
						loading={loading}
						activeTab={activeTab}
						responses={responses}
						setResponses={setResponses}
						setShowAddPoc={setShowAddPoc}
						showAddPoc={showAddPoc}
						type="addPoc"
					/>

				)}
			</section>

			{!isEmpty(responses) && !showAddPoc && (
				<section className={styles.footer}>

					<div>
						<Button
							themeType="secondary"
							size="md"
							type="button"
							onClick={() => setShowAddPoc(true)}
						>
							<IcMPlus className={styles.add_more_icon} />
							Add More
						</Button>
					</div>

					<div>
						<Button
							themeType="primary"
							size="md"
							type="button"
							loading={loadingSubmit}
							onClick={(e) => handleResponseSubmit(e)}
						>
							Submit
						</Button>
					</div>
				</section>
			)}
		</section>
	);
}

export default Response;
