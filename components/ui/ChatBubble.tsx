import { Message } from "ai/react";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const wrappedText = (text: string) => {
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};

interface ChatBubbleProps extends Partial<Message> {
  sources: string;
}

const ChatBubble = ({
  role = "assistant",
  content,
  sources,
}: ChatBubbleProps) => {
  if (!content) {
    return null;
  }
  const wrappedMessage: any = wrappedText(content);

  return (
    <div>
      <Card className='mb-2'>
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "textamber500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }>
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm'>
          <Balancer>{wrappedMessage}</Balancer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBubble;
