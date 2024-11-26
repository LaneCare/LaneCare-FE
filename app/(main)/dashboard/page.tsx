import { auth } from "@/auth";
import PageTitle from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
  const session = await auth();

  if (session) {
    console.log("From Serverside" + session);
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Dashboard" />
        {/* <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2> */}
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
          <Button>Create</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Placeholder for chart */}
                <div className="h-[200px] bg-muted" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for recent sales list */}
                <div className="space-y-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage
                          src={`/avatars/0${i + 1}.png`}
                          alt="Avatar"
                        />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          olivia.martin@email.com
                        </p>
                      </div>
                      <div className="ml-auto font-medium">+$1,999.00</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      {/* Additional content to ensure scrolling */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Form Example {i + 1}</CardTitle>
              <CardDescription>Fill out the information below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`name-${i}`}>Name</Label>
                    <Input id={`name-${i}`} placeholder="Enter your name" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`email-${i}`}>Email</Label>
                    <Input
                      id={`email-${i}`}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
