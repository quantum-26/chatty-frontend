import { gql } from "@apollo/client";

export const MESSAGES_QUERY = gql`
  query fetchMessages {
    messages {
      id
      senderName
      receiverName
      text
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription{
    messages {
      id
      receiverName
      senderName
      text
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation sendMessage($senderName:String!, $receiverName:String!, $text:String!){
    postMessage(senderName:$senderName, receiverName:$receiverName, text:$text)
  }
`;
