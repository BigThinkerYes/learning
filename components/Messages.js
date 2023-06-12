import { Link } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import supabase from '../db/supabaseClient';
import styled from 'styled-components';

const Msg = styled.div`
// background-color: #fff;
color:#ff6b6b;
padding: 20px;
width: 50%;
border-radius: 10px;
`;
const Msgs = styled.div`
background-color:#ff6b6b;
padding: 40px;
width: 50%;
border-radius: 10px;
`;

export default function Message({ chatMessaged }){
   const handleDelete = async ()=>{
    const {data, error} = await supabase
    .from('chatMessage')
    .delete()
    .eq('id', chatMessaged.id)
    .select()

    if (error){
        console.log(error)
    }
    if(data){
        console.log(data)
    }
    }
    return(
        <div className="msgs">
           <h3><Msg>{chatMessaged.message}</Msg><Msgs>{chatMessaged.created_at}</Msgs></h3>
           <div className="buttons">
                <Link to={'/' + chatMessaged.id}>
                    <EditNoteIcon />
                </Link>
                <DeleteIcon onClick={handleDelete} />
            </div>
        </div>
    )
}