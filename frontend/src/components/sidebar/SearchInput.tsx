import { useGetConversation } from "hooks";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "zustand/useConversation";
const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const { setSeletedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSeletedConversation(conversation);
      setSearch("");
    } else toast.error("No search user found!");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle text-white bg-emerald-500"
      >
        <IoSearchSharp className="ư-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
