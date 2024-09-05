import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import NotFoundIcon from "../components/common/Icons/NotFound.jsx";
export default function NotFoundPage() {
  return (
    <div className="p-10 flex flex-col items-center justify-center gap-10">
      <NotFoundIcon className="h-52" />
      <h1 className="text-white text-center text-4xl font-semibold">
        PAGE NOT FOUND!
      </h1>
      <Link to="/">
        <Button className="bg-red-400 text-white">Go to home</Button>
      </Link>
    </div>
  );
}
