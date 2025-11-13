import React from "react";
import { Loader2 } from "lucide-react"; // from lucide-react (already in your project)

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-gray-600 gap-4">
      <Loader2 className="animate-spin text-purple-600" size={48} />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loading;
