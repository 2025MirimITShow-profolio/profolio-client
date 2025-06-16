import { useThemeStore } from '../../store/themeStore'
import { useState,useEffect, useRef } from "react"
import axios from "axios";
import { ko } from "date-fns/locale";
import styles from "../../style/DescriptionBox.module.css"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlinePlus } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { useUserStore } from "../../store/userStore";

export default function DescriptionBox({ projectId }: { projectId: number }) {
  const token = useUserStore((store) => store.token)
  const isDark = useThemeStore((store) => store.isDark)
  const [prjTitle, setPrjTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [links, setLinks] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState('');
  const profileImages = [
    '/images/memberprofile/member1.svg',
    '/images/memberprofile/member2.svg',
    '/images/memberprofile/member3.svg',
  ];
  const [skills, setSkills] = useState<string[]>([]);
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [newSkill, setNewSkill] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const memberBoxRef = useRef<HTMLDivElement>(null);
  const skillBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { title, description, start_date, end_date, links, team_members, skills } = res.data;

        setPrjTitle(title || '');
        setDescription(description || '');
        setStartDate(start_date ? new Date(start_date.replace(" ", "T")) : new Date());
        setEndDate(end_date ? new Date(end_date.replace(" ", "T")) : new Date());
        setLinks(links || '');
        setTeamMembers(team_members ? team_members.split(',') : []);
        setSkills(skills ? skills.split(',') : []);
        console.log(title, description);
      } catch (err) {
        console.error("프로젝트 데이터 불러오기 실패", err);
      }
    };

    fetchProject();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (memberBoxRef.current &&
        !memberBoxRef.current.contains(event.target as Node))
      ) {
        setIsAddingMember(false);
      }
      if(
        (skillBoxRef.current &&
        !skillBoxRef.current.contains(event.target as Node))
      ) {
        setIsAddingSkill(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/projects/${projectId}`, {
        title: prjTitle,
        description: description,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        links,
        team_members: teamMembers.join(','),
        skills: skills.join(',')
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditMode(false);
    } catch (err) {
      console.error("프로젝트 저장 실패", err);
    }
  };

  const handleButtonClick = () => {
    if (isEditMode) {
      handleSave();
    } else {
      setIsEditMode(true);
    }
  };

  const dateFormat = (date: Date) => {
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  }

  return(
    <div className={styles.container}>
      <div className={styles.mainbox}>
        <div style={{marginBottom: '22px'}}>
          <p className={styles.subtitle}>프로젝트 명</p>
          <input
            className={styles.titleinput}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}
            value={prjTitle}
            onChange={(e) => setPrjTitle(e.target.value)}
            readOnly={!isEditMode}
          >
          </input>
        </div>

        <div>
          <p className={styles.subtitle}>프로젝트 기간</p>
          <div className={styles.datepicker}>
            <DatePicker
              locale={ko}
              dateFormat='yyyy.MM.dd'
              selected={startDate}
              onChange={(date) => isEditMode && setStartDate(date || new Date())}
              selectsStart
              disabled={!isEditMode}
              customInput={
                <div className={styles.custominput}
                  style={{
                    backgroundColor: isDark? '#383843' : 'white',
                    color: isDark? '#999999' : '#666666',
                    border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
                  }}>
                  <FiCalendar color="#999999" size={20} />
                  {dateFormat(startDate)}
                </div>
              }
            />
            <div style={{fontSize: '24px', color: '#BBBBBB'}}>
              -
            </div>
            <DatePicker
              locale={ko}
              dateFormat='yyyy.MM.dd'
              selected={endDate}
              onChange={(date) => isEditMode && setEndDate(date || new Date())}
              selectsEnd
              minDate={startDate}
              disabled={!isEditMode}
              customInput={
                <div className={styles.custominput}
                  style={{
                    backgroundColor: isDark? '#383843' : 'white',
                    color: isDark? '#999999' : '#666666',
                    border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
                  }}>
                  <FiCalendar color="#999999" size={20} />
                  {dateFormat(endDate)}
                </div>
              }
            />

          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', marginBottom: '36px'}}>
          <div style={{paddingTop: '22px'}}>
            {isEditMode ? (
              <input
                className={styles.linkinput}
                style={{
                  backgroundColor: 'transparent',
                  color: isDark? '#B886FF' : '#8734FD',
                  border: 'none',
                }}
                type="text"
                placeholder="링크 추가하기"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
              />
              ) : (
                links ? (
                  <a
                    href={links.startsWith('http') ? links : `https://${links}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '19px', fontWeight: 400, color: isDark? '#B886FF' : '#8734FD', textDecoration: 'underline',
                    }}
                  >
                    {links}
                  </a>
              ) : (
                <div style={{ fontSize: '19px', color: isDark? '#B886FF' : '#8734FD', textDecoration: 'underline' }}>
                  링크 추가하기
                </div>
              )
            )}
          </div>

          <div className={styles.btn} onClick={handleButtonClick}>
            {isEditMode ? '완료하기' : '수정하기'}
          </div>

        </div>

        <div>
          <textarea
            className={styles.textarea}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!isEditMode}
            placeholder="기획 배경 및 주제 설명, 기여한 부분에 대한 설명을 자세히 작성해보세요."
          />
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex' }} ref={memberBoxRef}>
        {isEditMode && isAddingMember && (
          <div className={styles.addBtn}
            style={{position: 'absolute', left: '-488px', top: '-260px',
              border: isDark? '1px solid #333333' : '1px solid #eeeeee',
              backgroundColor: isDark? '#22222E' : 'white'
            }}>
            <p style={{fontSize: '22px', fontWeight: '500', color: isDark? 'white':'black', padding: '28px 0 24px 42px'}}>
              멤버 추가하기
            </p>
            <hr style={{height: '1px', border: 0, background: isDark? '#333333' : '#CCCCCC'}}></hr>
            <input
              className={styles.addbtnInput}
              style={{
                backgroundColor: isDark? '#383843':'#F5F6F8',
                border: isDark? '1px solid #555555' : '1px solid #ccc',
                color: isDark? 'white' : 'black'
              }}
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
            <button
              onClick={() => {
                if (newMember.trim()) {
                  setTeamMembers([...teamMembers, newMember.trim()]);
                  setNewMember('');
                  setIsAddingMember(false);
                }
              }}
              className={styles.memberAddbtn}
            >
              추가
            </button>
          </div>
        )}
      </div>

      <div style={{ position: 'relative', display: 'flex' }} ref={skillBoxRef}>
        {isEditMode && isAddingSkill && (
          <div className={styles.addBtn} style={{position: 'absolute', left: '-504px', top: '-0px',
              border: isDark? '1px solid #333333' : '1px solid #eeeeee',
              backgroundColor: isDark? '#22222E' : 'white'}}>
            <p style={{fontSize: '22px', fontWeight: '500', color: isDark? 'white':'black', padding: '28px 0 24px 42px'}}>
              스킬셋 추가하기
            </p>
            <hr style={{height: '1px', border: 0, background: isDark? '#333333' : '#CCCCCC'}}></hr>
            <input
              className={styles.addbtnInput}
              style={{
                backgroundColor: isDark? '#383843':'#F5F6F8',
                border: isDark? '1px solid #555555' : '1px solid #ccc',
                color: isDark? 'white' : 'black'
              }}
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="사용기술을 입력해주세요"
            />
            <button
              onClick={() => {
                if (newSkill.trim()) {
                  setSkills([...skills, newSkill.trim()]);
                  setNewSkill('');
                  setIsAddingSkill(false);
                }
              }}
              className={styles.memberAddbtn}
            >
              추가
            </button>
          </div>
        )}
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div>
          <p className={styles.subtitle} style={{marginBottom: '14px'}}>팀원</p>
          <div className={styles.membercontainer}
            style={{
              backgroundColor: isDark? '#22222E' : 'white',
            }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img
                  src={profileImages[index % profileImages.length]}
                  alt={`프로필 ${member}`}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ width: '60px', textAlign: 'center', marginTop: '10px', fontSize: '15px', color: isDark? 'white' : '#555555' }}>{member}</div>
              </div>
            ))}

            {isEditMode && teamMembers.length<6 && (
              <div
                onClick={() => setIsAddingMember(true)}
                style={{ border: isDark? 'dashed 1px #555555' : 'dashed 1px #EEEEEE', width: '60px', height: '88px', cursor: 'pointer', borderRadius: '10px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isDark? '#383843' : ''
                }}>
                <div
                  style={{padding: '8px', width: 'fit-content',backgroundColor: isDark? '#6C6C73' : '#eeeeee', borderRadius: '50px'}}>
                  <AiOutlinePlus color={isDark? '#999999' : '#777777'} size={20}/>
                </div>
              </div>
            )}
          </div>
        </div>
      
        <div className={styles.skillbox}>
          <p className={styles.subtitle} style={{marginBottom: '14px'}}>스킬셋</p>
          <div className={styles.skillcontainer}
            style={{
              backgroundColor: isDark? '#22222E' : 'white',
            }}>
            {skills.length > 0 && (
              skills.map((skill, index) => (
                <div key={index} className={styles.skillItem}
                  style={{
                    backgroundColor: isDark? '#383843' : '',
                    border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee',
                    color: isDark? 'white' : 'black'
                  }}>
                  {skill}
                </div>
            )))}

            {isEditMode && skills.length<4 && (
              <div
                onClick={() => setIsAddingSkill(true)}
                style={{ border: isDark? 'dashed 1px #555555' : 'dashed 1px #eeeeee',width: '213px', height: '50px', cursor: 'pointer', borderRadius: '5px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isDark? '#383843' : ''
                }}>
                <div
                  style={{padding: '7px', width: 'fit-content',backgroundColor: isDark? '#6C6C73' : '#eeeeee', borderRadius: '50px'}}>
                  <AiOutlinePlus color={isDark? '#999999' : '#777777'} size={10}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}