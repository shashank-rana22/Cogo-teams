import { Placeholder, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import CreateResponse from '../../common/CreateResponse';
import useSubmitResponses from '../../hooks/useSubmitResponses';

import DetailsCard from './DetailsCard';
import styles from './styles.module.css';

function Response(props) {
	const {
		responseData,
		loading,
		activeTab,
		setResponseData,
		showAddPoc,
		setShowAddPoc,
		refetch,

	} = props;

	const { handleResponseSubmit, loadingSubmit } = useSubmitResponses({ responseData, setResponseData, refetch });

	if (loading) {
		return (
			<div className={styles.loading}>
				<Placeholder height="320px" width="100%" />
			</div>
		);
	}

	if (isEmpty(responseData)) {
		return (
			<CreateResponse
				loading={loading}
				activeTab={activeTab}
				responseData={responseData}
				setResponseData={setResponseData}
				type="create"
			/>
		);
	}

	return (
		<section>

			<section>
				{(responseData).map((user, index) => (
					<DetailsCard
						key={user.id}
						user={user}
						index={index}
						responseData={responseData}
						setResponseData={setResponseData}
						loading={loading}
						activeTab={activeTab}
					/>
				))}

			</section>
			<section>
				{showAddPoc && (
					<CreateResponse
						loading={loading}
						activeTab={activeTab}
						responseData={responseData}
						setResponseData={setResponseData}
						setShowAddPoc={setShowAddPoc}
						showAddPoc={showAddPoc}
						type="addPoc"
					/>

				)}
			</section>

			{!isEmpty(responseData) && !showAddPoc && (
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
