import { useEffect, useState, useRef } from 'react';
import styles from '../../style/TodoBox.module.css'
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { PiDotsThreeBold } from "react-icons/pi";

type Todo = {
  id: number;
  title: string;
  is_done: boolean;
  date: string;
};

type TodoBoxProps = {
  todos: Todo[];
  onAdd: (title: string) => void;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export default function TodoBox({ todos, onAdd, onCheck, onDelete, onEdit }: TodoBoxProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [input, setInput] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");


  const handleAddClick = () => {
    setIsAdding(prev => !prev);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setIsAdding(false);
      return;
    }
    onAdd(input.trim());
    setInput("");
    setIsAdding(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unfinishedTodos = todos.filter(todo => !todo.is_done);
  const finishedTodos = todos.filter(todo => todo.is_done);

  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <p style={{fontSize: '27px', fontWeight: '500', cursor: 'pointer'}}>해야 할 일</p>
        <div
          onClick={handleAddClick}
          style={{padding: '8px', backgroundColor: '#eeeeee', borderRadius: '50%'}}>
          <AiOutlinePlus color='#777777' size={24}/>
        </div>
      </div>
      <hr style={{width: '100%', height: '1px', color: '#eeeeee'}}></hr>
      <div>
        <ul className={styles.todoList}>
          {unfinishedTodos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              {!todo.is_done ? (
                <div
                  style={{ width: '33px', height: '33px', border: 'solid 1px #cccccc', borderRadius: '3px' }}
                  onClick={() => onCheck(todo.id)}
                />
              ) : (
                <div
                  style={{
                    width: '33px', height: '33px', backgroundColor: '#8734fd',
                    borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={() => onCheck(todo.id)}
                >
                  <BiCheck size={26} color='white' />
                </div>
              )}

              {editingId === todo.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editInput.trim()) {
                      onEdit(todo.id, editInput.trim());
                    }
                    setEditingId(null);
                  }}
                >
                  <input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                    className={styles.input}
                  />
                </form>
              ) : (
                <span style={{
                  fontWeight: '500',
                  textDecoration: todo.is_done ? 'line-through' : 'none',
                }}>
                  {todo.title}
                </span>
              )}

              <div style={{ position: 'relative', marginLeft: 'auto', cursor: 'pointer' }}>
                <PiDotsThreeBold
                  color='#868686'
                  size={21}
                  onClick={() => setOpenMenuId(todo.id === openMenuId ? null : todo.id)}
                />
                {openMenuId === todo.id && (
                  <div
                    ref={menuRef}
                    style={{
                      width: '115px',
                      position: 'absolute',
                      top: '-30px',
                      left: '50px',
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      zIndex: 10,
                    }}
                  >
                    <button
                      style={{ padding: '11px 0', display: 'block', width: '100%', fontSize: '16px' }}
                      onClick={() => {
                        setEditInput(todo.title);
                        setEditingId(todo.id);
                        setOpenMenuId(null);
                      }}
                    >
                      수정하기
                    </button>
                    <hr />
                    <button
                      style={{ padding: '11px 0', display: 'block', width: '100%', fontSize: '16px' }}
                      onClick={() => {
                        onDelete(todo.id);
                        setOpenMenuId(null);
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}

          {isAdding && (
            <li className={styles.todoItem}>
              <div
                style={{ width: '33px', height: '33px', border: 'solid 1px #cccccc', borderRadius: '3px' }}
              />
              <form onSubmit={handleInputSubmit}>
                <input
                  type="text"
                  placeholder="할 일 입력"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onBlur={() => {
                    setIsAdding(false);
                    setInput("");
                  }}
                  className={styles.input}
                  autoFocus
                />
              </form>
            </li>
          )}

          {finishedTodos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              <div
                style={{
                  width: '33px', height: '33px', backgroundColor: '#8734fd',
                  borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onClick={() => onCheck(todo.id)}
              >
                <BiCheck size={26} color='white' />
              </div>
              {editingId === todo.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editInput.trim()) {
                      onEdit(todo.id, editInput.trim());
                    }
                    setEditingId(null);
                  }}
                >
                  <input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                    className={styles.input}
                  />
                </form>
              ) : (
                <span style={{ fontWeight: '500', textDecoration: 'line-through' }}>
                  {todo.title}
                </span>
              )}
              <div style={{ position: 'relative', marginLeft: 'auto', cursor: 'pointer' }}>
                <PiDotsThreeBold
                  color='#868686'
                  size={21}
                  onClick={() => setOpenMenuId(todo.id === openMenuId ? null : todo.id)}
                />
                {openMenuId === todo.id && (
                  <div
                    ref={menuRef}
                    style={{
                      width: '115px',
                      position: 'absolute',
                      top: '-30px',
                      left: '50px',
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      zIndex: 10,
                    }}
                  >
                    <button
                      style={{ padding: '11px 0', display: 'block', width: '100%', fontSize: '16px' }}
                      onClick={() => {
                        setEditInput(todo.title);
                        setEditingId(todo.id);
                        setOpenMenuId(null);
                      }}
                    >
                      수정하기
                    </button>
                    <hr />
                    <button
                      style={{ padding: '11px 0', display: 'block', width: '100%', fontSize: '16px' }}
                      onClick={() => {
                        onDelete(todo.id);
                        setOpenMenuId(null);
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}