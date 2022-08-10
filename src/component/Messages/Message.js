import { useSubscription } from "@apollo/client";
import { useRef } from "react";
import { GET_MESSAGES } from "../../Utils/Query";

export const Messages = ({senderUserName, receiverUserName}) =>{
    const {data} = useSubscription(GET_MESSAGES);
    const scrollRef = useRef();
    if(!data){
        return null;
    }
    const filterMessage = data.messages.filter(message => (message.senderName === senderUserName && message.receiverName === receiverUserName) || 
      (message.senderName === receiverUserName && message.receiverName === senderUserName))
    return (
      <>
        {filterMessage.map(({id, senderName, text})=>{
          return(
            <div ref={scrollRef} key={id}>
              <div className={`message ${
                  senderUserName===senderName ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
}
  