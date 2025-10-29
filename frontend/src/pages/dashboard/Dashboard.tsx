import { Card } from "../../components/ui";
import { H1, P } from "../../components/ui/Typography";
import AppLayout from "../../layout/AppLayout";


export default function Dashboard() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <H1>Welcome Back 👋</H1>
          <P>Here’s your product control center.</P>
        </Card>
        <Card>
          <H1>Analytics</H1>
          <P>Coming soon with real-time charts.</P>
        </Card>
      </div>
    </AppLayout>
  );
}
