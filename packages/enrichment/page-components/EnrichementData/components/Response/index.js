import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import CreateResponse from '../../common/CreateResponse';
import useSubmitResponses from '../../hooks/useSubmitResponses';
import DetailsCard from '../DetailsCard';

import styles from './styles.module.css';

function Response({
	responseData = [],
	loading = false,
	activeTab = '',
	setResponseData = () => {},
	showAddPoc = false,
	setShowAddPoc = () => {},

}) {
	const { handleResponseSubmit = () => {} } = useSubmitResponses({ responseData, setResponseData });

	return (
		<div>

			{responseData.length === 0 ? (
				<CreateResponse
					loading={loading}
					activeTab={activeTab}
					responseData={responseData}
					setResponseData={setResponseData}
					type="create"
				/>
			) : (
				(responseData || []).map((user, index) => (

					<DetailsCard
						key={user.id}
						user={user}
						index={index}
						responseData={responseData}
						setResponseData={setResponseData}
						loading={loading}
						activeTab={activeTab}
					/>
				)))}

			{showAddPoc && (
				<CreateResponse
					loading={loading}
					activeTab={activeTab}
					responseData={responseData}
					setResponseData={setResponseData}
					setShowAddPoc={setShowAddPoc}
					showAddPoc={showAddPoc}
					type="create"

				/>

			)}

			{!isEmpty(responseData) && !showAddPoc && (
				<div className={styles.footer}>

					<div>
						<Button
							themeType="secondary"
							size="md"
							type="button"
							onClick={() => setShowAddPoc(true)}
						>
							<IcMPlus style={{ marginRight: '4px' }} />
							Add More
						</Button>
					</div>

					<div>
						<Button
							themeType="primary"
							size="md"
							type="button"
							onClick={(e) => handleResponseSubmit(e)}
						>
							Submit
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Response;
