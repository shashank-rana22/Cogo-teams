import React, { useMemo } from 'react';
import { Skeleton } from '@cogoport/front/components/admin';
import Button from '@cogoport/front/components/Button';
import { ToolTip } from '@cogoport/front/components';
import { useSelector } from '@cogo/store';
import Heading from '../../../common/Heading';
import { Container, HeadingContainer, Content, Detail } from './styles';
import ImportSvg from '../../../assets/ic_import.svg';
import EditRoles from './EditRoles';

const RoleDetails = ({
	loading = false,
	roleData = {},
	onImport = () => {},
	getRole = () => {},
}) => {
	const isMobile = useSelector(({ general }) => general?.isMobile);

	const {
		permissions = [],
		name = '',
		remarks: descriptions = '',
		stakeholder_type = '',
		importedPermissions,
	} = roleData;

	const details = useMemo(
		() => [
			{
				title: 'Role',
				data: name || '',
				skeleton: { width: !isMobile ? '240px' : '80%' },
			},
			{
				title: 'Short Name',
				data: roleData?.short_name || '-',
				skeleton: { width: !isMobile ? '150px' : '50%' },
			},
			{
				title: 'Partner',
				data: (roleData?.partner?.business_name || '-').toUpperCase(),
				skeleton: { width: !isMobile ? '150px' : '50%' },
			},
			{
				title: 'Role Description',
				data: descriptions || '',
				skeleton: { width: !isMobile ? '300px' : '100%' },
			},
		],
		[name, stakeholder_type, descriptions, isMobile],
	);

	const isImported = !!importedPermissions;

	let importPermissionsButton = null;
	if (loading) {
		importPermissionsButton = (
			<Skeleton height="40px" width={!isMobile ? '100px' : '100%'} />
		);
	} else if (permissions?.length === 0) {
		importPermissionsButton = (
			<ToolTip
				placement="top"
				theme="light"
				trigger="mouseenter"
				interactive
				content={<div>Prefill permissions from other roles</div>}
			>
				<div>
					<Button
						style={{
							background: '#356EFD',
							borderRadius: '12px',
							borderColor: '#356EFD',
							height: 'auto',
							padding: '6px 16px',
							display: 'flex',
							alignItems: 'center',
						}}
						onClick={onImport}
					>
						<ImportSvg size={1.25} style={{ marginRight: 8 }} />
						{isImported ? 'Clear Import' : 'Import Role'}
					</Button>
				</div>
			</ToolTip>
		);
	}

	return (
		<Container>
			<HeadingContainer>
				<Heading
					title="Update Role"
					subTitle="Update permissions for the role"
				/>

				<EditRoles roleData={roleData} getRole={getRole} />
				{importPermissionsButton}
			</HeadingContainer>

			<Content>
				{details?.map((detail) => (
					<Detail>
						<span className="title">{detail?.title}</span>
						{loading ? (
							<Skeleton height="16px" width={detail?.skeleton.width} />
						) : (
							<span className="data">{detail?.data}</span>
						)}
					</Detail>
				))}
			</Content>
		</Container>
	);
};

export default RoleDetails;
