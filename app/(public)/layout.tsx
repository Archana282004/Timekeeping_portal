import { cookies } from 'next/headers'  
import { redirect, RedirectType } from 'next/navigation';

interface PublicLayoutProps {
  readonly children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = async ({ children }) => {
  const cookieStore = await cookies();

  const isLoggedin = cookieStore.has("access_token");
  if(isLoggedin){
    const userrole = cookieStore.get("user")?.value;
    const role = userrole ? JSON.parse(userrole).role : null;

    if (role === "employee") {
      redirect("/employee-dashboard", RedirectType.push);
    } else if (role === "admin" ) {
      redirect("/admin-dashboard", RedirectType.push);
    }
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default PublicLayout;