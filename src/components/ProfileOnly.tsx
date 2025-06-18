import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import { useUserStore } from "../store/userStore";
import axios from "axios";
import ProfileInfo from "./Dashboard/ProfileInfo";
import ModalPortal from "./ModalPortal";
import ProfileEdit from "./Dashboard/ProfileEdit";
import styled from "styled-components";
import styles from "../style/Header.module.css";

type ProfileProps = {
	isDark: boolean;
};

const Profile = styled.div<ProfileProps>`
	background-color: transparent;
	width: 118px;
	height: 66px;
	border-radius: 100px;
	display: flex;
	align-items: center;
	column-gap: 19px;
	position: absolute;
	right: 2.9%;
	&:hover {
		background-color: ${({ isDark }) =>
			isDark ? "#2B2B37" : "#F5F6F8"} !important;
	}
`;

export default function ProfileOnly() {
	const isDark = useThemeStore((store) => store.isDark);
	const token = useUserStore((store) => store.token);
	const [showInfo, setShowInfo] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	const [birth, setBirth] = useState("");
	const [email, setEmail] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const profileRef = useRef<HTMLDivElement>(null);

	const getUser = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/users`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			console.log(res.data);
			setName(data.name);
			setJob(data.job);
			setBirth(data.birth_date.split("T")[0].replace(/-/g, "."));
			setEmail(data.email);
			setProfileImg(data.profile_image);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				profileRef.current &&
				!profileRef.current.contains(e.target as Node)
			) {
				setShowInfo(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const patchUser = async () => {
			if (name === "" || job === "") return;
			try {
				const res = await axios.patch(
					`${import.meta.env.BASE_URL}/users`,
					{ name, job },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				const data = res.data;
				setName(data.name);
				setJob(data.job);
			} catch (error) {
				console.log(error);
			}
		};
		patchUser();
	}, [showEdit]);

	return (
		<>
			<Profile
				isDark={isDark}
				ref={profileRef}
				onClick={() => setShowInfo(true)}
			>
				<img
					src={`/images/profile/profile${profileImg}.png`}
					alt="프로필 이미지"
					className={styles.profileImg}
				/>
				<img
					src="/images/downBtn.svg"
					alt="더보기"
					className={styles.moreBtn}
				/>
				{showInfo && (
					<ProfileInfo
						name={name}
						job={job}
						birth={birth}
						email={email}
						profileImg={profileImg}
						setShowInfo={setShowInfo}
						setShowEdit={setShowEdit}
					/>
				)}
			</Profile>
			{showEdit && (
				<ModalPortal>
					<ProfileEdit
						name={name}
						setName={setName}
						job={job}
						birth={birth}
						email={email}
						profileImg={profileImg}
						setJob={setJob}
						isDark={isDark}
						setShowEdit={setShowEdit}
					/>
				</ModalPortal>
			)}
		</>
	);
}
