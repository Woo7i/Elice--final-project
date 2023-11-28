import { useEffect, useRef, useState } from "react";
// import dayjs from "dayjs";
import MessageList from "./MessageList";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://efwyaewnaeiblkswsccs.supabase.co", import.meta.env.VITE_CHAT_APIKEY);

export const ChatForm = () => {
  const [username, setUsername] = useState("");
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const submitText = async (e) => {
    e.preventDefault();

    if (username !== "" && textValue !== "") {
      // supabase에 메시지 추가
      const { data, error } = await supabase
        .from("messages")
        .insert([{ username, content: textValue }], { returning: "minimal" })
        .select();
      console.log("메시지 전송 완료!");

      if (error) {
        console.error("메시지 전송 실패", error);
        return;
      }

      // 메시지 배열에 추가
      setMessages([...messages, data[0]]);
      // 필드 초기화
      setUsername("");
      setTextValue("");
    } else {
      alert("빈 칸을 입력해 주세요");
    }
  };

  // messages가 업데이트될 때마다 스크롤을 맨 아래로 이동하는 함수
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed z-50 bottom-40 right-5 w-[480px] h-[540px] overflow-hidden gap-5 rounded-[30px] bg-white font-pretendard shadow-xl">
      <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[460px] w-[480px] relative">
        <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[480px] h-[95px] p-6">
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-black">오픈톡</p>
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                <svg
                  width={10}
                  height={10}
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle cx={5} cy={5} r={5} fill="#68D391" />
                </svg>
                <p className="flex-grow-0 flex-shrink-0 opacity-60 text-xs font-semibold text-left text-black">80명</p>
              </div>
            </div>
          </div>
          <button className="flex justify-start items-center relative gap-2 px-2 py-1.5 rounded-lg bg-[#9bb0a5] hover:bg-emerald-700 cursor-pointer">
            <span className="text-sm text-white">닫기</span>
          </button>
        </div>
        <div className="w-[640px] h-px opacity-[0.08] bg-black" />
        <div
          className="chat_area flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[395px] w-[480px] px-4 pt-3 pb-5  overflow-x-hidden"
          // ref={containerRef}
        >
          <MessageList />
          {/* <div className="flex justify-end items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2.5 px-4 py-2 rounded-xl bg-[#40ad80]">
                <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">안녕하세요</p>
              </div>
              <span className="text-sm">{specificTime.format("YYYY-MM-DD HH:mm:ss")}</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex justify-start items-center gap-6 px-4 py-4 border-blue-200">
        <div className="flex justify-between items-center flex-grow h-12 relative overflow-hidden py-2.5 bg-white">
          <form onSubmit={submitText} className="flex gap-3">
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임"
              className="text-sm text-left text-black outline-none w-[120px] ml-2 h-8 px-2 rounded-lg border-[1px] border-solid border-zinc-300 focus:ring-1 ring-emerald-500"
            />
            <input
              name="content"
              type="text"
              value={textValue}
              placeholder="메세지를 입력하세요"
              className="text-sm text-left text-black outline-none w-[260px] h-8 px-2 rounded-lg border-[1px] border-solid border-zinc-300 focus:ring-1 ring-emerald-500"
              onChange={handleChange}
            />
            <button type="submit">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 relative"
                preserveAspectRatio="none"
              >
                <path
                  d="M16.1401 2.96004L7.11012 5.96004C1.04012 7.99004 1.04012 11.3 7.11012 13.32L9.79012 14.21L10.6801 16.89C12.7001 22.96 16.0201 22.96 18.0401 16.89L21.0501 7.87004C22.3901 3.82004 20.1901 1.61004 16.1401 2.96004ZM16.4601 8.34004L12.6601 12.16C12.5101 12.31 12.3201 12.38 12.1301 12.38C11.9401 12.38 11.7501 12.31 11.6001 12.16C11.4606 12.0189 11.3824 11.8285 11.3824 11.63C11.3824 11.4316 11.4606 11.2412 11.6001 11.1L15.4001 7.28004C15.6901 6.99004 16.1701 6.99004 16.4601 7.28004C16.7501 7.57004 16.7501 8.05004 16.4601 8.34004Z"
                  fill="#40AD80"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
