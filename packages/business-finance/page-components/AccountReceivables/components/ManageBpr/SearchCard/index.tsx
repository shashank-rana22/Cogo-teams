import { Input } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function SearchCard() {
	const [orgData, setOrgData] = useState();
	const {
		inputSerialId,
		setInputSerialId,
		handleKeyDown,
		setInputName,
		inputName,
	} = useGetOrganizationVerify({
		setOrgData,
	});

	const { createBpr, loadingOnSave } = useSaveVerifiedOrganization({
		setInputSerialId,
		setInputName,
		refetch,
		setOrgData,
	});

	return (
		<div>
			{' '}
			<div className={styles.card}>
				<div className={styles.Heading}>Manage BPR</div>

				<div className={styles.SearchContainer}>
					<div className={styles.SearchBySerialId}>
						<Input
							size="md"
							value={inputSerialId}
							onChange={(event) => {
								setInputSerialId(event.target.value);
							}}
							placeholder="Search by serial id"
							onKeyDown={handleKeyDown}
							suffix={<IcMSearchlight />}
						/>
					</div>

					<div className={styles.SearchByName}>
						<SelectController
							{...fields.businessName}
							value={inputName}
							theme="admin"
							handleChange={(event) => {
								setInputName(event?.target?.value);
								setOrgData(event);
								setInputSerialId('');
							}}
						/>
					</div>
				</div>

				{orgData && (
					<DetailsCard>
						<SubContainer>
							<IdContainer>
								<LabelText>Serial Id</LabelText>
								<ValueText>{orgData?.serial_id}</ValueText>
							</IdContainer>
							<NameContainer>
								<LabelText>Bussiness Name</LabelText>
								<ValueText>{orgData?.legal_business_name}</ValueText>
							</NameContainer>

							<Button
								disabled={loadingOnSave}
								size="md"
								type="submit"
								onClick={() => createBpr(
                        		orgData?.serial_id,
                        		orgData?.legal_business_name,
                        		orgData?.id,
								)}
							>
								SAVE BPR
							</Button>
						</SubContainer>
					</DetailsCard>
				)}
			</div>

		</div>
	);
}

export default SearchCard;
