import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { useRef } from "react";
import { GET_MESSAGES, MESSAGES_QUERY } from "../../Utils/Query";

export const Messages = ({senderUserName, receiverUserName}) =>{
    const scrollRef = useRef();
    
    // const {data} = useSubscription(GET_MESSAGES);
    const { data, loading } = useQuery(MESSAGES_QUERY);
    const result = useSubscription(GET_MESSAGES );

    if(!data || !data.messages){
      return null;
    }

    const fetchMessages = result.loading ? data.messages : result.data.messages;

    const filterMessage = fetchMessages.filter(message => (message.senderName === senderUserName && message.receiverName === receiverUserName) || 
      (message.senderName === receiverUserName && message.receiverName === senderUserName))
    return (
      <>
        {!loading && filterMessage.map(({id, senderName, text})=>{
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
  