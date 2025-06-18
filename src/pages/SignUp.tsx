import styles from "../style/SignUp.module.css";
import { useThemeStore } from "../store/themeStore";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer, {
	InputBox,
	NextBtn,
	AuthenticationInput,
} from "../components/LonginContainer";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";
import axios from "axios";

type SetStepProps = {
	setStep: (val: number) => void;
};

export function Id({
	setStep,
	email,
	setEmail,
}: SetStepProps & {
	email: string;
	setEmail: (val: string) => void;
}) {
	const navigate = useNavigate();
	const isDark = useThemeStore((store) => store.isDark);

	return (
		<>
			<span className={styles.text}>이메일을 입력해주세요</span>
			<span className={styles.subText}>
				로그인 시 사용할 메일을 입력해주세요
			</span>
			<InputBox isDark={isDark}>
				<input
					placeholder="이메일을 입력하세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</InputBox>
			<NextBtn
				isDark={isDark}
				disabled={email === "" ? true : false}
				onClick={() => setStep(1)}
			>
				다음
			</NextBtn>
			<div className={styles.noIdContainer}>
				<span>아이디를 가지고 있나요?</span>
				<span
					className={styles.signupBtn}
					onClick={() => navigate("/login")}
				>
					Log in
				</span>
			</div>
		</>
	);
}

export function Authentication({ setStep }: SetStepProps) {
	const isDark = useThemeStore((store) => store.isDark);
	const length = 6;
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const [otp, setOtp] = useState(Array(length).fill("-"));
	const [authentication, setAuthentication] = useState(false);

	const handleChange = (value: string, index: number) => {
		if (!/^[0-9]?$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < length - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === "Backspace") {
			if (otp[index] != "-") {
				const newOtp = [...otp];
				newOtp[index] = "-";
				setOtp(newOtp);
			} else if (index > 0) {
				inputRefs.current[index - 1]?.focus();
			}
			e.preventDefault();
		} else {
			const key = e.key;
			if (!/^[0-9]?$/.test(key)) return;
			const newOtp = [...otp];
			newOtp[index] = "";
			setOtp(newOtp);
		}
	};

	useEffect(() => {
		setAuthentication(otp.every((digit) => digit !== "-"));
	}, [otp]);

	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	return (
		<>
			<span className={styles.text}>인증번호를 입력해주세요</span>
			<span className={styles.subText}>
				이메일로 인증 코드를 보냈습니다
			</span>
			<div className={styles.authenticationBox}>
				{otp.map((digit, idx) => (
					<AuthenticationInput
						key={idx}
						ref={(el) => {
							inputRefs.current[idx] = el!;
						}}
						type="text"
						maxLength={1}
						value={digit}
						onChange={(e) => handleChange(e.target.value, idx)}
						onKeyDown={(e) => handleKeyDown(e, idx)}
						autoFocus={idx === 0}
						isDark={isDark}
						style={digit === "-" ? { color: "#999" } : {}}
					/>
				))}
			</div>
			<NextBtn
				isDark={isDark}
				disabled={!authentication}
				onClick={() => setStep(2)}
			>
				다음
			</NextBtn>
			<div className={styles.noIdContainer}>
				<span>인증번호를 받지 못했나요?</span>
				<span className={styles.signupBtn}>다시 보내기</span>
			</div>
		</>
	);
}

export function Password({
	setStep,
	password,
	setPassword,
}: SetStepProps & {
	password: string;
	setPassword: (val: string) => void;
}) {
	const isDark = useThemeStore((store) => store.isDark);
	const [password2, setPassword2] = useState("");

	return (
		<>
			<span className={styles.text}>비밀번호를 설정해주세요</span>
			<span className={styles.subText}>
				로그인 시 사용할 비밀번호를 입력해주세요
			</span>
			<InputBox isDark={isDark}>
				<input
					placeholder="비밀번호를 입력하세요"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</InputBox>
			<InputBox isDark={isDark}>
				<input
					placeholder="비밀번호 확인"
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
				/>
			</InputBox>
			<NextBtn
				isDark={isDark}
				disabled={password === "" || password2 === "" ? true : false}
				onClick={() => {
					if (password != password2) {
						alert("비밀번호가 일치하지 않습니다");
					} else {
						setStep(3);
					}
				}}
			>
				다음
			</NextBtn>
		</>
	);
}

export function Profile({
	setStep,
	profileImg,
	setProfileImg,
	name,
	setName,
	job,
	setJob,
	birth,
	setBirth,
}: SetStepProps & {
	profileImg: number;
	setProfileImg: (val: number) => void;
	name: string;
	setName: (val: string) => void;
	job: string;
	setJob: (val: string) => void;
	birth: Date | null;
	setBirth: (val: Date) => void;
}) {
	const isDark = useThemeStore((store) => store.isDark);
	const profileNumber = Array.from({ length: 13 }, (_, i) => i + 1);
	const [showProfile, setShowProfile] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);

	const handleSelect = (date: Date) => {
		setBirth(date);
	};

	return (
		<>
			<p className={styles.text} style={{ textAlign: "center" }}>
				프로필을 만들어주세요
			</p>
			<div className={styles.profileContainer}>
				<div className={styles.profile}>
					<img
						src={`/images/profile/profile${profileImg}.png`}
						alt="프로필"
						style={{ borderRadius: "100px" }}
					/>
					<div className={styles.plusBtn}>
						<img
							style={{ cursor: "pointer" }}
							src="/images/plus.svg"
							alt="더보기"
							onClick={() => setShowProfile(true)}
						/>
					</div>
				</div>
				{showProfile && (
					<div
						className={styles.profileImgContainer}
						style={{ backgroundColor: isDark ? "#2B2B37" : "#FFF" }}
					>
						{profileNumber.map((i) => (
							<div
								key={i}
								className={styles.profileImg}
								style={
									i === profileImg
										? { border: "2px solid #8734FD" }
										: {}
								}
								onClick={() => setProfileImg(i)}
							>
								<img
									src={`/images/profile/profile${i}.png`}
									alt={`프로필${i}`}
								/>
							</div>
						))}
						<span
							className={styles.selectBtn}
							onClick={() => setShowProfile(false)}
						>
							선택
						</span>
					</div>
				)}
			</div>
			<p className={styles.option}>이름</p>
			<InputBox isDark={isDark}>
				<input
					placeholder="이름을 입력해주세요"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</InputBox>
			<p className={styles.option}>직업</p>
			<InputBox isDark={isDark}>
				<input
					placeholder="직업을 입력해주세요"
					value={job}
					onChange={(e) => setJob(e.target.value)}
				/>
			</InputBox>
			<p className={styles.option}>생년월일</p>
			<div className={styles.birthdayContainer}>
				<div
					className={styles.birthdayContainer}
					onClick={() => setShowCalendar((pre) => !pre)}
				>
					<InputBox isDark={isDark}>
						<span
							style={{
								fontSize: "27px",
								...(birth ? {} : { color: "#999" }),
							}}
						>
							{birth?.getFullYear() ?? "YYYY"}
						</span>
					</InputBox>
					<InputBox isDark={isDark}>
						<span
							style={{
								fontSize: "27px",
								...(birth ? {} : { color: "#999" }),
							}}
						>
							{birth ? birth.getMonth() + 1 : "MM"}
						</span>
					</InputBox>
					<InputBox isDark={isDark}>
						<span
							style={{
								fontSize: "27px",
								...(birth ? {} : { color: "#999" }),
							}}
						>
							{birth?.getDate() ?? "DD"}
						</span>
					</InputBox>
				</div>
				{showCalendar && (
					<Calendar
						date={birth ?? new Date()}
						onChange={handleSelect}
						locale={ko}
						maxDate={new Date()}
						className={styles.calendar}
					/>
				)}
			</div>
			<NextBtn
				isDark={isDark}
				disabled={
					name === "" || job === "" || birth === null ? true : false
				}
				onClick={() => setStep(4)}
			>
				다음
			</NextBtn>
		</>
	);
}

export default function SignUp() {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileImg, setProfileImg] = useState(1);
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	const [birth, setBirth] = useState<Date | null>(null);

	const postSignUp = async () => {
		try {
			console.log(step);
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/signup`,
				{
					profile_image: profileImg.toString(),
					email,
					password,
					name,
					job,
					birth_date: birth,
				}
			);
			const data = res.data;
			console.log(data);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (step >= 4) {
			postSignUp();
		}
	}, [step]);

	return (
		<LoginContainer>
			{step === 0 && (
				<Id setStep={setStep} email={email} setEmail={setEmail} />
			)}
			{step === 1 && <Authentication setStep={setStep} />}
			{step === 2 && (
				<Password
					setStep={setStep}
					password={password}
					setPassword={setPassword}
				/>
			)}
			{(step === 3 || step === 4) && (
				<Profile
					setStep={setStep}
					profileImg={profileImg}
					setProfileImg={setProfileImg}
					name={name}
					setName={setName}
					job={job}
					setJob={setJob}
					birth={birth}
					setBirth={setBirth}
				/>
			)}
		</LoginContainer>
	);
}
