import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileMenu from "./ProfileMenu";

export default async function Profile() {
  const userSession = await getServerSession(authOptions);

  if (userSession) {
    return (
      <ProfileMenu
        image={userSession.user?.image}
        name={userSession.user?.name}
      />
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link
        href="/auth"
        className="inline-flex h-10 items-center justify-center rounded-full bg-(--main-color-text) px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#343b12] hover:shadow active:scale-95"
      >
        Đăng nhập
      </Link>
    </div>
  );
}
