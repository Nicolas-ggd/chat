import { useParams } from "react-router-dom";

export const ChatHeader = () => {
  const { id } = useParams();
  
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-gray-100 dark:bg-gray-800 transition duration-300">
      {id && <div className="flex items-center">
        <div className="h-12 w-12 p-2 bg-green-400 rounded-full text-white font-semibold flex items-center justify-center dark:text-white transition duration-300">
          {id[0]}
        </div>
        <h3 className="px-2 font-semibold dark:text-white transition duration-300">#{id}</h3>
      </div>}
      {!id && <div className="flex items-center">
        <div className="h-12 w-12 p-2 bg-green-400 rounded-full text-white font-semibold flex items-center justify-center">
          #
        </div>
        <h3 className="px-2 font-semibold dark:text-white">#general</h3>
      </div>}
    </div>
  );
};
