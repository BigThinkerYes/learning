import React, { useEffect, useState } from 'react';
import supabase from '../db/supabaseClient';
import { Route, useNavigate } from 'react-router-dom';
import Login from './loginpage';
import styled from 'styled-components';
import Message from './Messages';

const FormWrapper = styled.div`
// background-color: #ecf0f1;
// height: 100%;
// width: 100vw;
// display:flex;
// align-items:center;
// justify-content:center;
// overflow-y: scroll;
> h1{
  
}
span h1{

  //  padding: 10px;
 
  // margin-bottom: 10px;
  // margin-right: 25%;
  //  border-radius: 10px;
  // color:#8395a7;
  // font-size: 12px;

  // border: 1px solid #ff6b6b;
}
`;

const ChatMessages = styled.div`
// width: 50%;
// border-bottom:1px solid #ff6b6b;
`;

const Msgs = styled.div`
// margin-top: 200px;
// border:1px solid #ff6b6b;
// padding: 55px;
// border-radius: 10px;
// position: relative;
// top: 36%
`;
const MsgsGrid = styled.div`
margin-top: 430px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
`;

export default function Home(){
  const [fetchError, setFetchError] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const {data, error} = await supabase
      .from('chatMessage')
      .select()

      if (error){
        setFetchError('could not get messages')
        setChatMessages(null)
        console.log(error);
      }
      if (data){
        setChatMessages(data)
        setFetchError(null)
      }
    }
    fetchMessages()
  }, []);

    return(
     <>
        <FormWrapper>
        <span><h1>chat logs</h1></span>
        {fetchError && (<p>{fetchError}</p>)}
        <ChatMessages>
        {chatMessages && (
          <Msgs>
            <MsgsGrid>
            {chatMessages.map(chatMessaged => (
              <Message key={chatMessaged.id} chatMessaged={chatMessaged} />
            ))}
            </MsgsGrid>
          </Msgs>
        )}
        </ChatMessages>
        </FormWrapper>
     </>
    );
}
