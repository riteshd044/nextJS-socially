import { getSuggestedUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./FollowButton";
import { currentUser } from "@clerk/nextjs/server";
import { Sparkles, Users, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

const WhoToFollow = async () => {
  const [clerkUser, users] = await Promise.all([
    currentUser(),
    getSuggestedUsers(),
  ]);

  if (!clerkUser) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 px-6 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LogIn className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-sm font-semibold">Sign in to see suggestions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create an account or log in to get personalized people to follow.
            </p>

            <SignInButton mode="modal">
              <Button className="mt-4" variant="default">Sign In</Button>
            </SignInButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 px-6 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            <h3 className="text-sm font-semibold">No suggestions right now</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow more people to improve your recommendations.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>We will show people you may know here.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>

                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>

              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;