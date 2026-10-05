import Signin from "./(sign)/signin";

interface PageProps {
  searchParams: Promise<{
    step?: string;
    phone?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  return <Signin searchParams={searchParams} />;
}
