import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import DetailsCard from '../DetailsCard';
import DetailsForm from '../DetailsForm';

import styles from './styles.module.css';

function Response({
	responseData = [],
	loading = false,
	activeTab = '',
	setResponseData = () => {},
	showAddPoc = false,
	setShowAddPoc = () => {},

}) {
	return (
		<div>

			{responseData.length === 0 ? (
				<DetailsForm
					loading={loading}
					activeTab={activeTab}
					responseData={responseData}
					setResponseData={setResponseData}
				/>
			) : (responseData || []).map((user, index) => (

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

			{showAddPoc && (
				<DetailsForm
					loading={loading}
					activeTab={activeTab}
					responseData={responseData}
					setResponseData={setResponseData}
					setShowAddPoc={setShowAddPoc}
					showAddPoc={showAddPoc}

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
