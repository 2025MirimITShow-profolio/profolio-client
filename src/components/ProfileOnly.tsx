import { useRef, useState } from "react";
import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";
import ProfileInfo from "./Dashboard/ProfileInfo";
import ModalPortal from "./ModalPortal";
import ProfileEdit from "./Dashboard/ProfileEdit";

type ProfileProps = {
	isDark: boolean;
};

const ProfileWrapper = styled.div<ProfileProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 32px;
	right: 48px;
	z-index: 10;
`;

const ProfileBox = styled.div<ProfileProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	transition: background 0.2s;
`;

const ProfileImg = styled.img`
	width: 66px;
	height: 66px;
	border-radius: 50%;
	background: #eeeeee;
	object-fit: cover;
	margin-left: 24px;
	margin-right: 19px;
`;

const DownIcon = styled.img`
	width: 14px;
	height: 6px;
	stroke-width: 1.5px;
	margin-right: 19px;
`;

export default function ProfileOnly() {
	const isDark = useThemeStore((store) => store.isDark);
	const [showInfo, setShowInfo] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [name, setName] = useState("이자연");
	const [job, setJob] = useState("디자이너");
	const profileRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div>
				<ProfileWrapper isDark={isDark}>
					<ProfileBox
						isDark={isDark}
						ref={profileRef}
						onClick={() => setShowInfo(true)}
					>
						<ProfileImg
							src="/images/profileImg.png"
							alt="프로필 이미지"
						/>
						<DownIcon src="/images/downBtn.svg" alt="더보기" />
						{showInfo && (
							<ProfileInfo
								name={name}
								job={job}
								setShowInfo={setShowInfo}
								setShowEdit={setShowEdit}
							/>
						)}
					</ProfileBox>
				</ProfileWrapper>
			</div>
			{showEdit && (
				<ModalPortal>
					<ProfileEdit
						name={name}
						setName={setName}
						job={job}
						setJob={setJob}
						isDark={isDark}
						setShowEdit={setShowEdit}
					/>
				</ModalPortal>
			)}
		</>
	);
}
