"use client";
import { useCompletion } from "@ai-sdk/react";

export default function StreamText(){
    const { input, handleInputChange, handleSubmit, completion, isLoading, error, stop} = useCompletion({
        api: "/api/streamText"
    })
    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                <input type="text" placeholder="Enter prompt" value={input} onChange={handleInputChange} />
                {
                    isLoading ? 
                    <button type="button" onClick={stop}>Stop</button> : 
                    <button type="submit" disabled={isLoading}>send</button>
                }
                
            </form>
            { isLoading && !completion && <div>Loading...</div> }

            { error && <div className="text-red-500">{error.message}</div>}

            { completion && <p>{completion}</p>}
        </div>
    )
}

// "use client";

// import { useCompletion } from "@ai-sdk/react";

// export default function CompletionStreamPage() {
//   const {
//     completion,
//     input,
//     handleInputChange,
//     handleSubmit,
//     isLoading,
//     error,
//     stop,
//     setInput,
//   } = useCompletion({
//     api: "/api/streamText",
//   });

//   return (
//     <div>
//       {error && <div className="text-red-500 mb-4">{error.message}</div>}
//       {isLoading && !completion && <div>Loading...</div>}

//       {completion && <div>{completion}</div>}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           setInput(""); // temporary fix to clear the input after submission
//           handleSubmit(e);
//         }}

//       >
//         <div>
//           <input
//             value={input}
//             onChange={handleInputChange}
//             placeholder="How can I help you?"
//           />
//           {isLoading ? (
//             <button
//               onClick={stop}
//             >
//               Stop
//             </button>
//           ) : (
//             <button
//               type="submit"
//               disabled={isLoading}
//             >
//               Send
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }