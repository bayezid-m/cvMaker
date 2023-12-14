import Modal from 'react-modal';
import useAppDispatch from '../hooks/useAppDispatch';
import { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelecter';
import { deleteCVById, getCVByEmail } from '../redux/reducers/UserCVReducer';
import { useNavigate } from 'react-router-dom';


interface MyModalProps {
    isOpen: boolean;
    closeModal: () => void;
    content: string;
    owner: string;
  }
  
  const MyModal: React.FC<MyModalProps> = ({ isOpen, closeModal, content, owner }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { user} = useAppSelector(state => state.userReducer);
    const { userCV } = useAppSelector(state => state.userCVReducer)

    useEffect(() => {
  
    }, [])
  
    const CVUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + content + ".jpg"
    
    const handleDelete = (id: string) => {
        dispatch(deleteCVById(id))
        closeModal()
        navigate('/profile')
        dispatch(getCVByEmail({ email: user?.email }))
      }
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>     
          <button onClick={closeModal} >Close</button>
          {user.email===owner?<div>
            <button onClick={() => handleDelete(userCV?._id as string)}>Delete</button>
          </div>:<div></div>}
          <p></p>
          <img src={CVUrl}  alt=" " style={{height:"1080px"}}></img>
        </div>
      </Modal>
    );
  };
  export default MyModal;